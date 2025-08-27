// Floor Price Test - Backend Server Integration

// Test collection data with contract addresses
const testCollections = {
    chog: {
        name: "Chog Mystery Chest",
        contractAddress: "0xe6b5427b174344fd5cb1e3d5550306b0055473c6",
        description: "The Mascot of Monad | Powered by the monad community | NFTs and more 😈"
    },
    "chog-pass": {
        name: "Chog Pass",
        contractAddress: "0x7370a0a9e9a833bcd071b38fc25184e7afb57aff",
        description: "Grants 1 x GTD Whitelist"
    },
    spiky: {
        name: "Spiky Nads",
        contractAddress: "0x87e1f1824c9356733a25d6bed6b9c87a3b31e107",
        description: "Meet Spiky Nads – the sharp edge of pixel art NFTs on monad. SIUUUU"
    },
    spikeys: {
        name: "SpiKeys",
        contractAddress: "0xbb406139138401f4475ca5cf2d7152847159eb7a",
        description: "Grants 1 x GTD Whitelist"
    },
    blench: {
        name: "Blench Pass",
        contractAddress: "0x46c66c40711a2953d1768926e53134c7ab272cd5",
        description: "AT ALL COSTS"
    },
    "chogstar-pass": {
        name: "Lil Chogstars Superstarlist Pass",
        contractAddress: "0xd20ef03e432208af083c0fb4e401049f4f29949f",
        description: "3 Passes grant 1 x GTD Whitelist"
    },
    "chogstar-nfts": {
        name: "Lil Chogstars",
        contractAddress: "0x26c86f2835c114571df2b6ce9ba52296cc0fa6bb",
        description: "Lil Chogstars NFT Collection"
    },
    "sealuminati-testnetooor": {
        name: "Sealuminati Testnetooor",
        contractAddress: "0x4870e911b1986c6822a171cdf91806c3d44ce235",
        description: "Sealuminati Testnet Collection"
    },
    "mondana-eye-chain": {
        name: "Mondana Baddies Eye Chain",
        contractAddress: "0xd6421e9c72199e971e5a3cde09214054e1216cd2",
        description: "Mondana Baddies Eye Chain Collection"
    },
    "mondana-baddie-eye": {
        name: "Mondana Baddies: Baddie Eye",
        contractAddress: "0x84db60168be10fb2ae274ea84e24cb22ffe11ddd",
        description: "Grants 1 x GTD Whitelist"
    },
    "overnads-pass": {
        name: "Overnads: Whitelist Pass",
        contractAddress: "0x49d54cd9ca8c5ecadbb346dc6b4e31549f34e405",
        description: "Overnads Whitelist Pass Collection"
    },
    "bobr": {
        name: "BOBR",
        contractAddress: "0x3ff5ab5eea49d25ab00b532e9e50b17d5218068c",
        description: "First, only, official BOBR NFT on Monad"
    },
    "10k-squad": {
        name: "The10kSquad",
        contractAddress: "0x3a9454c1b4c84d1861bb1209a647c834d137b442",
        description: "The10kSquad NFT Collection"
    },
    "eggcellent": {
        name: "EGGcellent",
        contractAddress: "0x7da93750de078bfbbab0dd30635448e9ec7fb8f0",
        description: "EGGcellent NFT Collection"
    },
    "10k-fantasy-pass": {
        name: "10k x Fantasy Pass",
        contractAddress: "0xdee182a4d9146e8d7621f54706b649cf2b95cb4e",
        description: "10k x Fantasy Pass Collection"
    },
    "meowwnads-testnet": {
        name: "Meowwnads Testnet Collection",
        contractAddress: "0xa568cabe34c8ca0d2a8671009ae0f6486a314425",
        description: "Meowwnads Testnet NFT Collection"
    },
    "meowwnads-og-pass": {
        name: "Meowwnads | OG Pass",
        contractAddress: "0xd60c64487d581d5eb2b15f221bd6d8187a9a4aef",
        description: "Meowwnads OG Pass Collection"
    },
    "la-mouch": {
        name: "La Mouch",
        contractAddress: "0x5a21b0f4a4f9b54e16282b6ed5ad014b3c77186f",
        description: "Bringing the swarm to life on Monad"
    },
    "la-mouch-nft": {
        name: "La Mouch NFT",
        contractAddress: "0x800f8cacc990dda9f4b3f1386c84983ffb65ce94",
        description: "La Mouch NFT Collection"
    },
    "lamouch-fantasytop-pass": {
        name: "LaMouch x Fantasytop Pass",
        contractAddress: "0x4bac889f20b9de43734f15379096c98f34154c50",
        description: "Grants 1 x GTD Whitelist"
    },
    "monadverse-genesis-hatch": {
        name: "Monadverse Genesis Hatch",
        contractAddress: "0x2ace467d5c55d75cf04ae7b9c7672bc499d8e246",
        description: "Grants 1 x GTD Whitelist"
    },
    "momo": {
        name: "Momo",
        contractAddress: "0xbc8f6824fde979848ad97a52bced2d6ca1842a68",
        description: "Grants 1 x GTD Whitelist"
    },
    "chewy": {
        name: "Chewy",
        contractAddress: "0x88bbcba96a52f310497774e7fd5ebadf0ece21fb",
        description: "Chewy NFT Collection"
    },
    "chewy-fantasytop": {
        name: "Chewy x Fantasytop",
        contractAddress: "0x3aec2a91206d68aaa6bb1ca7faf3eb3da2a69489",
        description: "Chewy x Fantasytop Collection"
    },
    "skrumpets": {
        name: "Skrumpets",
        contractAddress: "0xe8f0635591190fb626f9d13c49b60626561ed145",
        description: "Grants 1 x GTD Whitelist"
    },
    "dn": {
        name: "DN",
        contractAddress: "0x151cf400af08bca390b16582ed6c4f096e4f17eb",
        description: "Grants 1 x GTD Whitelist"
    },
    "llamao-genesis": {
        name: "Llamao Genesis",
        contractAddress: "0xb0a663cf4853e67221fee43322fda402e21debfc",
        description: "Llamao Genesis NFT Collection"
    },
    "llamao-fantasytop": {
        name: "Llamao x Fantasytop",
        contractAddress: "0x38f3730b009ec1707f5409caf44e329cc7b4d050",
        description: "Llamao x Fantasytop Collection"
    },
    "lost-discs": {
        name: "Lost Discs",
        contractAddress: "0xcd719c599ebc51193c5c97cbe188f43c8c4c8745",
        description: "Different WL depending on the type/color"
    },
    "monshape-fantasy-wl-pass": {
        name: "Monshape x Fantasy WL Pass",
        contractAddress: "0x977b9b652dcd87e5fbdb849b12ab63a6bb01ac05",
        description: "Grants 1 x GTD Whitelist"
    },
    "monshape-hopium": {
        name: "Monshape Hopium",
        contractAddress: "0x69f2688abe5dcde0e2413f77b80efcc16361a56e",
        description: "Possible raffles, limited info available"
    },
    "realnads-premint-pass": {
        name: "RealNads Premint Pass",
        contractAddress: "0xb981a81b45f604f82bd502a35c6dbe25dd2e8b8d",
        description: "3 NFTs = 1 x GTD Whitelist"
    },
    "blocknads": {
        name: "Blocknads",
        contractAddress: "0x6ed438b2a8eff227e7e54b5324926941b140eea0",
        description: "A paradigm shift. The new order of defiance"
    },
    "r3tards": {
        name: "r3tards",
        contractAddress: "0xed52e0d80f4e7b295df5e622b55eff22d262f6ed",
        description: "Grants 1 x GTD Whitelist"
    },
    "r3tardv3rs3": {
        name: "r3tardv3rs3",
        contractAddress: "0x2b9ee0a88d69eef1cffe3ea330165e17fd976c3c",
        description: "Grants 1 x GTD Whitelist"
    },
    "monad-nurse": {
        name: "Monad Nurse",
        contractAddress: "0x8827a10506653af9de490e160ad134e6293d3b47",
        description: "Grants 1 x GTD Whitelist"
    },
    "legacy-eggs": {
        name: "Legacy Eggs",
        contractAddress: "0xa980f072bc06d67faec2b03a8ada0d6c9d0da9f8",
        description: "Start your journey in the upcoming 2D action MMORPG BoE"
    },
    "mystery-token": {
        name: "Mystery Token",
        contractAddress: "0xff59f1e14c4f5522158a0cf029f94475ba469458",
        description: "Breath of Estova Mystery Token Collection"
    },
    "mop-nads": {
        name: "Mop Nads",
        contractAddress: "0xb600de0ebee70af4691dbf8a732be7791b6ce73a",
        description: "Mop is coming..."
    },
    "owls-monad": {
        name: "OwlsMonad",
        contractAddress: "0x6ed438b2a8eff227e7e54b5324926941b140eea0",
        description: "5 NFTs = GTD Whitelist / 2 NFTs = 1 FCFS"
    },
    "mon-beans": {
        name: "Mon Beans",
        contractAddress: "0x6aa4872ab4e0fdf078efd17acd45b6352f47c39c",
        description: "Builder Beans"
    },
    "minimurz": {
        name: "Minimurz",
        contractAddress: "0xa8cb1e9e5b18e36eb2eb598014be657d4ebc5d33",
        description: "ur mischievous, loving, onchain imaginary friends"
    },
    "monpunks-nft-badge": {
        name: "Monpunks NFT Badge",
        contractAddress: "0x100de33e80b9cc91e5dee80c15164338cee090ec",
        description: "31x31 pixel art characters built on Monad"
    },
    "daks-fantasies": {
        name: "The Daks Fantasies",
        contractAddress: "0x4e88056e13de12bde065589e501033227d8188e6",
        description: "Grants 1 x GTD Whitelist"
    },
    "thedaks": {
        name: "TheDaks",
        contractAddress: "0x78ed9a576519024357ab06d9834266a04c9634b7",
        description: "The Daks is a pfpNFT collection built on Monad"
    },
    "slmnd-genesis": {
        name: "SLMND Genesis",
        contractAddress: "0xf7b984c089534ff656097e8c6838b04c5652c947",
        description: "SLMND a collection of Salmonads swimming upstream"
    },
    "slmnd-access-pass": {
        name: "SLMND Access Pass",
        contractAddress: "0x4e88056e13de12bde065589e501033227d8188e6",
        description: "Grants 1 x GTD Whitelist"
    },
    "mecha-box": {
        name: "MECHA BOX",
        contractAddress: "mecha_box_mint_pass",
        description: "Grants 1 x GTD Whitelist"
    }
};

// Backend server URL
const BACKEND_SERVER = window.API_CONFIG?.apiBaseUrl || "http://localhost:3000";

// Cache for storing floor price data
const floorPriceCache = {};

// Convert wei to MON (Monad's native token)
function weiToMon(wei) {
    return (wei / 1e18).toFixed(6); // Monad uses 18 decimals like Ethereum
}

// Format MON price with proper formatting
function formatMonPrice(monAmount) {
    const num = parseFloat(monAmount);
    if (num >= 1) {
        return `${num.toFixed(2)} MON`;
    } else if (num >= 0.01) {
        return `${num.toFixed(4)} MON`;
    } else if (num >= 0.001) {
        return `${num.toFixed(6)} MON`;
    } else {
        return `${num.toFixed(8)} MON`;
    }
}

// Update the UI with floor price data
function updateFloorPriceUI(projectId, data) {
    const priceElement = document.getElementById(`${projectId}-floor-price`);
    const lastUpdatedElement = document.getElementById(`${projectId}-last-updated`);
    const refreshButton = document.getElementById(`${projectId}-refresh`);
    
    if (!priceElement || !lastUpdatedElement || !refreshButton) {
        console.error(`UI elements not found for project: ${projectId}`);
        return;
    }
    
    if (data.error) {
        priceElement.textContent = "Error";
        priceElement.className = "floor-price-value floor-price-error";
        lastUpdatedElement.textContent = "Failed to fetch";
        refreshButton.disabled = false;
        return;
    }
    
    if (data.loading) {
        priceElement.textContent = "Loading...";
        priceElement.className = "floor-price-value floor-price-loading";
        lastUpdatedElement.textContent = "Fetching...";
        refreshButton.disabled = true;
        return;
    }
    
    // Success case
    if (data.noListings) {
        priceElement.textContent = "No listings";
        priceElement.className = "floor-price-value floor-price-loading";
        priceElement.style.color = "#ffaa00"; // Orange for no listings
    } else if (data.floorPriceFormatted) {
        // Use the formatted price from backend
        priceElement.textContent = data.floorPriceFormatted;
        priceElement.className = "floor-price-value";
        priceElement.style.color = "#00ff88"; // Green for real data
    } else {
        // Fallback to manual formatting
        const monPrice = weiToMon(data.floorPrice);
        priceElement.textContent = formatMonPrice(monPrice);
        priceElement.className = "floor-price-value";
        priceElement.style.color = "#00ff88"; // Green for real data
    }
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    lastUpdatedElement.textContent = `Updated: ${timeString}`;
    refreshButton.disabled = false;
}

// Fetch floor price from our backend server
async function fetchFloorPrice(projectId) {
    const collection = testCollections[projectId];
    if (!collection) {
        console.error(`Collection not found: ${projectId}`);
        return;
    }
    
    // Show loading state
    updateFloorPriceUI(projectId, { loading: true });
    
    try {
        console.log(`Fetching floor price for ${collection.name} via backend server...`);
        
        // Use our backend server to proxy the request
        const response = await fetch(`${BACKEND_SERVER}/floor/${collection.contractAddress}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Backend server error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Backend response for ${projectId}:`, data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        if (data.floorPriceInMon !== undefined) {
            // Store in cache
            floorPriceCache[projectId] = {
                floorPrice: data.floorPrice,
                floorPriceInMon: data.floorPriceInMon,
                timestamp: Date.now(),
                data: data
            };
            
            // Pass the formatted price directly
            updateFloorPriceUI(projectId, { 
                floorPrice: data.floorPrice,
                floorPriceFormatted: data.floorPriceFormatted 
            });
        } else if (data.status === 'no_listings') {
            // Collection exists but no listings
            floorPriceCache[projectId] = {
                floorPrice: 0,
                floorPriceInMon: 0,
                timestamp: Date.now(),
                data: data
            };
            
            updateFloorPriceUI(projectId, { floorPrice: 0, noListings: true });
        } else {
            throw new Error('Floor price not found in backend response');
        }
        
    } catch (error) {
        console.error(`Error fetching floor price for ${projectId}:`, error);
        
        // Check if we have cached data
        if (floorPriceCache[projectId]) {
            const cacheAge = Date.now() - floorPriceCache[projectId].timestamp;
            const maxCacheAge = 15 * 60 * 1000; // 15 minutes
            
            if (cacheAge < maxCacheAge) {
                console.log(`Using cached data for ${projectId}`);
                updateFloorPriceUI(projectId, { 
                    floorPrice: floorPriceCache[projectId].floorPrice 
                });
                return;
            }
        }
        
        // No data available
        handleNoDataAvailable(projectId);
    }
}

// Handle cases where no data is available
function handleNoDataAvailable(projectId) {
    console.log(`No real data available for ${projectId}`);
    updateFloorPriceUI(projectId, { error: "No data available" });
}

// Real data only - no fallback simulation
async function fetchFloorPriceReal(projectId) {
    const collection = testCollections[projectId];
    if (!collection) {
        console.error(`Collection not found: ${projectId}`);
        return;
    }
    
    // Show loading state
    updateFloorPriceUI(projectId, { loading: true });
    
    try {
        // Try the real API
        await fetchFloorPrice(projectId);
    } catch (error) {
        console.log(`Real API failed for ${projectId}, no fallback available`);
        handleNoDataAvailable(projectId);
    }
}

// Refresh floor price for a specific project
function refreshFloorPrice(projectId) {
    console.log(`Manual refresh requested for ${projectId}`);
    fetchFloorPriceReal(projectId);
}

// Auto-refresh all floor prices
function refreshAllFloorPrices() {
    console.log('Auto-refreshing all floor prices...');
    Object.keys(testCollections).forEach(projectId => {
        fetchFloorPriceReal(projectId);
    });
}

// Initialize the floor price functionality
function initializeFloorPrices() {
    console.log('Initializing floor price functionality...');
    
    // Add event listeners for refresh buttons
    Object.keys(testCollections).forEach(projectId => {
        const refreshButton = document.getElementById(`${projectId}-refresh`);
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                refreshFloorPrice(projectId);
            });
        }
    });
    
    // Initial fetch for all collections
    refreshAllFloorPrices();
    
    // Set up auto-refresh every 15 minutes
    setInterval(refreshAllFloorPrices, 15 * 60 * 1000);
    
    console.log('Floor price functionality initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Floor Price Test Page Loaded');
    console.log('Using backend server:', BACKEND_SERVER);
    
    // Initialize floor price functionality
    initializeFloorPrices();
    
    // Add some debugging info
    console.log('Available test collections:', Object.keys(testCollections));
    console.log('Auto-refresh interval: 15 minutes');
});

// Export functions for potential use in other scripts
window.FloorPriceTest = {
    fetchFloorPrice,
    refreshFloorPrice,
    refreshAllFloorPrices,
    testCollections
};
