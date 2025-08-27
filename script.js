// Badge helper functions
function getXFollowerBadge(followerCount) {
    if (followerCount >= 100000) {
        return { type: 'x-followers', tier: 'diamond', text: '100K+', title: '100K+ X Followers' };
    } else if (followerCount >= 50000) {
        return { type: 'x-followers', tier: 'platinum', text: '50K+', title: '50K+ X Followers' };
    } else if (followerCount >= 25000) {
        return { type: 'x-followers', tier: 'gold', text: '25K+', title: '25K+ X Followers' };
    } else if (followerCount >= 10000) {
        return { type: 'x-followers', tier: 'silver', text: '10K+', title: '10K+ X Followers' };
    } else if (followerCount >= 5000) {
        return { type: 'x-followers', tier: 'bronze', text: '5K+', title: '5K+ X Followers' };
    }
    return null; // No badge for under 5K followers
}

function getVolumeBadge(volumeUSD) {
    if (volumeUSD >= 2000000) {
        return { type: 'volume', tier: 'diamond', text: '2M+', title: '$2M+ Volume Traded' };
    } else if (volumeUSD >= 1000000) {
        return { type: 'volume', tier: 'gold', text: '1M+', title: '$1M+ Volume Traded' };
    } else if (volumeUSD >= 500000) {
        return { type: 'volume', tier: 'silver', text: '500K+', title: '$500K+ Volume Traded' };
    } else if (volumeUSD >= 100000) {
        return { type: 'volume', tier: 'bronze', text: '100K+', title: '$100K+ Volume Traded' };
    }
    return null; // No badge for under 100K volume
}

function renderBadges(badges) {
    if (!badges || badges.length === 0) return '';
    
    return badges.map(badge => {
        // Add appropriate icon based on badge type
        let iconHtml = '';
        if (badge.type === 'x-followers') {
            iconHtml = `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>`;
        } else if (badge.type === 'volume') {
            iconHtml = `<img src="magic_eden logo.png" alt="Magic Eden" class="badge-icon">`;
        } else if (badge.type === 'og') {
            iconHtml = `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`;
        }
        
        return `<div class="badge ${badge.type} ${badge.tier || ''}" title="${badge.title}">
            ${iconHtml}${badge.text}
        </div>`;
    }).join('');
}

// Function to update follower count and refresh badges
function updateProjectFollowers(projectId, followerCount) {
    if (projects[projectId]) {
        // Remove existing X follower badges
        projects[projectId].badges = projects[projectId].badges.filter(badge => badge.type !== 'x-followers');
        
        // Add new X follower badge if qualified
        const followerBadge = getXFollowerBadge(followerCount);
        if (followerBadge) {
            projects[projectId].badges.push(followerBadge);
        }
        
        // Refresh badges display
        initializeBadges();
        console.log(`Updated ${projectId} with ${followerCount} followers - Badge: ${followerBadge ? followerBadge.tier : 'none'}`);
    }
}

// Helper function to update multiple projects at once
// Usage example: updateMultipleFollowers({ 'chog': 120000, 'spiky': 30000, 'blench': 8000 })
function updateMultipleFollowers(followerData) {
    Object.entries(followerData).forEach(([projectId, count]) => {
        updateProjectFollowers(projectId, count);
    });
    console.log('Updated follower counts for:', Object.keys(followerData).join(', '));
}

// Function to update volume and refresh badges
function updateProjectVolume(projectId, volumeUSD) {
    if (projects[projectId]) {
        // Remove existing volume badges
        projects[projectId].badges = projects[projectId].badges.filter(badge => badge.type !== 'volume');
        
        // Add new volume badge if qualified
        const volumeBadge = getVolumeBadge(volumeUSD);
        if (volumeBadge) {
            projects[projectId].badges.push(volumeBadge);
        }
        
        // Refresh badges display
        initializeBadges();
        console.log(`Updated ${projectId} with $${volumeUSD.toLocaleString()} volume - Badge: ${volumeBadge ? volumeBadge.tier : 'none'}`);
    }
}

// Helper function to update multiple projects' volume at once
// Usage example: updateMultipleVolumes({ 'chog': 2500000, 'spiky': 750000, 'blench': 250000 })
function updateMultipleVolumes(volumeData) {
    Object.entries(volumeData).forEach(([projectId, volume]) => {
        updateProjectVolume(projectId, volume);
    });
    console.log('Updated volume for:', Object.keys(volumeData).join(', '));
}

// Project data
const projects = {
    blench: {
        name: "Blench",
        description: "AT ALL COSTS",
        banner: "blench/x banner.jpeg",
        pfp: "blench/x pfp.jpg",
        xLink: "https://x.com/blench",
        discordLink: "https://discord.com/invite/blench",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 16,600' },
            { type: 'volume', tier: 'bronze', text: '250K+', title: 'ME Volume: $491K' }
        ],
        whitelistInfo: {
            title: "Blench Whitelist Information",
            collections: [
                {
                    name: "Blench Pass",
                    description: "3 Passes grant 1 x GTD Whitelist",
                    icon: "blench/blench.gif"
                }
            ],
        },
        magicEdenLinks: [
            {
                name: "Blench Pass",
                url: "https://magiceden.io/collections/monad-testnet/0x46c66c40711a2953d1768926e53134c7ab272cd5"
            }
        ],
        artSneakPeeks: [
            "blench/sneakpeak1.jpeg",
            "blench/sneakpeak2.jpeg",
            "blench/sneakpeak3.jpeg",
            "blench/sneakpeak4.jpeg",
            "blench/sneakpeak5.jpeg",
            "blench/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Erkin",
                role: "Founder",
                pfp: "blench/erkin pfp.jpg",
                xLink: "https://x.com/Erkinovski"
            },
            {
                name: "Eviltaha",
                role: "Community Team",
                pfp: "blench/eviltaha pfp.jpg",
                xLink: "https://x.com/Eviltahaa"
            },
            {
                name: "Jeffers",
                role: "Community Team",
                pfp: "blench/jeffers pfp.jpg",
                xLink: "https://x.com/Jefferstellar"
            },
            {
                name: "Livrein",
                role: "Artist",
                pfp: "blench/livrein pfp.jpg",
                xLink: "https://x.com/0xLivrein"
            },
            {
                name: "Lenny",
                role: "Artist",
                pfp: "blench/lenny pfp.jpg",
                xLink: "https://x.com/ohmylenny"
            }
        ]
    },
    chog: {
        name: "Chog",
        description: "The Mascot of Monad | Powered by the monad community | NFTs and more 😈",
        banner: "chog/x banner.jpeg",
        pfp: "chog/x pfp.jpg",
        xLink: "https://x.com/ChogNFT",
        discordLink: "https://discord.gg/chog",
        badges: [
            { type: 'x-followers', tier: 'platinum', text: '50K+', title: 'X Followers: 52,000' },
            { type: 'volume', tier: 'platinum', text: '1.5M+', title: 'ME Volume: $2M' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Chog Whitelist Information",
            collections: [
                {
                    name: "Chogs Mystery Chest",
                    description: "No information available at the moment.",
                    icon: "chog/chog mystery chest.jpeg"
                },
                {
                    name: "Chog Pass",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "chog/chog pass.jpeg"
                }
            ],
            instructions: "To get whitelisted, join our Discord server, be active in the community, and participate in events. Chog Pass holders get priority access to new collections."
        },
        magicEdenLinks: [
            {
                name: "Chogs Mystery Chest",
                url: "https://magiceden.io/collections/monad-testnet/0xe6b5427b174344fd5cb1e3d5550306b0055473c6"
            },
            {
                name: "Chog Pass",
                url: "https://magiceden.io/collections/monad-testnet/0x7370a0a9e9a833bcd071b38fc25184e7afb57aff"
            }
        ],
        artSneakPeeks: [
            "chog/sneakpeak1.jpeg",
            "chog/sneakpeak2.jpeg",
            "chog/sneakpeak3.jpeg",
            "chog/sneakpeak4.jpeg",
            "chog/sneakpeak5.jpeg",
            "chog/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Benja",
                role: "Founder",
                pfp: "chog/benja pfp.jpg",
                xLink: "https://x.com/1stBenjaNAD"
            },
            {
                name: "Toad",
                role: "Co-founder",
                pfp: "chog/toad pfp.jpg",
                xLink: "https://x.com/Toadster69"
            },
            {
                name: "Rogue",
                role: "Main Artist",
                pfp: "chog/rogue pfp.jpg",
                xLink: "https://x.com/rogue110797"
            },
            {
                name: "PingPing",
                role: "Head Mod",
                pfp: "chog/ping ping pfp.jpg",
                xLink: "https://x.com/0x_PingPing"
            },
            {
                name: "Yot",
                role: "CM / Mod",
                pfp: "chog/yot pfp.jpg",
                xLink: "https://x.com/Yotdanz"
            },
            {
                name: "Tonashiro",
                role: "Developer",
                pfp: "chog/tonashiro pfp.jpg",
                xLink: "https://x.com/tonashiro_"
            },
            {
                name: "Tabsu",
                role: "Mod",
                pfp: "chog/tabsu pfp.jpg",
                xLink: "https://x.com/tabsuuu"
            },
            {
                name: "Mamio",
                role: "Social Media",
                pfp: "chog/mamio pfp.jpg",
                xLink: "https://x.com/realmamio"
            },
            {
                name: "bigchog",
                role: "X Intern",
                pfp: "chog/bigchog pfp.jpg",
                xLink: "https://x.com/bigchogenergy1"
            },
            {
                name: "Cookie",
                role: "Events",
                pfp: "chog/cookie pfp.jpg",
                xLink: "https://x.com/hatwifcookie"
            },
            {
                name: "Venty",
                role: "Events",
                pfp: "chog/venty pfp.jpg",
                xLink: "https://x.com/venti_nft"
            },
        ]
    },
    spiky: {
        name: "Spiky Nads",
        description: "Meet Spiky Nads – the sharp edge of pixel art NFTs on monad. SIUUUU",
        banner: "spiky/x banner.jpeg",
        pfp: "spiky/x pfp.jpg",
        xLink: "https://x.com/spikynads",
        discordLink: "https://discord.gg/spikynads",
        badges: [
            { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 38,000' },
            { type: 'volume', tier: 'platinum', text: '1.5M+', title: 'ME Volume: $1.7M' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Spiky Nads Whitelist Information",
            collections: [
                {
                    name: "Spikes",
                    description: "No information available at the moment.",
                    icon: "spiky/spikes.jpeg"
                },
                {
                    name: "SpiKeys",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "spiky/speky.webp"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events. Spikes holders get priority access to new drops."
        },
        magicEdenLinks: [
            {
                name: "Spikes",
                url: "https://magiceden.io/collections/monad-testnet/0x87e1f1824c9356733a25d6bed6b9c87a3b31e107"
            },
            {
                name: "SpiKeys",
                url: "https://magiceden.io/collections/monad-testnet/0xbb406139138401f4475ca5cf2d7152847159eb7a"
            }
        ],
        artSneakPeeks: [
            "spiky/sneakpeak1.jpeg",
            "spiky/sneakpeak2.jpeg",
            "spiky/sneakpeak3.jpeg",
            "spiky/sneakpeak4.jpeg",
            "spiky/sneakpeak5.jpeg",
            "spiky/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "KG",
                role: "Co-Founder",
                pfp: "spiky/kg pfp.jpg",
                xLink: "https://x.com/KGdotmon"
            },
            {
                name: "jakx",
                role: "Co-Founder & Artist",
                pfp: "spiky/jakx pfp.jpg",
                xLink: "https://x.com/jakxpixel"
            },
            {
                name: "Mondalf",
                role: "Advisor & Social Media Manager",
                pfp: "spiky/mondalf pfp.jpg",
                xLink: "https://x.com/andalfthegreat"
            },
            {
                name: "Maher",
                role: "Community Team",
                pfp: "spiky/maher pfp.jpg",
                xLink: "https://x.com/MahTrader13"
            },
            {
                name: "Tun",
                role: "Discord Mod",
                pfp: "spiky/tun pfp.jpg",
                xLink: "https://x.com/Tun_Carrot"
            },
            {
                name: "sss",
                role: "Social Media Artist",
                pfp: "spiky/sss pfp.png",
                xLink: "https://x.com/mannaspirit1"
            },
            {
                name: "ERDİNÇ",
                role: "Community team",
                pfp: "spiky/erdinc pfp.png",
                xLink: "https://x.com/erdincsekerim"
            },
            {
                name: "Yot",
                role: "Community Team",
                pfp: "spiky/yot pfp.jpg",
                xLink: "https://x.com/Yotdanz"
            },
            {
                name: "m0neyy",
                role: "Community Team",
                pfp: "spiky/m0neyy pfp.jpg",
                xLink: "https://x.com/m0neyy35"
            },
            {
                name: "Novee",
                role: "Developer",
                pfp: "spiky/novee pfp.jpg",
                xLink: "https://x.com/Novee_VeenoX"
            },
            {
                name: "GodGareng",
                role: "Collection Artist",
                pfp: "spiky/godgareng pfp.jpg",
                xLink: "https://x.com/GodGareng"
            },
            {
                name: "Sirmeekay",
                role: "Community/Social Media Artist",
                pfp: "spiky/sirm pfp.jpg",
                xLink: "https://x.com/Sirmee_kay"
            },
            {
                name: "NadAlyan",
                role: "Social Media Artist",
                pfp: "spiky/nad pfp.jpg",
                xLink: "https://x.com/NadAlyan308"
            },
            {
                name: "Potato",
                role: "Intern Mod",
                pfp: "spiky/potato pfp.jpg",
                xLink: "https://x.com/0xPotato_13"
            },
        ]
    },
    chogstar: {
        name: "lil chogstars",
        description: "Lil Chogstars. A pfpNFT's collection with modern and creative style accessories. Inspired by Chog.",
        banner: "chogstar/x banner.jpeg",
        pfp: "chogstar/x pfp.jpg",
        xLink: "https://x.com/chogstarrr",
        discordLink: "https://discord.gg/chogstars",
        websiteLink: "https://lilchogstars.com",
        badges: [
            { type: 'x-followers', tier: 'diamond', text: '100K+', title: 'X Followers: 164,000' },
            { type: 'volume', tier: 'diamond', text: '2.5M+', title: 'ME Volume: $3.9M' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Lil Chogstars Whitelist Information",
            collections: [
                {
                    name: "Lil chogstars Superstarlist Pass",
                    description: "Grants 2 x GTD Whitelist",
                    icon: "chogstar/superstar.jpeg"
                },
                {
                    name: "Lil Chogstars Starlist Pass",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "chogstar/starlist.jpeg"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events. Superstarlist Pass holders get priority access to new collections."
        },
        magicEdenLinks: [
            {
                name: "Lil chogstars Superstarlist Pass",
                url: "https://magiceden.io/collections/monad-testnet/0xd20ef03e432208af083c0fb4e401049f4f29949f"
            },
            {
                name: "Lil Chogstars",
                url: "https://magiceden.io/collections/monad-testnet/0x26c86f2835c114571df2b6ce9ba52296cc0fa6bb"
            }
        ],
        artSneakPeeks: [
            "chogstar/sneakpeak1.jpeg",
            "chogstar/sneakpeak2.jpeg",
            "chogstar/sneakpeak3.jpeg",
            "chogstar/sneakpeak4.jpeg",
            "chogstar/sneakpeak5.jpeg",
            "chogstar/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Tequila",
                role: "Founder & Artist",
                pfp: "chogstar/tequila pfp.jpg",
                xLink: "https://x.com/0xtequilaa"
            },
            {
                name: "OrpheuzKaze",
                role: "Community Team",
                pfp: "chogstar/orpheuz pfp.jpg",
                xLink: "https://x.com/orpheuzkaze"
            },
            {
                name: "badboyfoxy",
                role: "Community Team",
                pfp: "chogstar/badboyfoxy pfp.jpg",
                xLink: "https://x.com/BADBOYFOXy"
            },
            {
                name: "Lewis888",
                role: "Discord Mod",
                pfp: "chogstar/lewis pfp.jpg",
                xLink: "https://x.com/Lewis8888888"
            },
            {
                name: "Darwan",
                role: "Developer",
                pfp: "chogstar/darwan pfp.jpg",
                xLink: "https://x.com/thisjiro"
            },
            {
                name: "Tony2",
                role: "Artist",
                pfp: "chogstar/tony pfp.jpg",
                xLink: "https://x.com/Tonyy_Draws"
            },
            {
                name: "okoli",
                role: "Community Team",
                pfp: "chogstar/okoli pfp.jpg",
                xLink: "https://x.com/OKOLIEMMANUELS2"
            },  
            {
                name: "akba",
                role: "X Intern",
                pfp: "chogstar/akba pfp.jpg",
                xLink: "https://x.com/akbacrypto"
            },
            {
                name: "Adah",
                role: "X Intern",
                pfp: "chogstar/adah pfp.jpg",
                xLink: "https://x.com/0x_adah"
            },
        ]
    },
    sealuminati: {
        name: "Sealuminati",
        description: "Arfing on Monad. Incubated by PixlDAO",
        banner: "sealuminati/x banner.jpeg",
        pfp: "sealuminati/x pfp.jpg",
        xLink: "https://x.com/sealuminati", 
        discordLink: "https://discord.gg/VP5Tt5ccjb", 
        websiteLink: "https://sealuminati.xyz/",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 14,000' },
            { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $912K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ], 
        whitelistInfo: {
            title: "Sealuminati Whitelist Information",
            collections: [
                {
                    name: "Sealuminati Testnetooor",
                    description: "50 NFTs = Access to Inner Circle + REDACTED",
                    icon: "sealuminati/testnetoor.gif"
                },
                {
                    name: "Sealuminati Testnetooor",
                    description: "10 NFTs = 1 x GTD Whitelist",
                    icon: "sealuminati/testnetoor.gif"
                },
                {
                    name: "Sealuminati Testnetooor",
                    description: "1 NFT = 1 x FCFS",
                    icon: "sealuminati/testnetoor.gif"
                }
            ],
            instructions: "Join Discord, stay active, and participate in community events to qualify."
        },
        magicEdenLinks: [
            {
                name: "Sealuminati Testnetooor",
                url: "https://magiceden.io/collections/monad-testnet/0x4870e911b1986c6822a171cdf91806c3d44ce235"
            }
        ],
        artSneakPeeks: [
            "sealuminati/sneakpeak1.jpeg",
            "sealuminati/sneakpeak2.jpeg",
            "sealuminati/sneakpeak3.jpeg",
            "sealuminati/sneakpeak4.jpeg",
            "sealuminati/sneakpeak5.jpeg",
            "sealuminati/sneakpeak6.jpeg",
        ],
        team: [
            {
                name: "Hornelius",
                role: "Co-Founder & Lead Dev",
                pfp: "sealuminati/hornelius pfp.jpg",
                xLink: "https://x.com/horneliusdoteth"
            },
            {
                name: "Richardnhsu",
                role: "Lead Artist",
                pfp: "sealuminati/richardhsu pfp.jpg",
                xLink: "https://x.com/richardnhsu"
            },
            {
                name: "Sammy",
                role: "Lead Marketing",
                pfp: "sealuminati/sammy pfp.jpg",
                xLink: "https://x.com/Web3gamed"
            },
            {
                name: "Cookies",
                role: "Creative Director & Artist",
                pfp: "sealuminati/cookies pfp.jpg",
                xLink: "https://x.com/cook_ees"
            },
            {
                name: "Woo",
                role: "Cult Lead",
                pfp: "sealuminati/woo pfp.jpg",
                xLink: "https://x.com/KingWooo"
            },
            {
                name: "Grizzly",
                role: "Cult Lead",
                pfp: "sealuminati/grizzly pfp.jpg",
                xLink: "https://x.com/Grizzly_nad"
            }
        ]
    },
    "mondana baddies": {
        name: "Mondana Baddies",
        description: "enter the purple realm on Monad, 𝐦𝐨𝐧𝐝𝐚𝐧𝐚.",
        banner: "mondana baddies/x banner.jpeg",
        pfp: "mondana baddies/x pfp.jpg",
        xLink: "https://x.com/mondanabaddies",
        discordLink: "http://discord.gg/mondanahq",
        badges: [
            { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 38,000' },
            { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $956K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Mondana Baddies Whitelist Information",
            collections: [
                {
                    name: "Mondana Baddies Eye Chain",
                    description: "No information available at the moment",
                    icon: "mondana baddies/chain.gif"
                },
                {
                    name: "Mondana Baddies: Baddie Eye",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "mondana baddies/eye.jpeg"
                },
                {
                    name: "Foggy (Mondana Eyes Trait)",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "mondana baddies/foggy.jpeg"
                },
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in the purple realm community. Eye Chain holders get priority access."
        },
        magicEdenLinks: [
            {
                name: "Mondana Baddies Eye Chain",
                url: "https://magiceden.io/collections/monad-testnet/0xd6421e9c72199e971e5a3cde09214054e1216cd2"
            },
            {
                name: "Mondana Baddies: Baddie Eye",
                url: "https://magiceden.io/collections/monad-testnet/0x84db60168be10fb2ae274ea84e24cb22ffe11ddd"
            }
        ],
        artSneakPeeks: [
            "mondana baddies/sneakpeak1.jpeg",
            "mondana baddies/sneakpeak2.jpeg",
            "mondana baddies/sneakpeak3.jpeg",
            "mondana baddies/sneakpeak4.jpeg",
            "mondana baddies/sneakpeak5.jpeg",
            "mondana baddies/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Medusa",
                role: "Founder & Artist",
                pfp: "mondana baddies/medusa pfp.jpg",
                xLink: "https://x.com/medusa_apple"
            },
            {
                name: "Kate",
                role: "X Intern",
                pfp: "mondana baddies/kate pfp.jpg",
                xLink: "https://x.com/_kate_lv"
            }
        ]
    },
    daks: {
        name: "Daks",
        description: "The Daks is a pfpNFT collection built on Monad inspired by cutest purple animal as known as Molandak. ",
        banner: "daks/x banner.jpeg",
        pfp: "daks/x pfp.jpg",
        xLink: "https://x.com/thedaks_png",
        discordLink: "https://discord.gg/thedaks",
        websiteLink: "https://thedaks.xyz",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 22,000' },
            { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $625K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Daks Whitelist Information",
            collections: [
                {
                    name: "The Daks Fantasies",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "daks/fantasies.jpeg"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events. Daks holders get priority access to new collections."
        },
        magicEdenLinks: [
            {
                name: "The Daks Fantasies",
                url: "https://magiceden.io/collections/monad-testnet/0x4e88056e13de12bde065589e501033227d8188e6"
            },
            {
                name: "TheDaks",
                url: "https://magiceden.io/collections/monad-testnet/0x78ed9a576519024357ab06d9834266a04c9634b7"
            }
        ],
        artSneakPeeks: [
            "daks/sneakpeak1.jpeg",
            "daks/sneakpeak2.jpeg",
            "daks/sneakpeak3.jpeg",
            "daks/sneakpeak4.jpeg",
            "daks/sneakpeak5.jpeg",
            "daks/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Blu",
                role: "Founder & Artist",
                pfp: "daks/blu pfp.jpg",
                xLink: "https://x.com/bbluuuuuuuu"
            },
            {
                name: "Leonardo",
                role: "Community Manager",
                pfp: "daks/leonardo pfp.jpg",
                xLink: "https://x.com/leonardo_evmacc"
            },
            {
                name: "Bygra",
                role: "Community Team & X Intern",
                pfp: "daks/bygra pfp.jpg",
                xLink: "https://x.com/bygra0x0"
            },
            {
                name: "Skai",
                role: "Collab Manager",
                pfp: "daks/skai pfp.jpg",
                xLink: "https://x.com/Skaivii"
            }
        ]
    },
    slmnd: {
        name: "Slmnd",
        description: "SLMND a collection of Salmonads swimming upstream in the Monad river",
        banner: "slmnd/x banner.jpeg",
        pfp: "slmnd/x pfp.jpg",
        xLink: "https://x.com/slmndNFT",
        discordLink: "https://discord.gg/slmnd",
        badges: [
            { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 28,000' },
            { type: 'volume', tier: 'bronze', text: '250K+', title: 'ME Volume: $391K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Slmnd Whitelist Information",
            collections: [
                {
                    name: "SLMND Access Pass",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "slmnd/slmnd.jpeg"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events. Genesis holders get priority access to new drops."
        },
        magicEdenLinks: [
            {
                name: "SLMND Genesis",
                url: "https://magiceden.io/collections/monad-testnet/0xf7b984c089534ff656097e8c6838b04c5652c947?activeTab=items"
            },
            {
                name: "SLMND Access Pass",
                url: "https://magiceden.io/collections/monad-testnet/0x038b19e8f047d22bea5355ca99d976f7ee02c754"
            }
        ],
        artSneakPeeks: [
            "slmnd/sneakpeak1.jpeg",
            "slmnd/sneakpeak2.jpeg",
            "slmnd/sneakpeak3.jpeg",
            "slmnd/sneakpeak4.jpeg",
            "slmnd/sneakpeak5.jpeg",
            "slmnd/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Saddamovic",
                role: "Founder & Artist",
                pfp: "slmnd/saddamovic pfp.jpg",
                xLink: "https://x.com/SaddamWeb3"
            },
            {
                name: "Saw",
                role: "Co-Founder",
                pfp: "slmnd/thesaw pfp.jpg",
                xLink: "https://x.com/TheMrSaws"
            },
            {
                name: "Fort",
                role: "Co-Founder & Head of Collab",
                pfp: "slmnd/fort pfp.jpg",
                xLink: "https://x.com/forthefam365247"
            },
            {
                name: "Mr. Siomay",
                role: "Community Manager",
                pfp: "slmnd/mr_siomay pfp.jpg",
                xLink: "https://x.com/Mr_Siomay"
            }
        ]
    },
    overnads: {
        name: "Overnads",
        description: "PFP Collection. Built on Monad.",
        banner: "overnads/x banner.jpeg",
        pfp: "overnads/x pfp.jpg",
        xLink: "https://x.com/overnads",
        discordLink: "https://discord.gg/overnads",
        websiteLink: "https://overnads.xyz/",
        badges: [
            { type: 'x-followers', tier: 'diamond', text: '100K+', title: 'X Followers: 152,000' },
            { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $800K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Overnads Whitelist Information",
            collections: [
                {
                    name: "Overnads: Whitelist Pass",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "overnads/overnads.jpeg"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events. Whitelist Pass holders get priority access to new collections."
        },
        magicEdenLinks: [
            {
                name: "Overnads: Whitelist Pass",
                url: "https://magiceden.io/collections/monad-testnet/0x49d54cd9ca8c5ecadbb346dc6b4e31549f34e405"
            }
        ],
        artSneakPeeks: [
            "overnads/sneakpeak1.jpeg",
            "overnads/sneakpeak2.jpeg",
            "overnads/sneakpeak3.jpeg",
            "overnads/sneakpeak4.jpeg",
            "overnads/sneakpeak5.jpeg",
            "overnads/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Physe",
                role: "Founder & Artist",
                pfp: "overnads/physe pfp.jpg",
                xLink: "https://x.com/Sunonphyse"
            },
            {
                name: "Aceerblade",
                role: "Ambassador",
                pfp: "overnads/aceerblade pfp.jpg",
                xLink: "https://x.com/0xAceer"
            },
            {
                name: "Mohammed",
                role: "Community Team & Ambassador",
                pfp: "overnads/mohammed pfp.jpg",
                xLink: "https://x.com/xmohammedahmed"
            },
            {
                name: "Cilin",
                role: "Community Team",
                pfp: "overnads/cilin pfp.jpg",
                xLink: "https://x.com/1Cilineth"
            },
            {
                name: "Sachy",
                role: "Community Team",
                pfp: "overnads/sachy pfp.jpg",
                xLink: "https://x.com/0xSachy"
            },
            {
                name: "Cranky",
                role: "Community Team",
                pfp: "overnads/cranky pfp.jpg",
                xLink: "https://x.com/jumplifey9"
            },
            {
                name: "Gabriel Sosa",
                role: "Community Team",
                pfp: "overnads/gabriel_sosa pfp.jpg",
                xLink: "https://x.com/sekret_off"
            },
            {   
                name: "Butuskin",
                role: "Community Team",
                pfp: "overnads/butuskin pfp.jpg",
                xLink: "https://x.com/butuskin_"
                         }
         ]
     },
     bobr: {
         name: "Bobr",
         description: "First, only, official BOBR NFT on Monad. Welcome to the game.",
         banner: "bobr/x banner.jpeg",
         pfp: "bobr/x pfp.jpg",
                 xLink: "https://x.com/Bober_xyz",
        discordLink: "https://discord.gg/bobr",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 14,400' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
         whitelistInfo: {
             title: "Bobr Whitelist Information",
             collections: [
                 {
                     name: "BOBR",
                     description: "6 NFTs = Free mint / 3 NFTs = 1 x GTD Whitelist / 1 NFT = FCFS",
                     icon: "bobr/bobr.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in community events. BOBR holders get priority access to new drops."
         },
         magicEdenLinks: [
             {
                 name: "BOBR",
                 url: "https://magiceden.io/collections/monad-testnet/0x3ff5ab5eea49d25ab00b532e9e50b17d5218068c"
             }
         ],
         artSneakPeeks: [
            "bobr/sneakpeak1.jpeg",
            "bobr/sneakpeak2.jpeg",
            "bobr/sneakpeak3.jpeg",
            "bobr/sneakpeak4.jpeg",
            "bobr/sneakpeak5.jpeg",
            "bobr/sneakpeak6.jpeg"
        ],
         team: [
             {
                 name: "Leys",
                 role: "CEO & Marketing, Collab",
                 pfp: "bobr/leys pfp.jpg",
                 xLink: "https://x.com/leysbobr"
             },
             {
                 name: "Koza",
                 role: "CEO & Marketing, Collab",
                 pfp: "bobr/koza pfp.jpg",
                 xLink: "https://x.com/koza_bobr"
             },
             {
                 name: "Vinni",
                 role: "Arist",
                 pfp: "bobr/vinni pfp.jpg",
                 xLink: "https://x.com/Vinni_gmi"
             }, 
             {
                 name: "3D Nad",
                 role: "3D Arist",
                 pfp: "bobr/3d nad pfp.jpg",
                 xLink: "https://x.com/3D_Nad"
             },
             {
                 name: "Sillvuk",
                 role: "Community Team Lead",
                 pfp: "bobr/sillvuk pfp.jpg",
                 xLink: "https://x.com/0xsillvuk"
             },
             {
                 name: "D3m0n1k",
                 role: "Community Team",
                 pfp: "bobr/demonik pfp.jpg",
                 xLink: "https://x.com/d3m0n1k_bobr"
             },
             {
                 name: "Enyo",
                 role: "Community Team",
                 pfp: "bobr/enyo pfp.jpg",
                 xLink: "https://x.com/enyolabby"
             },
             {
                 name: "Torzyk",
                 role: "Community Team",
                 pfp: "bobr/torzyk pfp.jpg",
                 xLink: "https://x.com/torzyk87"
             },
             {
                 name: "Elija",
                 role: "Intern",
                 pfp: "bobr/elija pfp.jpg",
                 xLink: "https://x.com/elijapapicrypto"
             },
         ]
     },
     "10k squad": {
         name: "The 10k Squad",
         description: "The 10k Squad was created as a place for all the misfits. Everyone deserves to belong and we want to make sure that happens.",
         banner: "10k squad/x banner.jpeg",
         pfp: "10k squad/x pfp.jpg",
         xLink: "https://x.com/the10kSquad",
         discordLink: "https://discord.gg/the10ksquad",
         websiteLink: "https://x.com/the10kSquad",
         badges: [
             { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 23,000' },
             { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $976K' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "The 10k Squad Whitelist Information",
             collections: [
                 {
                     name: "EGGcellent",
                     description: "GOLD = 1 x GTD Whitelist / SILVER = 1 x FCFS",
                     icon: "10k squad/eggscellent.jpeg"
                 },
                 {
                    name: "10k x Fantasy Pass",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "10k squad/fantasy.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in community events. The10kSquad holders get priority access to new drops."
         },
         magicEdenLinks: [
             {
                 name: "The10kSquad",
                 url: "https://magiceden.io/collections/monad-testnet/0x3a9454c1b4c84d1861bb1209a647c834d137b442"
             },
             {
                name: "EGGcellent",
                url: "https://magiceden.io/collections/monad-testnet/0x7da93750de078bfbbab0dd30635448e9ec7fb8f0"
             },
             {
                name: "10k x Fantasy Pass",
                url: "https://magiceden.io/collections/monad-testnet/0xdee182a4d9146e8d7621f54706b649cf2b95cb4e"
             }
         ],
         artSneakPeeks: [
            "10k squad/sneakpeak1.jpeg",
            "10k squad/sneakpeak2.jpeg",
            "10k squad/sneakpeak3.jpeg",
            "10k squad/sneakpeak4.jpeg",
            "10k squad/sneakpeak5.jpeg",
            "10k squad/sneakpeak6.jpeg"
        ],
         team: [
             {
                 name: "Puresoul",
                 role: "Founder",
                 pfp: "10k squad/puresoul pfp.jpg",
                 xLink: "https://x.com/puresoul0109"
             },
             {
                 name: "LKA",
                 role: "Lead Kindness Advocate",
                 pfp: "10k squad/LKA pfp.jpg",
                 xLink: "https://x.com/Lka10nft"
             },
             {
                 name: "MGD",
                 role: "Mediator Gatekeeper Director",
                 pfp: "10k squad/MGD pfp.jpg",
                 xLink: "https://x.com/atomicute"
             },
             {
                name: "Cash",
                role: "Newbies King",
                pfp: "10k squad/cash pfp.jpg",
                xLink: "https://x.com/Itskelam"
             },
             {
                name: "Karate Kid",
                role: "Byte Me",
                pfp: "10k squad/karate_kid pfp.png",
                xLink: "https://x.com/dgrua50"
             },
             {
                name: "Afonso",
                role: "Jolly Fella",
                pfp: "10k squad/afonso pfp.jpg",
                xLink: "https://x.com/afonso003_"
             },
             {
                name: "Uday",
                role: "Bug Slayer",
                pfp: "10k squad/uday pfp.jpg",
                xLink: "https://x.com/uday_dhorajiya"
             },
             {
                name: "Razec",
                role: "Beer Provider",
                pfp: "10k squad/razec pfp.jpg",
                xLink: "https://x.com/razecbtc"
             },
             {
                name: "Nagi",
                role: "Community Team",
                pfp: "10k squad/nagi pfp.jpg",
                xLink: "https://x.com/Nagiiiiseishiro"
             },
             {
                name: "Black Crypto",
                role: "Community Team",
                pfp: "10k squad/black pfp.jpg",
                xLink: "https://x.com/nusobnut2"
             },
             {
                name: "Data Gene",
                role: "Community Team",
                pfp: "10k squad/data pfp.jpg",
                xLink: "https://x.com/data_gene"
             },
             {
                name: "Adedayo",
                role: "Community Team",
                pfp: "10k squad/adedayo pfp.jpg",
                xLink: "https://x.com/AdedayoWeb3"
             },
             {
                name: "Nath",
                role: "Community Team",
                pfp: "10k squad/nath pfp.jpg",
                xLink: "https://x.com/NathCaDiHoL"
             },
             {
                name: "Pablo",
                role: "Community Team",
                pfp: "10k squad/pablo pfp.jpg",
                xLink: "https://x.com/pabloo669"
             },
             {
                name: "Get0",
                role: "Community Team",
                pfp: "10k squad/get0 pfp.jpg",
                xLink: "https://x.com/su9uru9et0"
             },
             {
                name: "Incognito",
                role: "Community Team",
                pfp: "10k squad/incognito pfp.jpg",
                xLink: "https://x.com/Rushna71"
             },
             {
                name: "Aphrodite",
                role: "Community Team",
                pfp: "10k squad/aphrodite pfp.jpg",
                xLink: "https://x.com/a_aphrodiite"
             },
             {
                name: "Demon",
                role: "Community Team",
                pfp: "10k squad/demon pfp.jpg",
                xLink: "https://x.com/demon__10k"
             },
             {
                name: "Ibuycrypto",
                role: "Community Team",
                pfp: "10k squad/ibuycrypto pfp.jpg",
                xLink: "https://x.com/gang_shiba"
             }
         ]
     },
     meowwnads: {
         name: "Meowwnads",
         description: "Welcome to the coziest place on the internet, it's a haven for cats, where you can be yourself and be part of the cat club. Meowwnads was created as a request for social interaction and the development of a community of cats and web3 lovers. Our main goal is to create a sustainable community, because the value of the project lies in its people",
         banner: "meowwnads/x banner.jpeg",
         pfp: "meowwnads/x pfp.jpg",
         xLink: "https://x.com/meowwnads",
         discordLink: "https://discord.gg/meowwnads",
         websiteLink: "https://meowwn.ad",
         badges: [
             { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 37,000' },
             { type: 'volume', tier: 'gold', text: '1M+', title: 'ME Volume: $1M' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Meowwnads Whitelist Information",
             collections: [
                 {
                     name: "Meowwnads OG Pass",
                     description: "Grants 1 x GTD Whitelist",
                     icon: "meowwnads/og.jpeg"
                 },
                 {
                     name: "Meowwnads Testnet Collection",
                     description: "3 x NFTs = 1 x GTD Whitelist",
                     icon: "meowwnads/meoww.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in the cat community. OG Pass holders get priority access to new collections."
         },
         magicEdenLinks: [
             {
                 name: "Meowwnads Testnet Collection",
                 url: "https://magiceden.io/collections/monad-testnet/0xa568cabe34c8ca0d2a8671009ae0f6486a314425"
             },
             {
                name: "Meowwnads | OG Pass",
                url: "https://magiceden.io/collections/monad-testnet/0xd60c64487d581d5eb2b15f221bd6d8187a9a4aef"
             }
         ],
         artSneakPeeks: [
            "meowwnads/sneakpeak1.jpeg",
            "meowwnads/sneakpeak2.jpeg",
            "meowwnads/sneakpeak3.jpeg",
            "meowwnads/sneakpeak4.jpeg",
            "meowwnads/sneakpeak5.jpeg",
            "meowwnads/sneakpeak6.jpeg"
         ],
         team: [
             {
                 name: "Anastasia",
                 role: "Founder & Artist",
                 pfp: "meowwnads/anastasia pfp.jpg",
                 xLink: "https://x.com/Nastenkkkkkkkka"
             },
             {
                 name: "Lunnexx",
                 role: "Co-Founder & Community Manager",
                 pfp: "meowwnads/lunnex pfp.jpg",
                 xLink: "https://x.com/Lunnexex"
             },
             {
                 name: "Izana",
                 role: "Core Team",
                 pfp: "meowwnads/izana pfp.jpg",
                 xLink: "https://x.com/izana3133"
             },
             {
                name: "Ylona",
                role: "Community Team",
                pfp: "meowwnads/ylona pfp.jpg",
                xLink: "https://x.com/ylonaaah"
             },
             {
                name: "Chikuu",
                role: "Community Team",
                pfp: "meowwnads/chikuu pfp.jpg",
                xLink: "https://x.com/Chikuu1314"
             },
             {
                name: "Haisse",
                role: "Community Team",
                pfp: "meowwnads/haisse pfp.jpg",
                xLink: "https://x.com/Heissen_twit"
             },
         ]
     },
     mouch: {
         name: "Mouch",
         description: "Bringing the swarm to life. La Mouch, is an NFT pfp collection that will be invading Monad. Mouch is inevitable",
         banner: "mouch/x banner.jpeg",
         pfp: "mouch/x pfp.jpg",
         xLink: "https://x.com/LaMouchNFT",
         discordLink: "https://discord.gg/lamouch",
         badges: [
             { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 25,000' },
             { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $640K' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Mouch Whitelist Information",
             collections: [
                 {
                     name: "LaMouch x Fantasytop Pass",
                     description: "Grants 1 x GTD Whitelist",
                     icon: "mouch/fantasytop.gif"
                 },
                 {
                    name: "La Mouch NFT",
                    description: "3 x NFTs = 1 x FCFS / 30 NFTs = 1 x GTD",
                    icon: "mouch/lamouchnft.webp"
                 },
                 {
                    name: "La Mouch",
                    description: "1 x NFT = 1 x FCFS / 10 NFTs = 1 x GTD",
                    icon: "mouch/lamouch.avif"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in the Mouch community."
         },
         magicEdenLinks: [
             {
                 name: "La Mouch",
                 url: "https://magiceden.io/collections/monad-testnet/0x5a21b0f4a4f9b54e16282b6ed5ad014b3c77186f"
             },
             {
                name: "La Mouch NFT",
                url: "https://magiceden.io/collections/monad-testnet/0x800f8cacc990dda9f4b3f1386c84983ffb65ce94"
             },
             {
                name: "LaMouch x Fantasytop Pass",
                url: "https://magiceden.io/collections/monad-testnet/0x4bac889f20b9de43734f15379096c98f34154c50"
             }
         ],
         artSneakPeeks: [
            "mouch/sneakpeak1.jpeg",
            "mouch/sneakpeak2.jpeg",
            "mouch/sneakpeak3.jpeg",
            "mouch/sneakpeak4.jpeg",
            "mouch/sneakpeak5.jpeg",
            "mouch/sneakpeak6.jpeg"
         ],
         team: [
             {
                 name: "Gleader",
                 role: "Founder & Artist",
                 pfp: "mouch/gleader pfp.jpg",
                 xLink: "https://x.com/0xGleader"
             },
             {
                name: "Deus",
                role: "Co-Founder",
                pfp: "mouch/deus pfp.jpg",
                xLink: "https://x.com/0x_Deus"
             },
             {
                name: "Cranky",
                role: "Collab Manager",
                pfp: "mouch/cranky pfp.jpg",
                xLink: "https://x.com/jumplifey9"
             },
             {
                name: "Novee",
                role: "Developer",
                pfp: "mouch/novee pfp.jpg",
                xLink: "https://x.com/Novee_VeenoX"
             },
             {
                name: "Srabon",
                role: "Collab Manager",
                pfp: "mouch/srabon pfp.jpg",
                xLink: "https://x.com/mozammall258"
             }
         ]
     },
     monadverse: {
         name: "Monadverse",
         description: "A cultural movement featuring monanimals on Monad. For the Nads, By the Nads.",
         banner: "monadverse/x banner.jpeg",
         pfp: "monadverse/x pfp.jpg",
         xLink: "https://x.com/monadverse",
         discordLink: "https://discord.gg/monadverse",
         badges: [
             { type: 'x-followers', tier: 'diamond', text: '100K+', title: 'X Followers: 345,000' },
             { type: 'volume', tier: 'platinum', text: '1.5M+', title: 'ME Volume: $1.5M' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Monadverse Whitelist Information",
             collections: [
                 {
                     name: "Genesis Hatch",
                     description: "Grants 1 x GTD Whitelist",
                     icon: "monadverse/genesis.gif"
                 }, 
                 {
                    name: "Momo",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "monadverse/momo.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in the Monadverse community."
         },
         magicEdenLinks: [
             {
                 name: "Monadverse Genesis Hatch",
                 url: "https://magiceden.io/collections/monad-testnet/0x2ace467d5c55d75cf04ae7b9c7672bc499d8e246"
             },
             {
                name: "Momo",
                url: "https://magiceden.io/collections/monad-testnet/0xbc8f6824fde979848ad97a52bced2d6ca1842a68"
             }
         ],
         artSneakPeeks: [
            "monadverse/sneakpeak1.jpeg",
            "monadverse/sneakpeak2.jpeg",
            "monadverse/sneakpeak3.jpeg",
            "monadverse/sneakpeak4.jpeg",
            "monadverse/sneakpeak5.jpeg",
            "monadverse/sneakpeak6.jpeg"
         ],
         team: [
             {
                 name: "Claw",
                 role: "Founder",
                 pfp: "monadverse/claw pfp.jpg",
                 xLink: "https://x.com/clawnad9"
             },
             {
                name: "Phoenad",
                role: "Co - Founder",
                pfp: "monadverse/phoenad pfp.jpg",
                xLink: "https://x.com/phoenad9"
             },
             {
                name: "Frost",
                role: "Core Team",
                pfp: "monadverse/frost pfp.jpg",
                xLink: "https://x.com/Frost_xyz"
             },
             {
                name: "Chine",
                role: "Core Team",
                pfp: "monadverse/chine pfp.jpg",
                xLink: "https://x.com/0xChine"
             },
             {
                name: "Moandad",
                role: "Core Team",
                pfp: "monadverse/moandad pfp.jpg",
                xLink: "https://x.com/moandad1"
             },
             {
                name: "FLPB",
                role: "Core Team",
                pfp: "monadverse/flb pfp.jpg",
                xLink: "https://x.com/flb_xyz"
             },
         ]
     },
     chewy: {
         name: "Chewy",
         description: "Earn, stake, upgrade, trade. 🤖 Coming soon to Monad",
         banner: "chewy/x banner.jpeg",
         pfp: "chewy/x pfp.png",
         xLink: "https://x.com/Chewy_xyz",
         discordLink: "https://discord.gg/chewymonad",
         badges: [
             { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 38,100' },
             { type: 'volume', tier: 'gold', text: '1M+', title: 'ME Volume: $1.12M' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Chewy Whitelist Information",
             collections: [
                 {
                     name: "Chewy",
                     description: "Grants 1 x FCFS Whitelist",
                     icon: "chewy/chewy.jpeg"
                 }, 
                 {
                    name: "Chewy x Fantasytop",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "chewy/fantasytop.jpeg"
                 },
                 {
                    name: "MECHA BOX",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "chewy/mechabox.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in the Chewy community."
         },
         magicEdenLinks: [
             {
                 name: "Chewy",
                 url: "https://magiceden.io/collections/monad-testnet/0x88bbcba96a52f310497774e7fd5ebadf0ece21fb"
             },
             {
                name: "Chewy x Fantasytop",
                url: "https://magiceden.io/collections/monad-testnet/0x3aec2a91206d68aaa6bb1ca7faf3eb3da2a69489"
             },
             {
                name: "MECHA BOX",
                url: "https://magiceden.io/collections/monad-testnet/mecha_box_mint_pass"
             }
         ],
         artSneakPeeks: [
            "chewy/sneakpeak1.jpeg",
            "chewy/sneakpeak2.jpeg",
            "chewy/sneakpeak3.jpeg",
            "chewy/sneakpeak4.jpeg",
            "chewy/sneakpeak5.jpeg",
            "chewy/sneakpeak6.jpeg"
         ],
         team: [
             {
                 name: "Kaiz",
                 role: "CEO",
                 pfp: "chewy/kaiz pfp.jpg",
                 xLink: "https://x.com/Kaizen_abc"
             },
             {
                name: "Uday",
                role: "Core Team & Dev",
                pfp: "chewy/uday pfp.jpg",
                xLink: "https://x.com/uday_dhorajiya"
             },
             {
                name: "JericD",
                role: "Community Lead",
                pfp: "chewy/jericd pfp.jpg",
                xLink: "https://x.com/jericddd  "
             },
             {
                name: "JudoChy",
                role: "Community Team",
                pfp: "chewy/judochy pfp.jpg",
                xLink: "https://x.com/JudoChy"
             }
         ]
     },
     skrumpeys: {
         name: "Skrumpeys",
         description: "🟣💫 skrumpeys 💜🍬 A whimsical PFP project. Only on Monad ✦ 𓆩 𝒑𝒐𝒔𝒕-𝒖𝒕𝒊𝒍𝒊𝒕𝒚 𝒐𝒓𝒏𝒂𝒎𝒆𝒏𝒕𝒂𝒍𝒊𝒔𝒎 𓆪 ✦  ~ ᴅɴ ~ ✦",
         banner: "skrumpeys/x banner.jpeg",
         pfp: "skrumpeys/x pfp.jpg",
         xLink: "https://x.com/skrumpeys",
         discordLink: "https://discord.gg/switchboardxyz",
         badges: [
             { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 11,000' },
             { type: 'volume', tier: 'diamond', text: '2.5M+', title: 'ME Volume: $3.6M' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Skrumpeys Whitelist Information",
             collections: [
                 {
                     name: "Skrumpets",
                     description: "Grants 1 x GTD Whitelist",
                     icon: "skrumpeys/skrumpets.jpeg"
                 },
                 {
                    name: "DN",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "skrumpeys/dn.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in the Skrumpeys community."
         },
         magicEdenLinks: [
             {
                 name: "Skrumpets",
                 url: "https://magiceden.io/collections/monad-testnet/0xe8f0635591190fb626f9d13c49b60626561ed145"
             },
             {
                name: "DN",
                url: "https://magiceden.io/collections/monad-testnet/0x151cf400af08bca390b16582ed6c4f096e4f17eb"
             }
         ],
         artSneakPeeks: [
            "skrumpeys/sneakpeak1.jpeg",
            "skrumpeys/sneakpeak2.jpeg",
            "skrumpeys/sneakpeak3.jpeg",
            "skrumpeys/sneakpeak4.jpeg",
            "skrumpeys/sneakpeak5.jpeg",
            "skrumpeys/sneakpeak6.jpeg"
         ],
         team: [
             {
                 name: "Melo",
                 role: "Founder & Artist",
                 pfp: "skrumpeys/melo pfp.jpg",
                 xLink: "https://x.com/melooox3"
             }
         ]
     },
     llamao: {
         name: "Llamao",
         description: "The first ideology on Monad | Llamaoism",
         banner: "llamao/x banner.jpeg",
         pfp: "llamao/x pfp.jpg",
         xLink: "https://x.com/llamao_",
         discordLink: "https://discord.com/invite/llamao",
         badges: [
             { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 23,000' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Llamao Whitelist Information",
             collections: [
                 {
                     name: "Llamao Genesis",
                     description: "Grants 1 x GTD Whitelist",
                     icon: "llamao/genesis.jpeg"
                 },
                 {
                    name: "Llamao x Fantasytop",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "llamao/fantasytop.jpeg"
                 }
             ],
             instructions: "To get whitelisted, join our Discord server and actively participate in the Llamao community."
         },
         magicEdenLinks: [
             {
                 name: "Llamao Genesis",
                 url: "https://magiceden.io/collections/monad-testnet/0xb0a663cf4853e67221fee43322fda402e21debfc"
             },
             {
                name: "Llamao x Fantasytop",
                url: "https://magiceden.io/collections/monad-testnet/0x38f3730b009ec1707f5409caf44e329cc7b4d050"
             }
         ],
         artSneakPeeks: [
            "llamao/sneakpeak1.jpeg",
            "llamao/sneakpeak2.jpeg",
            "llamao/sneakpeak3.jpeg",
            "llamao/sneakpeak4.jpeg",
            "llamao/sneakpeak5.jpeg",
            "llamao/sneakpeak6.jpeg"
         ],
         team: [
             {
                 name: "YoYo",
                 role: "Co - Founder",
                 pfp: "llamao/yoyo pfp.jpg",
                 xLink: "https://x.com/yoyopyra"
             }, 
             {
                name: "Johun",
                role: "Co - Founder",
                pfp: "llamao/johun pfp.jpg",
                xLink: "https://x.com/johunvn"
             },
             {
                name: "Gelutt",
                role: "Community Manager",
                pfp: "llamao/gelutt pfp.jpg",
                xLink: "https://x.com/gelutt9"
             },
             {
                name: "UnyYLl",
                role: "Community Manager",
                pfp: "llamao/unyill pfp.jpg",
                xLink: "https://x.com/UnyilLNB"
             },
             {
                name: "Jasonad",
                role: "Community Manager",
                pfp: "llamao/jasonad pfp.jpg",
                xLink: "https://x.com/jasonphan_real"
             },
         ]
      },
    monshape: {
         name: "Monshape",
         description: "Monshape is the unique vector PFP collection on Monad . It started as a desire to add a personal touch to the world of NFTs and share that with the community.",
         banner: "monshape/x banner.jpeg",
         pfp: "monshape/x pfp.jpg",
         xLink: "https://x.com/monshape",
         discordLink: "https://discord.gg/monshape-club-1185808698438852638",
         websiteLink: "https://monshape.club/home",
         badges: [
             { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 26,000' },
             { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $705K' },
             { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
         ],
         whitelistInfo: {
             title: "Monshape Whitelist Information",
             collections: [
                {
                    name: "Lost Discs",
                    description: "Different WL depending on the type/color.",
                    icon: "monshape/disc.gif"
                },
                {
                    name: "Monshape x Fantasy WL Pass",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "monshape/fantasytop.jpeg"
                },
                {
                    name: "Monshape Hopium",
                    description: "Possible raffles, limited info available.",
                    icon: "monshape/hopium.jpeg"
                }
             ]
         },
         magicEdenLinks: [
            {
                name: "Lost Discs",
                url: "https://magiceden.io/collections/monad-testnet/0xcd719c599ebc51193c5c97cbe188f43c8c4c8745"
            },
            {
                name: "Monshape x Fantasy WL Pass",
                url: "https://magiceden.io/collections/monad-testnet/0x977b9b652dcd87e5fbdb849b12ab63a6bb01ac05"
            },
            {
                name: "Monshape Hopium",
                url: "https://magiceden.io/collections/monad-testnet/0x69f2688abe5dcde0e2413f77b80efcc16361a56e"
            }
         ],
         artSneakPeeks: [
            "monshape/sneakpeak1.jpeg",
            "monshape/sneakpeak2.jpeg",
            "monshape/sneakpeak3.jpeg",
            "monshape/sneakpeak4.jpeg",
            "monshape/sneakpeak5.jpeg",
            "monshape/sneakpeak6.jpeg"
         ],
         team: [
            {
                name: "Zhangliu",
                role: "Founder",
                pfp: "monshape/zhangliu pfp.jpg",
                xLink: "https://x.com/zhangliu_eth"
            },
            {
                 name: "Yves",
                 role: "Co-Founder",
                 pfp: "monshape/yves.jpg",
                 xLink: "https://x.com/Yves_truong"
             },
             {
                 name: "Meiji",
                 role: "Community Team",
                 pfp: "monshape/meiji pfp.jpg",
                 xLink: "https://x.com/meiji_ft"
             },
             {
                 name: "RhepNFT",
                 role: "Moderator",
                 pfp: "monshape/rhepnft pfp.jpg",
                 xLink: "https://x.com/RhepNFT"
             },
             {
                 name: "Juju",
                 role: "Community Team",
                 pfp: "monshape/juju pfp.jpg",
                 xLink: "https://x.com/juju5378"
             },
             {
                 name: "NadAlyan",
                 role: "Artist",
                 pfp: "monshape/nadalyan pfp.jpg",
                 xLink: "https://x.com/NadAlyan308"
             },
             {
                name: "Cymes",
                role: "Moderator",
                pfp: "monshape/cymes pfp.jpg",
                xLink: "https://x.com/Cymes26"
             }
         ]
    },
    realnads: {
        name: "Real Nads",
        description: "Build with Real, Connect with Nads. Contributors' community build on Monad.",
        banner: "realnads/x banner.jpeg",
        pfp: "realnads/x pfp.jpg",
        xLink: "https://x.com/RealNadsClub",
        discordLink: "http://discord.gg/realnads",
        websiteLink: "https://www.realnads.club/",
        badges: [
            { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 30,000' },
            { type: 'volume', tier: 'bronze', text: '250K+', title: 'ME Volume: $282K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Real Nads Whitelist Information",
            collections: [
                {
                    name: "RealNads Premint Pass",
                    description: "3 NFTs = 1 x GTD Whitelist",
                    icon: "realnads/realnads.jpeg"
                },
                {
                    name: "RealNads Premint Pass",
                    description: "1 NFT = 1 x FCFS",
                    icon: "realnads/realnads.jpeg"
                }
            ]
        },
        magicEdenLinks: [
            {
                name: "RealNads Premint Pass",
                url: "https://magiceden.io/collections/monad-testnet/0xb981a81b45f604f82bd502a35c6dbe25dd2e8b8d"
            }
        ],
        artSneakPeeks: [
            "realnads/sneakpeak1.jpeg",
            "realnads/sneakpeak2.jpeg",
            "realnads/sneakpeak3.jpeg",
            "realnads/sneakpeak4.jpeg",
            "realnads/sneakpeak5.jpeg",
            "realnads/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Chine",
                role: "Founder",
                pfp: "realnads/chine pfp.jpg",
                xLink: "https://x.com/0xChine"
            }, 
            {
                name: "Rains",
                role: "Co-Founder & Artist",
                pfp: "realnads/rains pfp.jpg",
                xLink: "https://x.com/rainss08"
            }, 
            {
                name: "Potato King",
                role: "Co-Founder & Artist",
                pfp: "realnads/potatoking pfp.jpg",
                xLink: "https://x.com/0xpotatoking"
            }, 
            {
                name: "Seven",
                role: "Co-Founder & Dev",
                pfp: "realnads/seven pfp.jpg",
                xLink: "https://x.com/_Seven7777777"
            }, 
            {
                name: "Emiyns",
                role: "Collab Manager",
                pfp: "realnads/emiyns pfp.jpg",
                xLink: "https://x.com/emiyns88"
            }, 
            {
                name: "MingMing",
                role: "Community Manager",
                pfp: "realnads/mingming pfp.jpg",
                xLink: "https://x.com/mingming_Monad"
            }, 
            {
                name: "Kaybu",
                role: "Community Manager",
                pfp: "realnads/kaybu pfp.jpg",
                xLink: "https://x.com/0xkaybu"
            }, 
            {
                name: "LK",
                role: "Collab Manager",
                pfp: "realnads/LK pfp.jpg",
                xLink: "https://x.com/LK_328"
            }, 
            {
                name: "Picano",
                role: "Artist",
                pfp: "realnads/picano pfp.jpg",
                xLink: "https://x.com/Pican0_o"
            }, 
            {
                name: "Mido",
                role: "Artist",
                pfp: "realnads/mido pfp.jpg",
                xLink: "https://x.com/Mido_269"
            }, 
            {
                name: "JN",
                role: "Artist",
                pfp: "realnads/JN pfp.jpg",
                xLink: "https://x.com/JN_Jeannieeee"
            }, 
            {
                name: "Nomad",
                role: "Dev",
                pfp: "realnads/nomad pfp.jpg",
                xLink: "https://x.com/cryptofash34791"
            },
        ]
    },
    blocknads: {
        name: "Block Nads",
        description: "A paradigm shift. The new order of defiance. An exclusive circle of explorers. Anon, do you even explore?",
        banner: "blocknads/x banner.jpeg",
        pfp: "blocknads/x pfp.jpg",
        xLink: "https://x.com/BlockNads",
        discordLink: "https://discord.gg/blocknads",
        websiteLink: "https://www.blocknads.art/#home",
        magicEdenLink: "https://magiceden.io/collections/blocknads",
        badges: [
            { type: 'x-followers', tier: 'gold', text: '25K+', title: 'X Followers: 27,400' },
            { type: 'volume', tier: 'bronze', text: '250K+', title: 'ME Volume: $494K' }
        ],
        whitelistInfo: {
            title: "Block Nads Whitelist Information",
            collections: [
                {
                    name: "Blocknads",
                    description: "No information available at the moment",
                    icon: "blocknads/blocknads.jpeg"
                },
                {
                    name: "Block Permit",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "blocknads/permit.jpeg"
                },
                
            ]
        },
        magicEdenLinks: [
            {
                name: "Blocknads",
                url: "https://magiceden.io/collections/monad-testnet/0x6ed438b2a8eff227e7e54b5324926941b140eea0"
            }
        ],
        artSneakPeeks: [
            "blocknads/sneakpeak1.jpeg",
            "blocknads/sneakpeak2.jpeg",
            "blocknads/sneakpeak3.jpeg",
            "blocknads/sneakpeak4.jpeg",
            "blocknads/sneakpeak5.jpeg",
            "blocknads/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Bensage",
                role: "CEO & Designer",
                pfp: "blocknads/bensage pfp.jpg",
                xLink: "https://x.com/Bensage_C"
            },
            {
                name: "Woshvad",
                role: "COO & Front End Developer",
                pfp: "blocknads/woshvad pfp.jpg",
                xLink: "https://x.com/0xWoshvad"
            },
            {
                name: "Builciber",
                role: "CTO, Back-End & Smart Contract Developer",
                pfp: "blocknads/builciber pfp.jpg",
                xLink: "https://x.com/builciber"
            },
            {
                name: "Dayo",
                role: "Artist",
                pfp: "blocknads/dayo pfp.jpg",
                xLink: "https://x.com/_Freakazord_"
            },
            {
                name: "Imagiink",
                role: "Artist",
                pfp: "blocknads/imagiink pfp.jpg",
                xLink: "https://x.com/Imagiink_D"
            },
            {
                name: "L3kan",
                role: "Chief of Memes",
                pfp: "blocknads/l3kan pfp.jpg",
                xLink: "https://x.com/L3kanOh"
            },
            {
                name: "Puresoul",
                role: "Community Manager",
                pfp: "blocknads/puresoul pfp.jpg",
                xLink: "https://x.com/puresoul0109"
            }
        ]
    },
    r3tards: {
        name: "R3tards",
        description: "just a bunch of r3tards on the Monad blockchain",
        banner: "r3tards/x banner.jpeg",
        pfp: "r3tards/x pfp.jpg",
        collectionPfp: {
            "r3tards": "r3tards/r3tards.jpeg",
            "r3tardv3rs3": "r3tards/retardverse.jpeg",
            "Monad Nurse": "r3tards/nurse.jpeg"
        },
        xLink: "https://x.com/r3tardsNFT",
        discordLink: "",
        websiteLink: "https://www.r3tards.club/",
        badges: [
            { type: 'volume', tier: 'gold', text: '1M+', title: 'ME Volume: $1.366M' }
        ],
        whitelistInfo: {
            title: "R3tards Whitelist Information",
            collections: [
                {
                    name: "r3tards",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "r3tards/r3tards.jpeg"
                },
                {
                    name: "r3tardv3rs3",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "r3tards/retardverse.jpeg"
                },
                {
                    name: "Monad Nurse",
                    description: "Grants 1 x GTD Whitelist",
                    icon: "r3tards/nurse.jpeg"
                }
            ]
        },
        magicEdenLinks: [
            {
                name: "r3tards",
                url: "https://magiceden.io/collections/monad-testnet/0xed52e0d80f4e7b295df5e622b55eff22d262f6ed"
            },
            {
                name: "r3tardv3rs3",
                url: "https://magiceden.io/collections/monad-testnet/0x2b9ee0a88d69eef1cffe3ea330165e17fd976c3c"
            },
            {
                name: "Monad Nurse",
                url: "https://magiceden.io/collections/monad-testnet/0x8827a10506653af9de490e160ad134e6293d3b47"
            }
        ],
        artSneakPeeks: [
            "r3tards/sneakpeak1.jpeg",
            "r3tards/sneakpeak2.jpeg",
            "r3tards/sneakpeak3.jpeg",
            "r3tards/sneakpeak4.jpeg",
            "r3tards/sneakpeak5.jpeg",
            "r3tards/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Dreiki",
                role: "Creator & Artist",
                pfp: "r3tards/dreiki pfp.jpg",
                xLink: "https://x.com/Dreiki10"
            },
        ]
    },
    "breath of estova": {
        name: "Breath of Estova",
        description: "Start your journey in the upcoming 2D action MMORPG BoE on Monad",
        banner: "breath of estova/x banner.jpeg",
        pfp: "breath of estova/x pfp.jpg",
        xLink: "https://x.com/BreathOfEstova",
        discordLink: "https://discord.gg/breathofestova",
        websiteLink: "https://www.breathofestova.com/",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 21,000' },
            { type: 'volume', tier: 'silver', text: '500K+', title: 'ME Volume: $509K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Breath of Estova Whitelist Information",
            collections: [
                {
                    name: "Legacy Eggs",
                    description: "No information available at the moment",
                    icon: "breath of estova/eggs.jpeg"
                },
                {
                    name: "Mystery Token",
                    description: "No information available at the moment",
                    icon: "breath of estova/token.jpeg"
                }
            ]
        },
        magicEdenLinks: [
            {
                name: "Legacy Eggs",
                url: "https://magiceden.io/collections/monad-testnet/0xa980f072bc06d67faec2b03a8ada0d6c9d0da9f8"
            },
            {
                name: "Mystery Token",
                url: "https://magiceden.io/collections/monad-testnet/0xff59f1e14c4f5522158a0cf029f94475ba469458"
            }
        ],
        artSneakPeeks: [
            "breath of estova/sneakpeak1.jpeg",
            "breath of estova/sneakpeak2.jpeg",
            "breath of estova/sneakpeak3.jpeg",
            "breath of estova/sneakpeak4.jpeg",
            "breath of estova/sneakpeak5.jpeg",
            "breath of estova/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Ketama",
                role: "Founder",
                pfp: "breath of estova/ketama pfp.jpg",
                xLink: "https://x.com/Ketama_crypto"
            },
            {
                name: "Rosin",
                role: "Founder",
                pfp: "breath of estova/rosin pfp.jpg",
                xLink: "https://x.com/rosinxyz"
            }
        ]
    },
    mopnads: {
        name: "Mop (🧺, 🧹)",
        description: "Mop is coming...",
        banner: "mopnads/x banner.jpeg",
        pfp: "mopnads/x pfp.jpg",
        xLink: "https://x.com/mopwtf",
        discordLink: "https://discord.gg/mopwtf",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 12,000' },
            { type: 'volume', tier: 'bronze', text: '250K+', title: 'ME Volume: $435K' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Mop Nads Whitelist Information",
            collections: [
                {
                    name: "Mop Nads",
                    description: "No information available at the moment",
                    icon: "mopnads/mop.jpeg"
                }
            ]
        },
        magicEdenLinks: [
            {
                name: "Mop Nads",
                url: "https://magiceden.io/collections/monad-testnet/0xb600de0ebee70af4691dbf8a732be7791b6ce73a"
            }
        ],
            artSneakPeeks: [
                "mopnads/sneakpeak1.jpeg",
                "mopnads/sneakpeak2.jpeg",
                "mopnads/sneakpeak3.jpeg",
                "mopnads/sneakpeak4.jpeg",
                "mopnads/sneakpeak5.jpeg",
                "mopnads/sneakpeak6.jpeg"
            ],
        team: [
            {
                name: "rskl",
                role: "Founder",
                pfp: "mopnads/rskl pfp.jpg",
                xLink: "https://x.com/rsklwtf"
            },
            {
                name: "9ine",
                role: "Mopmmunity Team",
                pfp: "mopnads/9ine pfp.jpg",
                xLink: "https://x.com/Badloaf1"
            },
            {
                name: "realOne",
                role: "Mopmmunity Team",
                pfp: "mopnads/realone pfp.jpg",
                xLink: "https://x.com/realonex369"
            },
            {
                name: "Mimie",
                role: "Community Team",
                pfp: "mopnads/mimie pfp.jpg",
                xLink: "https://x.com/0xMimie"
            },
            {
                name: "Cranky",
                role: "Community Team",
                pfp: "mopnads/cranky pfp.png",
                xLink: ""
            },
            {
                name: "Kaze",
                role: "Intern",
                pfp: "mopnads/kaze pfp.jpg",
                xLink: "https://x.com/KazeIX"
            },  
            {
                name: "Bikoy",
                role: "Intern",
                pfp: "mopnads/bikoy pfp.jpg",
                xLink: "https://x.com/BikoyInWeb3"
            },
            {
                name: "Yan",
                role: "Intern",
                pfp: "mopnads/Yan pfp.jpg",
                xLink: "https://x.com/YanLuci04"
            },
            {
                name: "Sunking",
                role: "Intern",
                pfp: "mopnads/sunking pfp.jpg",
                xLink: "https://x.com/sunking85735"
            },
            {
                name: "Deus",
                role: "Intern",
                pfp: "mopnads/deus pfp.jpg",
                xLink: "https://x.com/0x_Deus"
            }
        ]
    },
    owls: {
        name: "Owls",
        description: "The first  Owls collection on Monad 🦉",
        banner: "owls/x banner.jpeg",
        pfp: "owls/x pfp.jpg",
        xLink: "https://x.com/Owls_nft_",
        discordLink: "https://discord.gg/6XNWdeaGjP",
        badges: [
            { type: 'x-followers', tier: 'silver', text: '10K+', title: 'X Followers: 24,000' },
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Owls Whitelist Information",
            collections: [
                {
                    name: "OwlsMonad",
                    description: "5 NFTs = GTD Whitelist / 2 NFTs = 1 FCFS",
                    icon: "owls/owls.jpeg"
                }
            ]
        },
        magicEdenLinks: [
            {
                name: "OwlsMonad",
                url: "https://magiceden.io/collections/monad-testnet/0x869650871ebcc881faaf191b70f810abb66a1b5a"
            }
        ],
        artSneakPeeks: [
            "owls/sneakpeak1.jpeg",
            "owls/sneakpeak2.jpeg",
            "owls/sneakpeak3.jpeg",
            "owls/sneakpeak4.jpeg",
            "owls/sneakpeak5.jpeg",
            "owls/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Jao",
                role: "Founder",
                pfp: "owls/jao pfp.jpeg",
                xLink: "https://x.com/Jao_01s"
            },
            {
                name: "MikeZ",
                role: "Community Team",
                pfp: "owls/mikez pfp.jpg",
                xLink: "https://x.com/mike_z11"
            },
            {
                name: "Stivane",
                role: "Community Team",
                pfp: "owls/stivane pfp.jpg",
                xLink: "https://x.com/stivane_y"
            },
            {
                name: "Junet",
                role: "Community Team",
                pfp: "owls/junet pfp.jpg",
                xLink: "https://x.com/junet_X1"
            },
            {
                name: "Berrhyle",
                role: "Discord Moderator",
                pfp: "owls/berrhyle pfp.jpg",
                xLink: "https://x.com/Berrhyle"
            },
            {
                name: "Legendarniyivan",
                role: "Discord Moderator",
                pfp: "owls/legendarniyivan pfp.jpg",
                xLink: "https://x.com/Legendarniyivan"
            },
            {
                name: "Rosin",
                role: "Discord Moderator",
                pfp: "owls/rosin pfp.jpg",
                xLink: "https://x.com/Rosin_1s"
            }
        ]
    },
    monbeans: {
        name: "Mon Beans",
        description: "Builder Beans",
        banner: "monbeans/x banner.jpeg",
        pfp: "monbeans/x pfp.jpg",
        xLink: "https://x.com/MonBeans",
        discordLink: "https://discord.gg/monbeans",
        websiteLink: "https://monbeans.xyz/",
        badges: [],
        whitelistInfo: {
            title: "Mon Beans Whitelist Information",
            collections: [
                {
                    name: "Mon Beans",
                    description: "No information available at the moment",
                    icon: "monbeans/beans.jpeg"
                }
            ]
        },
        magicEdenLinks: [
            {
                name: "Mon Beans",
                url: "https://magiceden.io/collections/monad-testnet/0x6aa4872ab4e0fdf078efd17acd45b6352f47c39c"
            }
        ],
        artSneakPeeks: [
            "monbeans/sneakpeak1.avif",
            "monbeans/sneakpeak2.avif",
            "monbeans/sneakpeak3.avif",
            "monbeans/sneakpeak4.avif",
            "monbeans/sneakpeak5.avif",
            "monbeans/sneakpeak6.avif"
        ],
        team: [
            {
                name: "Aslan",
                role: "Co-Founder - UI / UX",
                pfp: "monbeans/aslan pfp.png",
                xLink: "https://x.com/aslanw3b"
            },
            {
                name: "Sabo",
                role: "Co-Founder - Dev",
                pfp: "monbeans/sabo pfp.png",
                xLink: "https://x.com/sabodev_"
            },
            {
                name: "Kutsal",
                role: "Community Manager - Dev",
                pfp: "monbeans/kutsal pfp.png",
                xLink: "https://x.com/gurhankutsal"
            },
            {
                name: "Kandor",
                role: "Developer",
                pfp: "monbeans/kandor pfp.png",
                xLink: "https://x.com/Kandor_D"
            },
            {
                name: "Blocash",
                role: "Collab Manager",
                pfp: "monbeans/blocash pfp.png",
                xLink: "https://x.com/blocash_"
            },
            {
                name: "Hyp3ronia",
                role: "Moderator",
                pfp: "monbeans/hyp3ronia pfp.png",
                xLink: "https://x.com/hyp3ronia"
            }
        ]
    },
    roarnads: {
        name: "Roar Nads",
        description: "expect nothing",
        banner: "roarnads/x banner.jpeg",
        pfp: "roarnads/x pfp.jpg",
        xLink: "https://x.com/roarnads",
        discordLink: "",
        badges: [],
        whitelistInfo: {
            title: "Roar Nads Whitelist Information",
            collections: []
        },
        magicEdenLinks: [],
        artSneakPeeks: [
            "roarnads/sneakpeak1.jpeg",
            "roarnads/sneakpeak2.jpeg",
            "roarnads/sneakpeak3.jpeg",
            "roarnads/sneakpeak4.jpeg",
            "roarnads/sneakpeak5.jpeg",
            "roarnads/sneakpeak6.jpeg"
        ],
        team: [
            {
                name: "Dayzer",
                role: "Founder & Artist",
                pfp: "roarnads/dayzer pfp.jpg",
                xLink: "https://x.com/Dayzer__"
            }
        ]
    },
    "mon amurz": {
        name: "Mon Amurz",
        description: "ur mischievous, loving, onchain imaginary friends on Monad",
        banner: "mon amurz/x banner.jpeg",
        pfp: "mon amurz/x pfp.jpg",
        xLink: "https://x.com/MonamurzNFT",
        discordLink: "",
        badges: [],
        whitelistInfo: {
            title: "Mon Amurz Whitelist Information",
            collections: [
                {
                    name: "Minimurz",
                    description: "No information available at the moment",
                    icon: "mon amurz/minimurz.avif"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events."
        },
        magicEdenLinks: [
            {
                name: "Minimurz",
                url: "https://magiceden.io/collections/monad-testnet/0xa8cb1e9e5b18e36eb2eb598014be657d4ebc5d33"
            }
        ],
        artSneakPeeks: [
            "mon amurz/sneakpeak1.avif",
            "mon amurz/sneakpeak2.avif",
            "mon amurz/sneakpeak3.avif",
            "mon amurz/sneakpeak4.avif",
            "mon amurz/sneakpeak5.avif",
            "mon amurz/sneakpeak6.avif"
        ],
        team: [
            {
                name: "Blubleau",
                role: "Founder",
                pfp: "mon amurz/blubleau pfp.jpg",
                xLink: "https://x.com/blubleau"
            }
        ]
    },
    monpunks: {
        name: "Monpunks",
        description: "Monpunks are 31x31 pixel art characters.Each Monpunks is created using a grid of 31 pixels by 31 pixels,build on Monad",
        banner: "monpunks/x banner.jpeg",
        pfp: "monpunks/x pfp.jpg",
        xLink: "https://x.com/monpunks",
        discordLink: "https://discord.gg/monpunks",
        badges: [
            { type: 'og', text: 'OG', title: 'OG Project - Existed before February 19, 2025' }
        ],
        whitelistInfo: {
            title: "Monpunks Whitelist Information",
            collections: [
                {
                    name: "Monpunks Nft Badge",
                    description: "No information available at the moment",
                    icon: "monpunks/badge.avif"
                }
            ],
            instructions: "To get whitelisted, join our Discord server and actively participate in community events. Monpunks holders get priority access to new collections."
        },
        magicEdenLinks: [
            {
                name: "Monpunks Nft Badge",
                url: "https://magiceden.io/collections/monad-testnet/0x100de33e80b9cc91e5dee80c15164338cee090ec?marketplaces=%5B%22magicEden%22%5D"
            }
        ],
        artSneakPeeks: [
            "monpunks/sneakpeak1.PNG",
            "monpunks/sneakpeak2.PNG",
            "monpunks/sneakpeak3.PNG",
            "monpunks/sneakpeak4.PNG",
            "monpunks/sneakpeak5.PNG",
            "monpunks/sneakpeak6.PNG"
        ],
        team: [
            {
                name: "Hrushikesh",
                role: "Founder & CM",
                pfp: "monpunks/hrushikesh pfp.jpg",
                xLink: "https://x.com/hrushi_eth"
            },
            {
                name: "Uba_Wealth",
                role: "Community Team Head, CM, Events",
                pfp: "monpunks/uba_wealth pfp.jpg",
                xLink: "https://x.com/7pairsoul"
            },
            {
                name: "Lambe",
                role: "Artist",
                pfp: "monpunks/lambe pfp.jpg",
                xLink: "https://x.com/lambe1981"
            },
            {
                name: "Dua",
                role: "Community Team",
                pfp: "monpunks/dua pfp.jpg",
                xLink: "https://x.com/itx__dua"
            },
            {
                name: "Augustine",
                role: "Artist & Community Team",
                pfp: "monpunks/augustine pfp.jpg",
                xLink: "https://x.com/cloud9_5FM"
            },
            {
                name: "Annie",
                role: "Events",
                pfp: "monpunks/annie pfp.jpg",
                xLink: "https://x.com/hannie_eth"
            },
            {
                name: "Leerex",
                role: "Artist & Events",
                pfp: "monpunks/leerex pfp.jpg",
                xLink: "https://x.com/Leerex__"
            },
            {
                name: "MoeeR87",
                role: "Pixel Artist",
                pfp: "monpunks/moeeR87 pfp.jpg",
                xLink: "https://x.com/MoeeR87"
            },
            {
                name: "Max",
                role: "Team",
                pfp: "monpunks/max pfp.jpg",
                xLink: "https://x.com/UmarovMax"
            }
        ]
    }
};

// DOM elements
const homepage = document.getElementById('homepage');
const projectDetail = document.getElementById('project-detail');
const projectBanners = document.querySelectorAll('.project-banner');
const whitelistButton = document.getElementById('whitelist-button');
const whitelistModal = document.getElementById('whitelist-modal');

// Initialize badges on page load
function initializeBadges() {
    const projectBanners = document.querySelectorAll('.project-banner');
    projectBanners.forEach(banner => {
        const projectId = banner.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project && project.badges) {
            const badgeContainer = banner.querySelector('.project-badges');
            if (badgeContainer) {
                badgeContainer.innerHTML = renderBadges(project.badges);
            } else {
                // Create badge container if it doesn't exist
                const badgeDiv = document.createElement('div');
                badgeDiv.className = 'project-badges';
                badgeDiv.innerHTML = renderBadges(project.badges);
                banner.insertBefore(badgeDiv, banner.firstChild);
            }
        }
    });
}

// Sorting and filtering functionality
let currentSort = 'default';
let originalOrder = []; // Store original order of project banners
// Filter state is now managed within initializeFilters function

function getProjectValue(projectId, type) {
    const project = projects[projectId];
    if (!project || !project.badges) return 0;
    
    const badge = project.badges.find(b => b.type === type);
    if (!badge) return 0;
    
    // Extract numeric value from badge text
    const text = badge.text.replace(/[^\d]/g, '');
    let multiplier = 1;
    
    if (badge.text.includes('K')) multiplier = 1000;
    if (badge.text.includes('M')) multiplier = 1000000;
    
    return parseInt(text) * multiplier || 0;
}

function getTierValue(tier) {
    const tierValues = { bronze: 1, silver: 2, gold: 3, platinum: 4, diamond: 5 };
    return tierValues[tier] || 0;
}

function sortProjects(sortType) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // If default order is requested, restore original order
    if (sortType === 'default') {
        // Clear the grid and re-append in original order
        projectsGrid.innerHTML = '';
        originalOrder.forEach(banner => projectsGrid.appendChild(banner));
        return;
    }
    
    const banners = Array.from(projectsGrid.children);
    
    banners.sort((a, b) => {
        const projectIdA = a.getAttribute('data-project');
        const projectIdB = b.getAttribute('data-project');
        const projectA = projects[projectIdA];
        const projectB = projects[projectIdB];
        
        switch (sortType) {
            case 'followers-desc':
                return getProjectValue(projectIdB, 'x-followers') - getProjectValue(projectIdA, 'x-followers');
            case 'followers-asc':
                return getProjectValue(projectIdA, 'x-followers') - getProjectValue(projectIdB, 'x-followers');
            case 'volume-desc':
                return getProjectValue(projectIdB, 'volume') - getProjectValue(projectIdA, 'volume');
            case 'volume-asc':
                return getProjectValue(projectIdA, 'volume') - getProjectValue(projectIdB, 'volume');
            case 'name-asc':
                return projectA.name.localeCompare(projectB.name);
            case 'name-desc':
                return projectB.name.localeCompare(projectA.name);
            default:
                return 0;
        }
    });
    
    // Re-append sorted banners
    banners.forEach(banner => projectsGrid.appendChild(banner));
}

function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    // Sort functionality
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortProjects(currentSort);
    });
}

function initializeBadgeInfo() {
    const badgeInfoContainer = document.querySelector('.badge-info-container');
    const badgeInfoButton = document.querySelector('.badge-info-button');
    
    if (!badgeInfoContainer || !badgeInfoButton) return;
    
    // Mobile tap functionality
    badgeInfoButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle active state on mobile and tablets
        if (window.innerWidth <= 768) {
            badgeInfoContainer.classList.toggle('active');
        }
    });
    
    // Close popup when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !badgeInfoContainer.contains(e.target)) {
            badgeInfoContainer.classList.remove('active');
        }
    });
    
    // Close popup on window resize if switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            badgeInfoContainer.classList.remove('active');
        }
    });
    
    // Close popup when scrolling on mobile (better UX)
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            badgeInfoContainer.classList.remove('active');
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Store original order of project banners
    const projectsGrid = document.querySelector('.projects-grid');
    originalOrder = Array.from(projectsGrid.children);
    
    // Initialize badges
    initializeBadges();
    
    // Initialize filter and sort functionality
    initializeSorting();
    
    // Initialize badge info popup
    initializeBadgeInfo();
    
    // Add click/touch event listeners to project banners
    projectBanners.forEach(banner => {
        // On non-hover devices (mobile/tablet), keep direct click handler
        if (!window.matchMedia('(hover: hover)').matches) {
            banner.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                showProjectDetail(projectId);
            });
        }

        // Add touch interactions for mobile
        addTouchInteractions(banner);
    });

    // On desktop/hover-capable devices, use delegated click handler
    if (window.matchMedia('(hover: hover)').matches) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.addEventListener('click', function(e) {
                const banner = e.target.closest('.project-banner');
                if (!banner) return;
                const projectId = banner.getAttribute('data-project');
                if (!projectId) return;
                showProjectDetail(projectId);
            });
        }
    }
    
    // Live search filtering for project banners
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        const normalize = (str) => (str || '').toLowerCase();
        const banners = Array.from(document.querySelectorAll('.project-banner'));

        const filterBanners = (query) => {
            const q = normalize(query);
            const hasQuery = q.length > 0;
            
            banners.forEach(banner => {
                const id = banner.getAttribute('data-project');
                const project = projects[id];
                const haystack = `${id} ${project?.name ?? ''}`;
                const searchMatch = normalize(haystack).includes(q);
                
                // Show only if search matches (no filtering needed)
                banner.style.display = searchMatch ? '' : 'none';
                
                // Disable animation delays when searching, restore when cleared
                if (hasQuery) {
                    // Remove animation delay and make immediately visible
                    banner.style.animationDelay = '0s';
                    banner.style.opacity = '1';
                    banner.style.transform = 'translateY(0) scale(1)';
                } else {
                    // Restore original animation delay
                    banner.style.animationDelay = '';
                    banner.style.opacity = '';
                    banner.style.transform = '';
                }
            });
        };

        // Initial state
        filterBanners('');

        // Input events
        searchInput.addEventListener('input', (e) => {
            filterBanners(e.target.value);
        });

        // Clear with Esc
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                filterBanners('');
            }
        });
    }
    
    // Whitelist modal functionality is now handled by initializeWhitelistModal() function
});

// Add touch interactions for mobile
function addTouchInteractions(banner) {
    let pressTimer = null;
    let isLongPress = false;
    let touchStartY = 0;
    let touchStartX = 0;
    let hasMoved = false;
    let scrollThreshold = 10; // pixels
    
    // Touch start
    banner.addEventListener('touchstart', function(e) {
        isLongPress = false;
        hasMoved = false;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        
        pressTimer = setTimeout(() => {
            isLongPress = true;
            this.classList.add('touch-active');
        }, 500); // 500ms for long press
    });
    
    // Touch move - detect if user is scrolling
    banner.addEventListener('touchmove', function(e) {
        if (!hasMoved) {
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = Math.abs(touchY - touchStartY);
            const deltaX = Math.abs(touchX - touchStartX);
            
            // If user moved more than threshold, consider it a scroll
            if (deltaY > scrollThreshold || deltaX > scrollThreshold) {
                hasMoved = true;
            }
        }
        
        clearTimeout(pressTimer);
        this.classList.remove('touch-active');
    });
    
    // Touch end
    banner.addEventListener('touchend', function(e) {
        clearTimeout(pressTimer);
        
        if (isLongPress) {
            // Long press completed - keep overlay visible
            e.preventDefault();
            return;
        }
        
        // Only navigate if user didn't move significantly (wasn't scrolling)
        if (!hasMoved) {
            const projectId = this.getAttribute('data-project');
            showProjectDetail(projectId);
        }
    });
    
    // Touch cancel
    banner.addEventListener('touchcancel', function(e) {
        clearTimeout(pressTimer);
        this.classList.remove('touch-active');
        hasMoved = false;
    });
    
    // Add click listener to hide overlay when tapping outside
    banner.addEventListener('click', function(e) {
        if (isLongPress) {
            e.preventDefault();
            this.classList.remove('touch-active');
            isLongPress = false;
        }
    });
}

// Hide all overlays when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.project-banner')) {
        document.querySelectorAll('.project-banner').forEach(banner => {
            banner.classList.remove('touch-active');
        });
    }
});

// Show project detail view
function showProjectDetail(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Animate homepage fade out
    homepage.classList.add('fade-out');
    
    setTimeout(() => {
        homepage.classList.remove('active');
        homepage.classList.remove('fade-out');
        
        // Populate project data
        populateProjectData(project, projectId);
        
        // Show project detail view
        projectDetail.classList.add('active');
        
        // Scroll to top of the page
        window.scrollTo(0, 0);
    }, 300);
}

// Populate project data in detail view
function populateProjectData(project, projectId) {
    // Set project PFP (profile picture)
    document.getElementById('project-banner-img').src = project.pfp;
    document.getElementById('project-banner-img').alt = project.name;
    
    // Set background banner
    document.getElementById('project-banner-bg').src = project.banner;
    document.getElementById('project-banner-bg').alt = project.name;
    
    // Set project name
    document.getElementById('project-name').textContent = project.name;
    
    // Set project description
    document.getElementById('project-description').textContent = project.description;
    
    // Set social links
    document.getElementById('x-link').href = project.xLink;
    document.getElementById('discord-link').href = project.discordLink;
    
    // Show whitelist button
    if (whitelistButton) {
        whitelistButton.style.display = 'flex';
    }
    
    // Handle website button
    const websiteButton = document.getElementById('website-link');
    
    if (project.websiteLink) {
        websiteButton.href = project.websiteLink;
        websiteButton.querySelector('.social-btn-icon').src = project.pfp;
        websiteButton.style.display = 'flex';
    } else {
        websiteButton.style.display = 'none';
    }
    
    // Populate floor price collections
    const floorPriceContainer = document.getElementById('floor-price-collections');
    floorPriceContainer.innerHTML = ''; // Clear previous collections

    if (project.magicEdenLinks && project.magicEdenLinks.length > 0) {
        project.magicEdenLinks.forEach(collection => {
            // Extract contract address from URL
            const urlParts = collection.url.split('/');
            const contractAddress = urlParts[urlParts.length - 1];
            
            const collectionElement = document.createElement('div');
            collectionElement.className = 'collection-floor-price';
            collectionElement.setAttribute('data-contract', contractAddress);
            
            // Get collection icon - try to find a matching image from whitelist collections
            let iconSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMzMzMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+';
            
            // Try to find a matching collection icon from whitelist collections
            if (projectId === 'chog') {
                if (collection.name.toLowerCase().includes('chest')) {
                    iconSrc = 'chog/chog mystery chest.jpeg';
                } else if (collection.name.toLowerCase().includes('pass')) {
                    iconSrc = 'chog/chog pass.jpeg';
                }
            } else if (projectId === 'spiky') {
                if (collection.name.toLowerCase().includes('spikes')) {
                    iconSrc = 'spiky/spikes.jpeg';
                } else if (collection.name.toLowerCase().includes('spikeys') || collection.name.toLowerCase().includes('spikey')) {
                    iconSrc = 'spiky/speky.webp';
                }
            } else if (projectId === 'blench') {
                if (collection.name.toLowerCase().includes('pass')) {
                    iconSrc = 'blench/blench.gif';
                }
            } else if (projectId === 'mondana baddies') {
                if (collection.name.toLowerCase().includes('chain')) {
                    iconSrc = 'mondana baddies/chain.gif';
                } else if (collection.name.toLowerCase().includes('eye') || collection.name.toLowerCase().includes('baddie')) {
                    iconSrc = 'mondana baddies/eye.jpeg';
                } else if (collection.name.toLowerCase().includes('foggy')) {
                    iconSrc = 'mondana baddies/foggy.jpeg';
                }
            } else if (projectId === 'chogstar') {
                if (collection.name.toLowerCase().includes('superstarlist')) {
                    iconSrc = 'chogstar/superstar.jpeg';
                } else if (collection.name.toLowerCase().includes('starlist')) {
                    iconSrc = 'chogstar/starlist.jpeg';
                }
            } else if (projectId === '10k squad') {
                if (collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = '10k squad/fantasy.jpeg';
                } else if (collection.name.toLowerCase().includes('eggcellent') || collection.name.toLowerCase().includes('eggs')) {
                    iconSrc = '10k squad/eggscellent.jpeg';
                }
            } else if (projectId === 'meowwnads') {
                if (collection.name.toLowerCase().includes('og')) {
                    iconSrc = 'meowwnads/og.jpeg';
                } else if (collection.name.toLowerCase().includes('testnet')) {
                    iconSrc = 'meowwnads/meoww.jpeg';
                }
            } else if (projectId === 'monadverse') {
                if (collection.name.toLowerCase().includes('genesis')) {
                    iconSrc = 'monadverse/genesis.gif';
                } else if (collection.name.toLowerCase().includes('momo')) {
                    iconSrc = 'monadverse/momo.jpeg';
                }
            } else if (projectId === 'chewy') {
                if (collection.name.toLowerCase().includes('chewy') && !collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = 'chewy/chewy.jpeg';
                } else if (collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = 'chewy/fantasytop.jpeg';
                } else if (collection.name.toLowerCase().includes('mecha')) {
                    iconSrc = 'chewy/mechabox.jpeg';
                }
            } else if (projectId === 'mouch') {
                if (collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = 'mouch/fantasytop.gif';
                } else if (collection.name.toLowerCase().includes('nft') && !collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = 'mouch/lamouchnft.webp';
                } else if (collection.name.toLowerCase().includes('mouch') && !collection.name.toLowerCase().includes('fantasy') && !collection.name.toLowerCase().includes('nft')) {
                    iconSrc = 'mouch/lamouch.avif';
                }
            } else if (projectId === 'overnads') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('whitelist')) {
                    iconSrc = 'overnads/overnads.jpeg';
                }
            } else if (projectId === 'slmnd') {
                if (collection.name.toLowerCase().includes('genesis')) {
                    iconSrc = 'slmnd/genesis.avif';
                } else if (collection.name.toLowerCase().includes('pass')) {
                    iconSrc = 'slmnd/slmnd.jpeg';
                }
            } else if (projectId === 'sealuminati') {
                if (collection.name.toLowerCase().includes('testnet')) {
                    iconSrc = 'sealuminati/testnetoor.gif';
                }
            } else if (projectId === 'blocknads') {
                if (collection.name.toLowerCase().includes('blocknads')) {
                    iconSrc = 'blocknads/blocknads.jpeg';
                } else if (collection.name.toLowerCase().includes('permit')) {
                    iconSrc = 'blocknads/permit.jpeg';
                }
            } else if (projectId === 'realnads') {
                if (collection.name.toLowerCase().includes('premint') || collection.name.toLowerCase().includes('pass')) {
                    iconSrc = 'realnads/realnads.jpeg';
                }
            } else if (projectId === 'monbeans') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('monbeans')) {
                    iconSrc = 'monbeans/monbeans.jpeg';
                }
            } else if (projectId === 'owls') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('owls')) {
                    iconSrc = 'owls/owls.jpeg';
                }
            } else if (projectId === 'mopnads') {
                if (collection.name.toLowerCase().includes('mop')) {
                    iconSrc = 'mopnads/mop.jpeg';
                }
            } else if (projectId === 'breath of estova') {
                if (collection.name.toLowerCase().includes('eggs')) {
                    iconSrc = 'breath of estova/eggs.jpeg';
                } else if (collection.name.toLowerCase().includes('token')) {
                    iconSrc = 'breath of estova/token.jpeg';
                }
            } else if (projectId === 'r3tards') {
                if (collection.name.toLowerCase().includes('r3tards') && !collection.name.toLowerCase().includes('r3tardv3rs3')) {
                    iconSrc = 'r3tards/r3tards.jpeg';
                } else if (collection.name.toLowerCase().includes('r3tardv3rs3')) {
                    iconSrc = 'r3tards/retardverse.jpeg';
                } else if (collection.name.toLowerCase().includes('nurse')) {
                    iconSrc = 'r3tards/nurse.jpeg';
                }
            } else if (projectId === 'bobr') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('bobr')) {
                    iconSrc = 'bobr/bobr.jpeg';
                }
            } else if (projectId === 'molandaks') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('molandaks')) {
                    iconSrc = 'molandaks/molandaks.jpeg';
                }
            } else if (projectId === 'monshape') {
                if (collection.name.toLowerCase().includes('discs')) {
                    iconSrc = 'monshape/disc.gif';
                } else if (collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = 'monshape/fantasytop.jpeg';
                } else if (collection.name.toLowerCase().includes('hopium')) {
                    iconSrc = 'monshape/hopium.jpeg';
                }
            } else if (projectId === 'llamao') {
                if (collection.name.toLowerCase().includes('genesis')) {
                    iconSrc = 'llamao/genesis.jpeg';
                } else if (collection.name.toLowerCase().includes('fantasy')) {
                    iconSrc = 'llamao/fantasytop.jpeg';
                }
            } else if (projectId === 'skrumpeys') {
                if (collection.name.toLowerCase().includes('skrumpets')) {
                    iconSrc = 'skrumpeys/skrumpets.jpeg';
                } else if (collection.name.toLowerCase().includes('dn')) {
                    iconSrc = 'skrumpeys/DN.jpeg';
                }
            } else if (projectId === 'daks') {
                if (collection.name.toLowerCase().includes('fantasies')) {
                    iconSrc = 'daks/fantasies.jpeg';
                } else if (collection.name.toLowerCase().includes('thedaks')) {
                    iconSrc = 'daks/thedaks.avif';
                }
            } else if (projectId === 'flappy mouch') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('flappy')) {
                    iconSrc = 'flappy mouch/flappy mouch.jpeg';
                }
            } else if (projectId === 'monpunks') {
                if (collection.name.toLowerCase().includes('badge')) {
                    iconSrc = 'monpunks/badge.avif';
                }
            } else if (projectId === 'mon amurz') {
                if (collection.name.toLowerCase().includes('minimurz')) {
                    iconSrc = 'mon amurz/minimurz.avif';
                }
            } else if (projectId === 'roarnads') {
                if (collection.name.toLowerCase().includes('pass') || collection.name.toLowerCase().includes('roar')) {
                    iconSrc = 'roarnads/roarnads.jpeg';
                }
            }
            
            // If no specific image found, try to use project's main image as fallback
            if (iconSrc === 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMzMzMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+') {
                iconSrc = project.pfp; // Use project's main profile picture as fallback
            }
            
            collectionElement.innerHTML = `
                <img src="${iconSrc}" alt="${collection.name}" class="collection-icon">
                <div class="collection-info">
                    <div class="collection-name">${collection.name}</div>
                    <div class="floor-price-display">
                        <span class="fp-label">FP:</span>
                        <span class="fp-value">--</span>
                    </div>
                </div>
            `;
            
            floorPriceContainer.appendChild(collectionElement);
        });
        
        // Initialize floor prices for this project
        initializeProjectFloorPrices();
    } else {
        floorPriceContainer.innerHTML = '<p class="no-collection">No collections found.</p>';
    }
    
    // Populate team members
    const teamContainer = document.getElementById('team-members');
    teamContainer.innerHTML = '';
    
    project.team.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        teamMember.innerHTML = `
            <a href="${member.xLink}" target="_blank" class="team-member-link">
                <img src="${member.pfp}" alt="${member.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiMzMzMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+'" class="team-member-pfp">
            </a>
            <div class="team-member-info">
                <h4>${member.name}</h4>
                <p>${member.role}</p>
            </div>
        `;
        teamContainer.appendChild(teamMember);
    });
    
    // Populate art sneak peeks if they exist
    const artContainer = document.getElementById('art-gallery');
    artContainer.innerHTML = '';
    
    if (project.artSneakPeeks && project.artSneakPeeks.length > 0) {
        document.querySelector('.art-section').style.display = 'block';
        project.artSneakPeeks.forEach((artPiece, index) => {
            const artElement = document.createElement('div');
            artElement.className = 'art-piece';
            artElement.innerHTML = `
                <img src="${artPiece}" alt="Art Sneak Peek ${index + 1}" onerror="this.style.display='none'">
            `;
            

            
            artContainer.appendChild(artElement);
        });
    } else {
        // Hide art section if no sneak peeks
        document.querySelector('.art-section').style.display = 'none';
    }
}

// Go back to homepage
function goBack() {
    // Animate project detail fade out
    projectDetail.classList.add('fade-out');
    
    setTimeout(() => {
        projectDetail.classList.remove('active');
        projectDetail.classList.remove('fade-out');
        
        // Hide whitelist button
        if (whitelistButton) {
            whitelistButton.style.display = 'none';
        }
        
        // Show homepage
        homepage.classList.add('active');
        
        // Re-trigger banner animations when returning to homepage
        const banners = document.querySelectorAll('.project-banner');
        banners.forEach((banner, index) => {
            banner.style.animation = 'none';
            banner.offsetHeight; // Trigger reflow
            banner.style.animation = `bannerAppear 0.8s ease-out ${0.1 + (index * 0.2)}s forwards`;
        });
    }, 300);
}

// Add smooth scrolling for better mobile experience
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});



// Add loading states for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectDetail.classList.contains('active')) {
        goBack();
    }
});

// Magic Eden dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize whitelist modal functionality
    initializeWhitelistModal();
    
    // Initialize Magic Eden dropdown
    initializeMagicEdenDropdown();
});

// Initialize whitelist modal functionality
function initializeWhitelistModal() {
    const whitelistButton = document.getElementById('whitelist-button');
    const whitelistModal = document.getElementById('whitelist-modal');
    const closeButton = whitelistModal.querySelector('.whitelist-modal-close');
    
    // Show whitelist modal when button is clicked
    if (whitelistButton) {
        whitelistButton.addEventListener('click', function() {
            const currentProject = getCurrentProject();
            if (currentProject && currentProject.whitelistInfo) {
                populateWhitelistModal(currentProject.whitelistInfo);
                whitelistModal.classList.add('show');
            }
        });
    }
    
    // Close modal when close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            whitelistModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    whitelistModal.addEventListener('click', function(e) {
        if (e.target === whitelistModal) {
            whitelistModal.classList.remove('show');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && whitelistModal.classList.contains('show')) {
            whitelistModal.classList.remove('show');
        }
    });
}

// Get current project from URL or active state
function getCurrentProject() {
    // This function should return the current project object
    // For now, we'll try to get it from the project detail view
    const projectName = document.getElementById('project-name')?.textContent;
    if (projectName) {
        // Find project by name
        for (const [id, project] of Object.entries(projects)) {
            if (project.name === projectName) {
                return project;
            }
        }
    }
    return null;
}

// Populate whitelist modal with project data
function populateWhitelistModal(whitelistInfo) {
    const modalTitle = document.getElementById('whitelist-modal-title');
    const modalDescription = document.getElementById('whitelist-modal-description');
    const collectionsList = document.getElementById('whitelist-collections-list');
    
    if (modalTitle) modalTitle.textContent = whitelistInfo.title;
    if (modalDescription) modalDescription.textContent = whitelistInfo.description;
    
    // Clear and populate collections
    if (collectionsList && whitelistInfo.collections) {
        collectionsList.innerHTML = '';
        whitelistInfo.collections.forEach(collection => {
            const collectionItem = document.createElement('div');
            collectionItem.className = 'collection-item';
            collectionItem.innerHTML = `
                <div class="collection-content">
                    <img src="${collection.icon || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMzMzMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+'}" alt="${collection.name}" class="collection-icon">
                    <div class="collection-text">
                        <div class="collection-name">${collection.name}</div>
                        <div class="collection-description">${collection.description}</div>
                    </div>
                </div>
            `;
            collectionsList.appendChild(collectionItem);
        });
    }
    
    // Instructions section removed - no longer showing "How to Get Whitelisted" box
}

// Initialize Magic Eden dropdown functionality
function initializeMagicEdenDropdown() {
    // Add click event listener for Magic Eden dropdown
    document.addEventListener('click', function(e) {
        const dropdown = e.target.closest('.magic-eden-dropdown');
        const button = e.target.closest('.dropdown-btn');
        
        // Close all dropdowns first
        document.querySelectorAll('.magic-eden-dropdown').forEach(dd => {
            dd.classList.remove('active');
        });
        
        // Toggle clicked dropdown
        if (button) {
            const parentDropdown = button.closest('.magic-eden-dropdown');
            parentDropdown.classList.toggle('active');
            e.stopPropagation();
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.magic-eden-dropdown')) {
            document.querySelectorAll('.magic-eden-dropdown').forEach(dd => {
                dd.classList.remove('active');
            });
        }
    });
}

// Floor Price Functionality
function initializeProjectFloorPrices() {
    const backendUrl = window.API_CONFIG?.apiBaseUrl || 'http://localhost:3000';
    
    // Function to fetch floor price for a collection
    async function fetchFloorPrice(contractAddress) {
        try {
            const response = await fetch(`${backendUrl}/floor/${contractAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching floor price for ${contractAddress}:`, error);
            return null;
        }
    }
    
    // Function to update floor price display
    function updateFloorPriceDisplay(container, data) {
        const fpValue = container.querySelector('.fp-value');
        if (fpValue && data && data.floorPriceFormatted) {
            fpValue.textContent = data.floorPriceFormatted;
        } else {
            fpValue.textContent = '--';
        }
    }
    
    // Function to refresh all floor prices for current project
    async function refreshProjectFloorPrices() {
        const collections = document.querySelectorAll('#floor-price-collections .collection-floor-price');
        
        for (const collection of collections) {
            const contractAddress = collection.getAttribute('data-contract');
            if (contractAddress) {
                const data = await fetchFloorPrice(contractAddress);
                updateFloorPriceDisplay(collection, data);
            }
        }
    }
    
    // Add click event to open Magic Eden collection page
    document.addEventListener('click', function(e) {
        const collectionContainer = e.target.closest('.collection-floor-price');
        if (collectionContainer) {
            const contractAddress = collectionContainer.getAttribute('data-contract');
            if (contractAddress) {
                const url = `https://magiceden.io/collections/monad-testnet/${contractAddress}`;
                window.open(url, '_blank');
            }
        }
    });
    
    // Initial load of floor prices
    refreshProjectFloorPrices();
    
    // Refresh every 15 minutes
    setInterval(refreshProjectFloorPrices, 15 * 60 * 1000);
}

 