import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { JSDOM } from "jsdom";

const app = express();

// Helper function to parse volume strings (e.g., "2.1M" -> 2100000, "150K" -> 150000)
function parseVolumeString(volumeStr) {
    if (!volumeStr || volumeStr === "--") return null;
    
    // Remove commas and spaces
    const cleanStr = volumeStr.replace(/[, ]/g, '');
    
    // Check for K (thousands)
    if (cleanStr.includes('K')) {
        const num = parseFloat(cleanStr.replace('K', ''));
        return Math.round(num * 1000);
    }
    
    // Check for M (millions)
    if (cleanStr.includes('M')) {
        const num = parseFloat(cleanStr.replace('M', ''));
        return Math.round(num * 1000000);
    }
    
    // Check for B (billions)
    if (cleanStr.includes('B')) {
        const num = parseFloat(cleanStr.replace('B', ''));
        return Math.round(num * 1000000000);
    }
    
    // Regular number
    return parseInt(cleanStr) || null;
}

// Web scraping function for Magic Eden
async function scrapeMagicEdenFloorPrice(contractAddress) {
    try {
        const url = `https://magiceden.io/collections/monad-testnet/${contractAddress}`;
        console.log(`Scraping floor price from: ${url}`);
        
        // Fetch the webpage
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Look for floor price and volume data in the HTML
        const floorPriceMatch = html.match(/"Floor Price","value":"([^"]+)","rawValue":(\d+)/);
        
        // Look for volume data in the collectionStatsAttributes section
        const volume24hMatch = html.match(/"24h Vol","value":"([^"]+)","currencySymbol":"MON"/);
        const totalVolumeMatch = html.match(/"All Vol","value":"([^"]+)","currencySymbol":"MON"/);
        const sales24hMatch = html.match(/"24h Sales","value":"([^"]+)"/);
        const listingsMatch = html.match(/"Listed \/ Supply","value":"([^"]+) \/ \d+"/);
        const ownersMatch = html.match(/"Owners","value":"(\d+)"/);
        
        // Fallback patterns for different data structures
        const volumeFallback1 = html.match(/"24h Volume","value":"([^"]+)","rawValue":(\d+)/);
        const volumeFallback2 = html.match(/"Volume","value":"([^"]+)","rawValue":(\d+)/);
        
        if (floorPriceMatch) {
            const displayValue = floorPriceMatch[1]; // e.g., "30,000"
            const rawValue = parseInt(floorPriceMatch[2]); // e.g., 30000
            
            // Extract volume data if available
            let volume24h = null;
            let volume24hDisplay = null;
            let volume24hRaw = null;
            
            // Try primary volume pattern first (new Magic Eden format)
            if (volume24hMatch && volume24hMatch[1] !== "--") {
                volume24hDisplay = volume24hMatch[1]; // e.g., "150,000"
                // Convert display value to raw number (remove commas and convert K/M to numbers)
                volume24hRaw = parseVolumeString(volume24hMatch[1]);
                volume24h = volume24hRaw;
            }
            // Try fallback patterns if primary pattern didn't work
            else if (volumeFallback1) {
                volume24hDisplay = volumeFallback1[1];
                volume24hRaw = parseInt(volumeFallback1[2]);
                volume24h = volume24hRaw;
            }
            else if (volumeFallback2) {
                volume24hDisplay = volumeFallback2[1];
                volume24hRaw = parseInt(volumeFallback2[2]);
                volume24h = volume24hRaw;
            }
            
            // Return the full price value (not divided by 1000)
            const floorPriceInMon = rawValue;
            
            // Extract additional metrics if available
            const totalVolume = totalVolumeMatch ? {
                display: totalVolumeMatch[1],
                raw: parseVolumeString(totalVolumeMatch[1])
            } : null;
            
            const sales24h = sales24hMatch ? {
                display: sales24hMatch[1],
                raw: sales24hMatch[1] !== "--" ? parseInt(sales24hMatch[1]) : null
            } : null;
            
            const listings = listingsMatch ? {
                display: listingsMatch[1],
                raw: parseInt(listingsMatch[1])
            } : null;
            
            const owners = ownersMatch ? {
                display: ownersMatch[1],
                raw: parseInt(ownersMatch[1])
            } : null;
            
            return {
                success: true,
                floorPrice: floorPriceInMon,
                floorPriceDisplay: displayValue,
                floorPriceRaw: rawValue,
                volume24h: volume24h,
                volume24hDisplay: volume24hDisplay,
                volume24hRaw: volume24hRaw,
                totalVolume: totalVolume,
                sales24h: sales24h,
                listings: listings,
                owners: owners
            };
        }
        
        return {
            success: false,
            error: "Floor price not found in HTML"
        };
        
    } catch (error) {
        console.error('Scraping error:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

// Enable CORS for your frontend
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'https://nftemple-live-data.pages.dev', 'https://*.pages.dev', 'https://nftemple.xyz' ],
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Cache for floor prices (15 minutes)
const priceCache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Helper function to check if cache is valid
function isCacheValid(timestamp) {
    return Date.now() - timestamp < CACHE_DURATION;
}

// Get floor price for a collection
app.get("/floor/:symbol", async (req, res) => {
    const { symbol } = req.params;
    
    try {
        // Check cache first
        if (priceCache.has(symbol)) {
            const cached = priceCache.get(symbol);
            if (isCacheValid(cached.timestamp)) {
                console.log(`Cache hit for ${symbol}`);
                return res.json(cached.data);
            }
        }
        
        console.log(`Fetching floor price for ${symbol} via web scraping...`);
        
        // Check if this is a Monad collection (contract address)
        const isMonadCollection = symbol.startsWith('0x') && symbol.length === 42;
        
        if (!isMonadCollection) {
            return res.status(400).json({ 
                error: "Only Monad collections (contract addresses) are supported",
                symbol
            });
        }
        
        // Use web scraping for all Monad collections
        try {
            const scrapedData = await scrapeMagicEdenFloorPrice(symbol);
            if (scrapedData.success && scrapedData.floorPrice) {
                const result = {
                    symbol,
                    floorPrice: scrapedData.floorPrice,
                    floorPriceInMon: scrapedData.floorPrice,
                    floorPriceFormatted: `${scrapedData.floorPriceDisplay} MON`,
                    volume24h: scrapedData.volume24h,
                    volume24hInMon: scrapedData.volume24h,
                    volume24hFormatted: scrapedData.volume24hDisplay ? `${scrapedData.volume24hDisplay} MON` : 'N/A',
                    totalVolume: scrapedData.totalVolume ? {
                        value: scrapedData.totalVolume.raw,
                        formatted: `${scrapedData.totalVolume.display} MON`
                    } : null,
                    sales24h: scrapedData.sales24h ? {
                        value: scrapedData.sales24h.raw,
                        formatted: scrapedData.sales24h.display
                    } : null,
                    listings: scrapedData.listings ? {
                        value: scrapedData.listings.raw,
                        formatted: scrapedData.listings.display
                    } : null,
                    owners: scrapedData.owners ? {
                        value: scrapedData.owners.raw,
                        formatted: scrapedData.owners.display
                    } : null,
                    timestamp: Date.now(),
                    source: 'web-scraping',
                    rawData: scrapedData
                };
                
                // Cache the result
                priceCache.set(symbol, {
                    data: result,
                    timestamp: Date.now()
                });
                
                console.log(`Successfully scraped floor price for ${symbol}: ${scrapedData.displayValue} MON`);
                return res.json(result);
            } else {
                return res.status(404).json({ 
                    error: "Floor price not found via web scraping",
                    symbol,
                    rawData: scrapedData
                });
            }
        } catch (scrapeError) {
            console.error(`Web scraping failed for ${symbol}:`, scrapeError.message);
            return res.status(500).json({ 
                error: "Web scraping failed",
                symbol,
                message: scrapeError.message
            });
        }
        
    } catch (err) {
        console.error(`Error fetching floor price for ${symbol}:`, err);
        res.status(500).json({ 
            error: "Failed to fetch floor price",
            symbol,
            message: err.message
        });
    }
});

// Get multiple floor prices at once
app.post("/floor/batch", async (req, res) => {
    const { symbols } = req.body;
    
    if (!Array.isArray(symbols)) {
        return res.status(400).json({ error: "Symbols must be an array" });
    }
    
    try {
        const results = {};
        const promises = symbols.map(async (symbol) => {
            try {
                const response = await fetch(`http://localhost:3000/floor/${symbol}`);
                const data = await response.json();
                results[symbol] = data;
            } catch (error) {
                results[symbol] = { error: error.message };
            }
        });
        
        await Promise.all(promises);
        res.json(results);
        
    } catch (err) {
        console.error("Batch request error:", err);
        res.status(500).json({ error: "Batch request failed" });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        cacheSize: priceCache.size
    });
});

// Clear cache endpoint (for testing)
app.post("/cache/clear", (req, res) => {
    priceCache.clear();
    res.json({ message: "Cache cleared", timestamp: Date.now() });
});

// Debug endpoint to see raw HTML structure (for development)
app.get("/debug/:symbol", async (req, res) => {
    const { symbol } = req.params;
    
    try {
        const url = `https://magiceden.io/collections/monad-testnet/${symbol}`;
        console.log(`Debug: Fetching raw HTML from: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Look for all potential data patterns
        const patterns = {
            floorPrice: html.match(/"Floor Price","value":"([^"]+)","rawValue":(\d+)/),
            volume24h: html.match(/"24h Volume","value":"([^"]+)","rawValue":(\d+)/),
            volume: html.match(/"Volume","value":"([^"]+)","rawValue":(\d+)/),
            totalVolume: html.match(/"Total Volume","value":"([^"]+)","rawValue":(\d+)/),
            sales24h: html.match(/"24h Sales","value":"([^"]+)","rawValue":(\d+)/),
            listings: html.match(/"Listings","value":"([^"]+)","rawValue":(\d+)/)
        };
        
        res.json({
            symbol,
            url,
            patterns,
            htmlLength: html.length,
            sampleHtml: html.substring(0, 2000) // First 2000 chars for inspection
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Floor price server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🗑️  Clear cache: POST http://localhost:${PORT}/cache/clear`);
    console.log(`🔍 Debug HTML: GET http://localhost:${PORT}/debug/{contractAddress}`);
});
