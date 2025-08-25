// NFT Whitelist Checker JavaScript

class WhitelistChecker {
    constructor() {
        this.projects = {};
        this.whitelistedProjects = new Set();
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.userId = this.generateUserId();
        
        this.init();
    }

    init() {
        console.log('Initializing WhitelistChecker...'); // Debug log
        
        // Small delay to ensure DOM is fully ready
        setTimeout(() => {
            this.loadWhitelistStatus();
            this.renderProjects();
            this.setupEventListeners();
            this.updateStats();
            console.log('WhitelistChecker initialized'); // Debug log
        }, 50);
    }

    generateUserId() {
        // Generate a unique user ID if one doesn't exist
        let userId = localStorage.getItem('nft-whitelist-user-id');
        if (!userId) {
            // Create a unique identifier using timestamp + random string
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('nft-whitelist-user-id', userId);
        }
        return userId;
    }

    loadWhitelistStatus() {
        const saved = localStorage.getItem(`nft-whitelist-status-${this.userId}`);
        if (saved) {
            try {
                this.whitelistedProjects = new Set(JSON.parse(saved));
            } catch (e) {
                console.log('Error loading whitelist status, starting fresh');
                this.whitelistedProjects = new Set();
            }
        }
    }

    saveWhitelistStatus() {
        try {
            localStorage.setItem(`nft-whitelist-status-${this.userId}`, JSON.stringify([...this.whitelistedProjects]));
        } catch (e) {
            console.error('Error saving whitelist status:', e);
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterProjects();
            });
        }

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        console.log('Found filter buttons:', filterButtons.length); // Debug log
        
        filterButtons.forEach(btn => {
            // Remove existing listeners to prevent duplicates
            btn.removeEventListener('click', this.handleFilterClick);
            
            // Add fresh listener with proper binding
            btn.addEventListener('click', this.handleFilterClick.bind(this), { passive: false });
        });
    }
    
    // Separate method for filter button clicks to ensure proper binding
    handleFilterClick(e) {
        console.log('Filter button clicked:', e.target.dataset.filter); // Debug log
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.filterProjects();
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';

        // Get all projects from the main script
        if (typeof projects !== 'undefined') {
            this.projects = projects;
        } else {
            // Fallback if projects not loaded
            this.projects = this.getFallbackProjects();
        }

        this.filteredProjects = Object.entries(this.projects);
        this.renderProjectCards();
    }

    getFallbackProjects() {
        // Fallback project data if main script not loaded
        return {
            chog: {
                name: "CHOG",
                description: "The Mascot of Monad | Powered by the monad community | NFTs and more 😈",
                banner: "chog/x banner.jpeg",
                pfp: "chog/x pfp.jpg"
            },
            blench: {
                name: "Blench",
                description: "AT ALL COSTS",
                banner: "blench/x banner.jpeg",
                pfp: "blench/x pfp.jpg"
            },
            spiky: {
                name: "Spiky Nads",
                description: "Spiky Nads NFT Collection",
                banner: "spiky/x banner.jpeg",
                pfp: "spiky/x pfp.jpg"
            },
            overnads: {
                name: "Overnads",
                description: "Overnads NFT Collection",
                banner: "overnads/x banner.jpeg",
                pfp: "overnads/x pfp.jpg"
            },
            monadverse: {
                name: "Monadverse",
                description: "Monadverse NFT Collection",
                banner: "monadverse/x banner.jpeg",
                pfp: "monadverse/x pfp.jpg"
            },
            monbeans: {
                name: "Monbeans",
                description: "Monbeans NFT Collection",
                banner: "monbeans/x banner.jpeg",
                pfp: "monbeans/x pfp.jpg"
            },
            monpunks: {
                name: "Monpunks",
                description: "Monpunks NFT Collection",
                banner: "monpunks/x banner.jpeg",
                pfp: "monpunks/x pfp.jpg"
            },
            monshape: {
                name: "Monshape",
                description: "Monshape NFT Collection",
                banner: "monshape/x banner.jpeg",
                pfp: "monshape/x pfp.jpg"
            },
            mopnads: {
                name: "Mopnads",
                description: "Mopnads NFT Collection",
                banner: "mopnads/x banner.jpeg",
                pfp: "mopnads/x pfp.jpg"
            },
            mouch: {
                name: "Mouch",
                description: "Mouch NFT Collection",
                banner: "mouch/x banner.jpeg",
                pfp: "mouch/x pfp.jpg"
            },
            owls: {
                name: "Owls",
                description: "Owls NFT Collection",
                banner: "owls/x banner.jpeg",
                pfp: "owls/x pfp.jpg"
            },
            realnads: {
                name: "Realnads",
                description: "Realnads NFT Collection",
                banner: "realnads/x banner.jpeg",
                pfp: "realnads/x pfp.jpg"
            },
            sealuminati: {
                name: "Sealuminati",
                description: "Sealuminati NFT Collection",
                banner: "sealuminati/x banner.jpeg",
                pfp: "sealuminati/x pfp.jpg"
            },
            skrumpeys: {
                name: "Skrumpeys",
                description: "Skrumpeys NFT Collection",
                banner: "skrumpeys/x banner.jpeg",
                pfp: "skrumpeys/x pfp.jpg"
            },
            slmnd: {
                name: "SLMND",
                description: "SLMND NFT Collection",
                banner: "slmnd/x banner.jpeg",
                pfp: "slmnd/x pfp.jpg"
            },
            "10k squad": {
                name: "10K Squad",
                description: "10K Squad NFT Collection",
                banner: "10k squad/x banner.jpeg",
                pfp: "10k squad/x pfp.jpg"
            },
            blocknads: {
                name: "Blocknads",
                description: "Blocknads NFT Collection",
                banner: "blocknads/x banner.jpeg",
                pfp: "blocknads/x pfp.jpg"
            },
            bobr: {
                name: "Bobr",
                description: "Bobr NFT Collection",
                banner: "bobr/x banner.jpeg",
                pfp: "bobr/x pfp.jpg"
            },
            "breath of estova": {
                name: "Breath of Estova",
                description: "Breath of Estova NFT Collection",
                banner: "breath of estova/x banner.jpeg",
                pfp: "breath of estova/x pfp.jpg"
            },
            chewy: {
                name: "Chewy",
                description: "Chewy NFT Collection",
                banner: "chewy/x banner.jpeg",
                pfp: "chewy/x pfp.jpg"
            },
            chogstar: {
                name: "Chogstar",
                description: "Chogstar NFT Collection",
                banner: "chogstar/x banner.jpeg",
                pfp: "chogstar/x pfp.jpg"
            },
            daks: {
                name: "Daks",
                description: "Daks NFT Collection",
                banner: "daks/x banner.jpeg",
                pfp: "daks/x pfp.jpg"
            },
            llamao: {
                name: "Llamao",
                description: "Llamao NFT Collection",
                banner: "llamao/x banner.jpeg",
                pfp: "llamao/x pfp.jpg"
            },
            "meowwnads": {
                name: "Meowwnads",
                description: "Meowwnads NFT Collection",
                banner: "meowwnads/x banner.jpeg",
                pfp: "meowwnads/x pfp.jpg"
            },
            "molandaks": {
                name: "Molandaks",
                description: "Molandaks NFT Collection",
                banner: "molandaks/x banner.jpeg",
                pfp: "molandaks/x pfp.jpg"
            },
            "mon amurz": {
                name: "Mon Amurz",
                description: "Mon Amurz NFT Collection",
                banner: "mon amurz/x banner.jpeg",
                pfp: "mon amurz/x pfp.jpg"
            },
            "mondana baddies": {
                name: "Mondana Baddies",
                description: "Mondana Baddies NFT Collection",
                banner: "mondana baddies/x banner.jpeg",
                pfp: "mondana baddies/x pfp.jpg"
            },
            r3tards: {
                name: "R3tards",
                description: "R3tards NFT Collection",
                banner: "r3tards/x banner.jpeg",
                pfp: "r3tards/x pfp.jpg"
            },
            roarnads: {
                name: "Roarnads",
                description: "Roarnads NFT Collection",
                banner: "roarnads/x banner.jpeg",
                pfp: "roarnads/x pfp.jpg"
            }
        };
    }

    renderProjectCards() {
        const projectsGrid = document.getElementById('projects-grid');
        console.log('Rendering project cards. Total to render:', this.filteredProjects.length); // Debug log
        
        // Clear existing projects first
        projectsGrid.innerHTML = '';
        
        if (this.filteredProjects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <h3>No projects found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        this.filteredProjects.forEach(([projectId, project]) => {
            const isWhitelisted = this.whitelistedProjects.has(projectId);
            console.log(`Rendering project: ${project.name}, Whitelisted: ${isWhitelisted}`); // Debug log
            const projectCard = this.createProjectCard(projectId, project);
            projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(projectId, project) {
        const isWhitelisted = this.whitelistedProjects.has(projectId);
        
        const card = document.createElement('div');
        card.className = `project-card ${isWhitelisted ? 'whitelisted' : ''}`;
        card.dataset.projectId = projectId;
        
        card.innerHTML = `
            <div class="project-info">
                <img src="${project.pfp}" alt="${project.name}" class="project-pfp" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiByeD0iMTIiIGZpbGw9IiMzMzMiLz4KPHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDE1YzQuMTQgMCA3LjUtMy4zNiA3LjUtNy41UzE5LjE0IDAgMTUgMCAwIDMuMzYgMCA3LjUgMy4zNiAxNSA3LjUgMTVabTAgM2MtNSAwLTEyIDIuNS0xMiA3LjV2M2gyNHYtM2MwLTUtNy03LjUtMTItNy41WiIvPgo8L3N2Zz4KPC9zdmc+';">
                <div class="project-details">
                    <h3 class="project-name">${project.name}</h3>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    <div class="whitelist-status ${isWhitelisted ? 'whitelisted' : ''}">
                        ${isWhitelisted ? 'Whitelisted' : 'Not Whitelisted'}
                    </div>
                </div>
                <div class="toggle-container">
                    <div class="toggle-switch ${isWhitelisted ? 'active' : ''}" data-project-id="${projectId}"></div>
                </div>
            </div>
        `;

        // Add click event for the toggle switch with improved mobile handling
        const toggleSwitch = card.querySelector('.toggle-switch');
        toggleSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle switch clicked for:', projectId); // Debug log
            this.toggleWhitelistStatus(projectId);
        });

        // Add click event for the entire card with improved mobile handling
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Card clicked for:', projectId); // Debug log
            this.toggleWhitelistStatus(projectId);
        });

        return card;
    }

    toggleWhitelistStatus(projectId) {
        if (this.whitelistedProjects.has(projectId)) {
            this.whitelistedProjects.delete(projectId);
        } else {
            this.whitelistedProjects.add(projectId);
        }

        this.saveWhitelistStatus();
        this.updateStats();
        this.updateProjectCard(projectId); // Update only the specific card
    }

    updateProjectCard(projectId) {
        const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
        if (projectCard) {
            const isWhitelisted = this.whitelistedProjects.has(projectId);
            
            // Update card classes
            projectCard.className = `project-card ${isWhitelisted ? 'whitelisted' : ''}`;
            
            // Update status text
            const statusText = projectCard.querySelector('.whitelist-status');
            if (statusText) {
                statusText.textContent = isWhitelisted ? 'Whitelisted' : 'Not Whitelisted';
                statusText.className = `whitelist-status ${isWhitelisted ? 'whitelisted' : ''}`;
            }
            
            // Update toggle switch
            const toggleSwitch = projectCard.querySelector('.toggle-switch');
            if (toggleSwitch) {
                toggleSwitch.className = `toggle-switch ${isWhitelisted ? 'active' : ''}`;
            }
        }
    }

    filterProjects() {
        console.log('Filtering projects with:', this.currentFilter, this.searchQuery); // Debug log
        
        let filtered = Object.entries(this.projects);

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(([projectId, project]) => 
                project.name.toLowerCase().includes(this.searchQuery) ||
                project.description.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply status filter
        if (this.currentFilter === 'whitelisted') {
            filtered = filtered.filter(([projectId]) => this.whitelistedProjects.has(projectId));
        } else if (this.currentFilter === 'not-whitelisted') {
            filtered = filtered.filter(([projectId]) => !this.whitelistedProjects.has(projectId));
        }

        console.log('Filtered projects count:', filtered.length); // Debug log
        
        this.filteredProjects = filtered;
        this.renderProjectCards();
    }

    updateStats() {
        const totalProjects = Object.keys(this.projects).length;
        const whitelistedCount = this.whitelistedProjects.size;
        const percentage = totalProjects > 0 ? Math.round((whitelistedCount / totalProjects) * 100) : 0;

        document.getElementById('total-projects').textContent = totalProjects;
        document.getElementById('whitelisted-count').textContent = whitelistedCount;
        document.getElementById('whitelist-percentage').textContent = `${percentage}%`;
    }

    exportWhitelistStatus() {
        this.generateWhitelistPNG();
    }

    generateWhitelistPNG() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size for a sleek design
        canvas.width = 1200;
        canvas.height = 800;
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0514');
        gradient.addColorStop(0.5, '#1a0b2e');
        gradient.addColorStop(1, '#0a0514');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle grid pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Header section
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NFT Whitelist Status', canvas.width / 2, 80);
        
        // Date
        ctx.fillStyle = '#a0a0a0';
        ctx.font = '24px Inter, sans-serif';
        const dateStr = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        ctx.fillText(dateStr, canvas.width / 2, 120);
        
        // Stats section
        const totalProjects = Object.keys(this.projects).length;
        const whitelistedCount = this.whitelistedProjects.size;
        const percentage = totalProjects > 0 ? Math.round((whitelistedCount / totalProjects) * 100) : 0;
        
        // Stats background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.roundRect(50, 150, canvas.width - 100, 100, 20);
        ctx.fill();
        
        // Stats text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${whitelistedCount} / ${totalProjects} Projects`, canvas.width / 2, 200);
        
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText(`${percentage}% Success Rate`, canvas.width / 2, 250);
        
        // Whitelisted projects section
        ctx.fillStyle = '#8b5cf6';
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Whitelisted Projects', 80, 320);
        
        // Project list
        let yPos = 360;
        const projectsPerRow = 3;
        const projectWidth = (canvas.width - 160) / projectsPerRow;
        
        Array.from(this.whitelistedProjects).forEach((projectId, index) => {
            const project = this.projects[projectId];
            if (!project) return;
            
            const row = Math.floor(index / projectsPerRow);
            const col = index % projectsPerRow;
            const x = 80 + (col * projectWidth);
            y = 360 + (row * 80);
            
            // Project card background
            ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.strokeStyle = '#8b5cf6';
            ctx.lineWidth = 2;
            ctx.roundRect(x, y, projectWidth - 20, 60, 12);
            ctx.fill();
            ctx.stroke();
            
            // Project name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px Inter, sans-serif';
            ctx.textAlign = 'center';
            
            // Truncate long names
            let displayName = project.name;
            if (displayName.length > 15) {
                displayName = displayName.substring(0, 15) + '...';
            }
            ctx.fillText(displayName, x + (projectWidth - 20) / 2, y + 35);
            
            // Check mark
            ctx.fillStyle = '#8b5cf6';
            ctx.font = '20px Inter, sans-serif';
            ctx.fillText('✓', x + (projectWidth - 20) / 2, y + 55);
        });
        
        // Not whitelisted projects section
        const notWhitelisted = Object.keys(this.projects).filter(id => !this.whitelistedProjects.has(id));
        if (notWhitelisted.length > 0) {
            ctx.fillStyle = '#a0a0a0';
            ctx.font = 'bold 32px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Remaining Projects', 80, 600);
            
            // Show count of remaining
            ctx.fillStyle = '#ffffff';
            ctx.font = '24px Inter, sans-serif';
            ctx.fillText(`${notWhitelisted.length} projects to go!`, 80, 640);
        }
        
        // Footer
        ctx.fillStyle = '#667eea';
        ctx.font = '20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Generated by NFTemple', canvas.width / 2, canvas.height - 30);
        
        // Convert to PNG and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `nft-whitelist-${new Date().toISOString().split('T')[0]}.png`;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    }
}

// Canvas roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
    };
}

// Initialize the Whitelist Checker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WhitelistChecker();
});

// Add some CSS variables if they don't exist
if (!document.documentElement.style.getPropertyValue('--text-primary')) {
    document.documentElement.style.setProperty('--text-primary', '#ffffff');
    document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
}
