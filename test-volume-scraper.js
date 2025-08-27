// Test script for enhanced volume scraping functionality
import fetch from 'node-fetch';

const BACKEND_URL = 'http://localhost:3000';

// Test collections with known contract addresses
const testCollections = [
    '0xe6b5427b174344fd5cb1e3d5550306b0055473c6', // Chog Mystery Chest
    '0x7370a0a9e9a833bcd071b38fc25184e7afb57aff', // Chog Pass
    '0x87e1f1824c9356733a25d6bed6b9c87a3b31e107'  // Spiky Nads
];

async function testVolumeScraping() {
    console.log('🧪 Testing enhanced volume scraping functionality...\n');
    
    for (const contractAddress of testCollections) {
        console.log(`📊 Testing collection: ${contractAddress}`);
        
        try {
            // Test the main floor price endpoint
            const response = await fetch(`${BACKEND_URL}/floor/${contractAddress}`);
            const data = await response.json();
            
            if (response.ok) {
                console.log('✅ Floor price data:');
                console.log(`   Floor Price: ${data.floorPriceFormatted}`);
                console.log(`   24h Volume: ${data.volume24hFormatted}`);
                
                if (data.totalVolume) {
                    console.log(`   Total Volume: ${data.totalVolume.formatted}`);
                }
                if (data.sales24h) {
                    console.log(`   24h Sales: ${data.sales24h.formatted}`);
                }
                if (data.listings) {
                    console.log(`   Listings: ${data.listings.formatted}`);
                }
                
                console.log(`   Timestamp: ${new Date(data.timestamp).toLocaleString()}`);
                console.log(`   Source: ${data.source}\n`);
            } else {
                console.log('❌ Error:', data.error || 'Unknown error');
                console.log('');
            }
            
        } catch (error) {
            console.log('❌ Network error:', error.message);
            console.log('');
        }
    }
    
    // Test the debug endpoint for one collection
    console.log('🔍 Testing debug endpoint...');
    try {
        const debugResponse = await fetch(`${BACKEND_URL}/debug/${testCollections[0]}`);
        const debugData = await debugResponse.json();
        
        if (debugResponse.ok) {
            console.log('✅ Debug data retrieved');
            console.log(`   HTML Length: ${debugData.htmlLength} characters`);
            console.log(`   Patterns found:`, debugData.patterns);
            console.log(`   Sample HTML (first 2000 chars):`);
            console.log(debugData.sampleHtml.substring(0, 500) + '...\n');
        } else {
            console.log('❌ Debug endpoint error:', debugData.error);
        }
    } catch (error) {
        console.log('❌ Debug endpoint network error:', error.message);
    }
}

// Run the test
testVolumeScraping().catch(console.error);
