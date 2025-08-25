import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function scrapeMagicEdenFloorPrice(collectionUrl) {
    try {
        console.log(`Scraping floor price from: ${collectionUrl}`);
        
        // Fetch the webpage
        const response = await fetch(collectionUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Parse the HTML
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        // Look for floor price elements (these selectors might need adjustment)
        const floorPriceSelectors = [
            '[data-testid="floor-price"]',
            '.floor-price',
            '[class*="floor"]',
            '[class*="price"]'
        ];
        
        let floorPrice = null;
        
        // Try different selectors
        for (const selector of floorPriceSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                const text = element.textContent.trim();
                console.log(`Found element with selector "${selector}":`, text);
                
                // Extract price from text
                const priceMatch = text.match(/(\d+(?:\.\d+)?)\s*MON/);
                if (priceMatch) {
                    floorPrice = parseFloat(priceMatch[1]);
                    break;
                }
            }
        }
        
        // If no price found, try searching for MON amounts in the entire page
        if (!floorPrice) {
            const monMatches = html.match(/(\d+(?:\.\d+)?)\s*MON/g);
            if (monMatches && monMatches.length > 0) {
                console.log('Found MON amounts in page:', monMatches);
                // Take the first one as potential floor price
                const firstMatch = monMatches[0].match(/(\d+(?:\.\d+)?)/);
                if (firstMatch) {
                    floorPrice = parseFloat(firstMatch[1]);
                }
            }
        }
        
        // Also search for any text containing "Floor" and numbers
        if (!floorPrice) {
            const floorTextMatches = html.match(/Floor[^>]*>([^<]*)/g);
            if (floorTextMatches) {
                console.log('Found floor text matches:', floorTextMatches);
                for (const match of floorTextMatches) {
                    const priceMatch = match.match(/(\d+(?:\.\d+)?)/);
                    if (priceMatch) {
                        floorPrice = parseFloat(priceMatch[1]);
                        console.log('Found floor price in text:', floorPrice);
                        break;
                    }
                }
            }
        }
        
        return {
            success: true,
            floorPrice,
            source: 'web-scraping',
            url: collectionUrl
        };
        
    } catch (error) {
        console.error('Scraping error:', error.message);
        return {
            success: false,
            error: error.message,
            source: 'web-scraping',
            url: collectionUrl
        };
    }
}

// Test the scraper
const testUrl = 'https://magiceden.io/collections/monad-testnet/0xe6b5427b174344fd5cb1e3d5550306b0055473c6';
scrapeMagicEdenFloorPrice(testUrl).then(result => {
    console.log('Scraping result:', result);
});
