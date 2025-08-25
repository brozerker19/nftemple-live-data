import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { JSDOM } from "jsdom";

const app = express();

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
        
        // Look for floor price in the HTML
        const floorPriceMatch = html.match(/"Floor Price","value":"([^"]+)","rawValue":(\d+)/);
        if (floorPriceMatch) {
            const displayValue = floorPriceMatch[1]; // e.g., "30,000"
            const rawValue = parseInt(floorPriceMatch[2]); // e.g., 30000
            
            // Return the full price value (not divided by 1000)
            const floorPriceInMon = rawValue;
            
            return {
                success: true,
                floorPrice: floorPriceInMon,
                displayValue: displayValue,
                rawValue: rawValue
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
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
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
                    floorPriceFormatted: `${scrapedData.displayValue} MON`,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Floor price server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🗑️  Clear cache: POST http://localhost:${PORT}/cache/clear`);
});
