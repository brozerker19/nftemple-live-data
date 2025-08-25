// Tier Maker JavaScript
let tierData = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    unranked: []
};

let allProjects = [];
let draggedProject = null;

// Mobile selection system
let selectedProject = null;
let isMobileDevice = false;

// Check if page was refreshed and redirect to homepage
function checkPageRefresh() {
    // Check if this is a page refresh (not initial navigation)
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        // Redirect to homepage
        window.location.href = 'index.html';
        return;
    }
    
    // Alternative method for modern browsers
    if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
        window.location.href = 'index.html';
        return;
    }
}

// Initialize tier maker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for page refresh first
    checkPageRefresh();
    
    // Clean up old localStorage with default titles
    cleanupOldDefaults();
    
    // Detect mobile device
    detectMobileDevice();
    
    loadProjects();
    initializeDragAndDrop();
    
    // Initialize mobile-specific features with a small delay to ensure DOM is ready
    if (isMobileDevice) {
        setTimeout(() => {
            initializeMobileInteraction();
        }, 100);
    }
});

// Clean up localStorage entries with old default titles
function cleanupOldDefaults() {
    const saved = localStorage.getItem('monad_tier_list');
    if (saved) {
        try {
            const saveData = JSON.parse(saved);
            if (saveData.title === 'My Monad NFT Tier List') {
                // Remove the old default title but keep the tier data
                saveData.title = '';
                localStorage.setItem('monad_tier_list', JSON.stringify(saveData));
            }
        } catch (error) {
            // If there's an error parsing, just clear it
            localStorage.removeItem('monad_tier_list');
        }
    }
}

// Detect if user is on mobile device
function detectMobileDevice() {
    isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    
    // Update UI hints based on device
    if (isMobileDevice) {
        document.querySelector('.desktop-hint').style.display = 'none';
        document.querySelector('.mobile-hint').style.display = 'block';
    }
}

// Load all projects from the main script
function loadProjects() {
    // Get projects from the global projects object (from script.js)
    if (typeof projects !== 'undefined') {
        allProjects = Object.keys(projects).map(key => ({
            id: key,
            name: projects[key].name,
            pfp: projects[key].pfp
        }));
        
        // Initialize all projects as unranked
        tierData.unranked = [...allProjects];
        renderProjects();
    } else {
        console.error('Projects data not found. Make sure script.js is loaded first.');
        document.getElementById('unranked-projects').innerHTML = 
            '<div class="loading">Error loading projects. Please refresh the page.</div>';
    }
}

// Render projects in their respective tiers
function renderProjects() {
    // Render unranked projects
    const unrankedContainer = document.getElementById('unranked-projects');
    unrankedContainer.innerHTML = '';
    
    tierData.unranked.forEach(project => {
        const projectElement = createProjectElement(project);
        unrankedContainer.appendChild(projectElement);
    });
    
    // Render projects in tier rows
    ['S', 'A', 'B', 'C', 'D', 'E', 'F'].forEach(tier => {
        const tierContent = document.querySelector(`[data-tier="${tier}"] .tier-content`);
        tierContent.innerHTML = '';
        
        tierData[tier].forEach(project => {
            const projectElement = createProjectElement(project);
            tierContent.appendChild(projectElement);
        });
    });
    
    // Reinitialize mobile interaction for newly rendered elements
    if (isMobileDevice) {
        // Small delay to ensure DOM is fully updated
        setTimeout(() => {
            initializeMobileInteraction();
        }, 10);
    }
}

// Create a draggable project element
function createProjectElement(project) {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.draggable = true;
    div.dataset.projectId = project.id;
    div.dataset.name = project.name;
    
    const img = document.createElement('img');
    img.src = project.pfp;
    img.alt = project.name;
    img.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiByeD0iMTIiIGZpbGw9IiMzMzMiLz4KPHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDE1YzQuMTQgMCA3LjUtMy4zNiA3LjUtNy41UzE5LjE0IDAgMTUgMCAwIDMuMzYgMCA3LjUgMy4zNiAxNSA3LjUgMTVabTAgM2MtNSAwLTEyIDIuNS0xMiA3LjV2M2gyNHYtM2MwLTUtNy03LjUtMTItNy41WiIvPgo8L3N2Zz4KPC9zdmc+';
    };
    
    div.appendChild(img);
    
    // Add drag event listeners for desktop
    if (!isMobileDevice) {
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        
        // Add touch event listeners for desktop with touch screens (fallback)
        div.addEventListener('touchstart', handleTouchStart, { passive: true });
        div.addEventListener('touchmove', handleTouchMove, { passive: false });
        div.addEventListener('touchend', handleTouchEnd, { passive: false });
    } else {
        // Mobile: disable dragging, enable clicking
        div.draggable = false;
        
        // Remove any existing listeners first
        div.removeEventListener('click', handleMobileProjectClick);
        div.removeEventListener('touchstart', handleTouchStart);
        div.removeEventListener('touchmove', handleTouchMove);
        div.removeEventListener('touchend', handleTouchEnd);
        
        // Add mobile-specific event listeners
        div.addEventListener('click', handleMobileProjectClick, { passive: false });
        div.addEventListener('touchstart', handleTouchStart, { passive: true });
        div.addEventListener('touchmove', handleTouchMove, { passive: false });
        div.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    return div;
}

// Initialize drag and drop functionality
function initializeDragAndDrop() {
    // Add drop event listeners to tier contents
    document.querySelectorAll('.tier-content').forEach(tierContent => {
        tierContent.addEventListener('dragover', handleDragOver);
        tierContent.addEventListener('drop', handleDrop);
        tierContent.addEventListener('dragenter', handleDragEnter);
        tierContent.addEventListener('dragleave', handleDragLeave);
    });
    
    // Add drop event listeners to unranked projects area
    const unrankedContainer = document.getElementById('unranked-projects');
    unrankedContainer.addEventListener('dragover', handleDragOver);
    unrankedContainer.addEventListener('drop', handleDropToUnranked);
    unrankedContainer.addEventListener('dragenter', handleDragEnter);
    unrankedContainer.addEventListener('dragleave', handleDragLeave);
}

// Drag event handlers
function handleDragStart(e) {
    draggedProject = {
        id: this.dataset.projectId,
        element: this
    };
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    
    // Start auto-scroll for desktop
    startAutoScroll();
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedProject = null;
    
    // Stop auto-scroll
    stopAutoScroll();
    
    // Remove drag-over classes from all drop zones
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
}

// Auto-scroll variables
let autoScrollInterval = null;
let lastMousePos = { x: 0, y: 0 };

// Desktop auto-scroll with mouse tracking
function startAutoScroll() {
    document.addEventListener('dragover', trackMousePosition);
    
    autoScrollInterval = setInterval(() => {
        handleAutoScroll(lastMousePos);
    }, 16); // ~60fps
}

function stopAutoScroll() {
    document.removeEventListener('dragover', trackMousePosition);
    
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function trackMousePosition(e) {
    lastMousePos = { x: e.clientX, y: e.clientY };
}

// Universal auto-scroll function for both touch and mouse
function handleAutoScroll(position) {
    const scrollThreshold = 100;
    const scrollSpeed = 8;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Vertical scrolling
    if (position.y < scrollThreshold) {
        // Scroll up
        window.scrollBy(0, -scrollSpeed);
    } else if (position.y > windowHeight - scrollThreshold) {
        // Scroll down
        window.scrollBy(0, scrollSpeed);
    }
    
    // Horizontal scrolling for projects section
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const projectsGrid = document.querySelector('.projects-grid');
        
        if (projectsGrid && position.x > rect.left && position.x < rect.right) {
            if (position.y < rect.top + scrollThreshold && projectsGrid.scrollTop > 0) {
                // Scroll up in projects grid
                projectsGrid.scrollBy(0, -scrollSpeed);
            } else if (position.y > rect.bottom - scrollThreshold) {
                // Scroll down in projects grid
                projectsGrid.scrollBy(0, scrollSpeed);
            }
        }
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    if (this.classList.contains('tier-content')) {
        this.classList.add('drag-over');
        this.closest('.tier-row').classList.add('drag-over');
    } else {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    // Only remove drag-over if we're actually leaving the element
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
        if (this.classList.contains('tier-content')) {
            this.closest('.tier-row').classList.remove('drag-over');
        }
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    if (!draggedProject) return;
    
    const targetTier = this.dataset.tier;
    const projectId = draggedProject.id;
    
    // Check if the dragged element is actually from a tier row (not unranked)
    const draggedElement = draggedProject.element;
    const sourceTierRow = draggedElement.closest('.tier-row');
    
    if (sourceTierRow) {
        // Project is being dragged from a tier - actually move it
        const sourceTierContent = sourceTierRow.querySelector('.tier-content');
        const sourceTier = sourceTierContent.dataset.tier;
        
        // Only move if it's a different tier
        if (sourceTier !== targetTier) {
            const project = removeProjectFromTier(projectId, sourceTier);
            if (project) {
                tierData[targetTier].push(project);
            }
        }
    } else {
        // Project is being dragged from unranked - actually remove it and place in tier
        const project = removeProjectFromUnranked(projectId);
        if (project) {
            tierData[targetTier].push(project);
        }
    }
    
    renderProjects();
    
    // Remove drag-over classes
    this.classList.remove('drag-over');
    this.closest('.tier-row').classList.remove('drag-over');
}

function handleDropToUnranked(e) {
    e.preventDefault();
    
    if (!draggedProject) return;
    
    const projectId = draggedProject.id;
    console.log('Dropping project to unranked:', projectId);
    
    // Check if the project is being dragged from unranked (prevent dropping unranked to unranked)
    const draggedElement = draggedProject.element;
    const sourceTierRow = draggedElement.closest('.tier-row');
    
    if (!sourceTierRow) {
        // Project is being dragged from unranked - don't allow dropping back to unranked
        console.log('Preventing unranked to unranked drop');
        this.classList.remove('drag-over');
        return;
    }
    
    // First, check if this project exists in any tier
    const allTiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
    let projectRemoved = false;
    
    for (let tier of allTiers) {
        const project = removeProjectFromTier(projectId, tier);
        if (project) {
            console.log(`Removed project from tier ${tier}:`, project.name);
            // Check if it's already in unranked to avoid duplicates
            const alreadyInUnranked = tierData.unranked.findIndex(p => p.id === projectId);
            if (alreadyInUnranked === -1) {
                // Only add to unranked if it's not already there
                tierData.unranked.push(project);
            } else {
                console.log('Project already in unranked, not adding duplicate');
            }
            projectRemoved = true;
            break;
        }
    }
    
    // If we didn't find it in any tier, it might be a duplicate in unranked
    if (!projectRemoved) {
        const unrankedIndex = tierData.unranked.findIndex(p => p.id === projectId);
        if (unrankedIndex !== -1) {
            console.log('Removing duplicate from unranked');
            tierData.unranked.splice(unrankedIndex, 1);
        }
    }
    
    // Always re-render to update the display
    renderProjects();
    
    // Remove drag-over class
    this.classList.remove('drag-over');
}

// Touch event handlers for mobile drag and drop
let touchDraggedProject = null;
let touchStartPos = { x: 0, y: 0 };
let dragClone = null;
let isDragging = false;
let touchFeedbackTimeout = null;

function handleTouchStart(e) {
    // Don't prevent default initially - let scrolling work
    // Only prevent default when we actually start dragging
    
    const touch = e.touches[0];
    touchStartPos = { x: touch.clientX, y: touch.clientY };
    
    touchDraggedProject = {
        id: this.dataset.projectId,
        element: this
    };
    
    // Create visual feedback immediately for better responsiveness
    this.style.opacity = '0.7';
    this.style.transform = 'scale(1.05)';
    
    // Clear any existing timeout
    if (touchFeedbackTimeout) {
        clearTimeout(touchFeedbackTimeout);
    }
    
    // Reset visual feedback after a short delay if no dragging occurs
    touchFeedbackTimeout = setTimeout(() => {
        if (!isDragging && touchDraggedProject) {
            touchDraggedProject.element.style.opacity = '';
            touchDraggedProject.element.style.transform = '';
        }
    }, 150); // Reduced from 200ms for better responsiveness
}

function handleTouchMove(e) {
    if (!touchDraggedProject) return;
    
    const touch = e.touches[0];
    const currentPos = { x: touch.clientX, y: touch.clientY };
    
    // Calculate distance moved
    const distance = Math.sqrt(
        Math.pow(currentPos.x - touchStartPos.x, 2) + 
        Math.pow(currentPos.y - touchStartPos.y, 2)
    );
    
    // Increase threshold and only start dragging on significant movement
    // This allows normal scrolling for small movements
    if (distance > 25 && !isDragging) {
        // Check if movement is more horizontal than vertical (likely drag intent)
        const deltaX = Math.abs(currentPos.x - touchStartPos.x);
        const deltaY = Math.abs(currentPos.y - touchStartPos.y);
        
        // Only start dragging if horizontal movement is significant
        // This allows vertical scrolling to work normally
        if (deltaX > deltaY || deltaX > 20) {
            // Clear the feedback timeout since we're actually dragging
            if (touchFeedbackTimeout) {
                clearTimeout(touchFeedbackTimeout);
                touchFeedbackTimeout = null;
            }
            
            // NOW prevent default since we're actually dragging
            e.preventDefault();
            isDragging = true;
            touchDraggedProject.element.classList.add('dragging');
            
            // Create drag clone
            createDragClone(currentPos);
        }
    }
    
    if (isDragging) {
        // Prevent default only when we're actively dragging
        e.preventDefault();
        
        if (dragClone) {
            // Update clone position
            dragClone.style.left = (currentPos.x - 35) + 'px';
            dragClone.style.top = (currentPos.y - 35) + 'px';
            
            // Auto-scroll functionality
            handleAutoScroll(currentPos);
            
            // Find drop target
            const elementBelow = document.elementFromPoint(currentPos.x, currentPos.y);
            const dropTarget = findDropTarget(elementBelow);
            
            // Update drop zone visual feedback
            updateDropZoneVisuals(dropTarget);
        }
    }
}

function handleTouchEnd(e) {
    if (!touchDraggedProject) return;
    
    // Reset visual feedback
    touchDraggedProject.element.style.opacity = '';
    touchDraggedProject.element.style.transform = '';
    touchDraggedProject.element.classList.remove('dragging');
    
    if (isDragging) {
        // Only prevent default if we were actually dragging
        e.preventDefault();
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTarget = findDropTarget(elementBelow);
        
        if (dropTarget) {
            // Perform the drop
            performTouchDrop(dropTarget);
        }
        
        // Clean up
        if (dragClone) {
            dragClone.remove();
            dragClone = null;
        }
        
        // Remove all drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    } else {
        // If we never started dragging, don't prevent default
        // This allows normal touch behavior like scrolling
    }
    
    // Clear any pending timeout
    if (touchFeedbackTimeout) {
        clearTimeout(touchFeedbackTimeout);
        touchFeedbackTimeout = null;
    }
    
    // Reset state
    touchDraggedProject = null;
    isDragging = false;
    touchStartPos = { x: 0, y: 0 };
}

function createDragClone(position) {
    dragClone = touchDraggedProject.element.cloneNode(true);
    dragClone.style.position = 'fixed';
    dragClone.style.left = (position.x - 35) + 'px';
    dragClone.style.top = (position.y - 35) + 'px';
    dragClone.style.width = '70px';
    dragClone.style.height = '70px';
    dragClone.style.zIndex = '9999';
    dragClone.style.pointerEvents = 'none';
    dragClone.style.opacity = '0.8';
    dragClone.style.transform = 'rotate(5deg) scale(1.1)';
    dragClone.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(dragClone);
}

function findDropTarget(element) {
    if (!element) return null;
    
    // Check if it's a tier content area
    if (element.classList.contains('tier-content')) {
        return element;
    }
    
    // Check if it's inside a tier content area
    const tierContent = element.closest('.tier-content');
    if (tierContent) {
        return tierContent;
    }
    
    // Check if it's the unranked projects area
    if (element.id === 'unranked-projects' || element.closest('#unranked-projects')) {
        return document.getElementById('unranked-projects');
    }
    
    return null;
}

function updateDropZoneVisuals(dropTarget) {
    // Remove all existing drag-over classes
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
    
    // Add drag-over class to current drop target
    if (dropTarget) {
        dropTarget.classList.add('drag-over');
        if (dropTarget.classList.contains('tier-content')) {
            dropTarget.closest('.tier-row').classList.add('drag-over');
        }
    }
}

function performTouchDrop(dropTarget) {
    if (!touchDraggedProject || !dropTarget) return;
    
    const projectId = touchDraggedProject.id;
    
    if (dropTarget.id === 'unranked-projects') {
        // Handle dropping to unranked (same logic as handleDropToUnranked)
        const allTiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
        let projectRemoved = false;
        
        for (let tier of allTiers) {
            const project = removeProjectFromTier(projectId, tier);
            if (project) {
                console.log(`Touch: Removed project from tier ${tier}:`, project.name);
                // Check if it's already in unranked to avoid duplicates
                const alreadyInUnranked = tierData.unranked.findIndex(p => p.id === projectId);
                if (alreadyInUnranked === -1) {
                    // Only add to unranked if it's not already there
                    tierData.unranked.push(project);
                } else {
                    console.log('Touch: Project already in unranked, not adding duplicate');
                }
                projectRemoved = true;
                break;
            }
        }
        
        // If we didn't find it in any tier, check if it's a duplicate in unranked
        if (!projectRemoved) {
            const unrankedIndex = tierData.unranked.findIndex(p => p.id === projectId);
            if (unrankedIndex !== -1) {
                console.log('Touch: Removing duplicate from unranked');
                tierData.unranked.splice(unrankedIndex, 1);
            }
        }
    } else if (dropTarget.classList.contains('tier-content')) {
        // Drop to tier - check if project is from unranked or another tier
        const sourceTierRow = touchDraggedProject.element.closest('.tier-row');
        
        if (sourceTierRow) {
            // Project is being moved from a tier - actually move it
            const sourceTierContent = sourceTierRow.querySelector('.tier-content');
            const sourceTier = sourceTierContent.dataset.tier;
            const targetTier = dropTarget.dataset.tier;
            
            // Only move if it's a different tier
            if (sourceTier !== targetTier) {
                const project = removeProjectFromTier(projectId, sourceTier);
                if (project) {
                    tierData[targetTier].push(project);
                }
            }
        } else {
            // Project is being moved from unranked - actually remove it and place in tier
            const project = removeProjectFromUnranked(projectId);
            if (project) {
                const targetTier = dropTarget.dataset.tier;
                tierData[targetTier].push(project);
            }
        }
    }
    
    renderProjects();
}

// Remove project from unranked projects pool
function removeProjectFromUnranked(projectId) {
    const index = tierData.unranked.findIndex(p => p.id === projectId);
    if (index !== -1) {
        return tierData.unranked.splice(index, 1)[0];
    }
    return null;
}

// Find and remove project from all tiers (for moving between tiers)
function findAndRemoveProject(projectId) {
    const allTiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let tier of allTiers) {
        const index = tierData[tier].findIndex(p => p.id === projectId);
        if (index !== -1) {
            return tierData[tier].splice(index, 1)[0];
        }
    }
    
    return null;
}

// New function to actually remove a project from a specific tier
function removeProjectFromTier(projectId, tierName) {
    const index = tierData[tierName].findIndex(p => p.id === projectId);
    if (index !== -1) {
        return tierData[tierName].splice(index, 1)[0];
    }
    return null;
}

// Reset tier list
function resetTierList() {
    if (confirm('Are you sure you want to reset your tier list? This action cannot be undone.')) {
        // Move all projects back to unranked
        tierData = {
            S: [],
            A: [],
            B: [],
            C: [],
            D: [],
            E: [],
            F: [],
            unranked: [...allProjects]
        };
        
        // Reset title to show placeholder
        document.getElementById('tier-list-title').value = '';
        
        // Clear localStorage to prevent loading old data
        localStorage.removeItem('monad_tier_list');
        
        // Re-render the projects
        renderProjects();
        
        // Save the reset state to localStorage
        saveTierList();
    }
}

// Share on Twitter
async function shareOnTwitter() {
    const shareBtn = document.querySelector('.share-btn');
    const originalText = shareBtn.innerHTML;
    
    // Add a safety timeout to restore button state after 30 seconds
    const safetyTimeout = setTimeout(() => {
        console.log('Safety timeout: Restoring button state');
        shareBtn.innerHTML = originalText;
        shareBtn.disabled = false;
    }, 30000);
    
    try {
        // Show loading state
        shareBtn.innerHTML = '<div style="width: 20px; height: 20px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div> Generating...';
        shareBtn.disabled = true;
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        
        // Helper function to restore button state and clear safety timeout
        const restoreButton = () => {
            clearTimeout(safetyTimeout);
            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
        };
        
        // Get tier list title
        const title = document.getElementById('tier-list-title').value || 'My Tier List';
        
        // Simple approach: Use browser's built-in screenshot via canvas
        console.log('Creating simple tier list image...');
        
        const tierRows = document.querySelectorAll('.tier-row');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1200;
        canvas.height = 800;
        
        // Fill background
        ctx.fillStyle = '#0a0514';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add title
        ctx.fillStyle = 'white';
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, 60);
        
        // Draw tier rows
        let yOffset = 120;
        // Colors matching the website CSS gradients
        const tierColors = [
            '#ff6b6b', // S tier - red gradient start
            '#ff9800', // A tier - orange gradient start
            '#ffeb3b', // B tier - yellow gradient start
            '#8bc34a', // C tier - green gradient start
            '#03a9f4', // D tier - blue gradient start
            '#9c27b0', // E tier - purple gradient start
            '#607d8b'  // F tier - gray gradient start
        ];
        const tierLabels = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
        
        // Smart approach: Collect project data and load images cleanly
        console.log('🎯 Using smart project data approach...');
        
        // First, collect all project data from tiers
        const tierProjectData = [];
        tierRows.forEach((row, tierIndex) => {
            const tierContent = row.querySelector('.tier-content');
            const projects = tierContent ? tierContent.children : [];
            
            console.log(`Tier ${tierLabels[tierIndex]} has ${projects.length} projects`);
            
            const projectsInTier = [];
            for (let i = 0; i < projects.length && i < 10; i++) {
                const projectElement = projects[i];
                const projectId = projectElement.dataset.projectId;
                const projectName = projectId ? projectId.replace(/([A-Z])/g, ' $1').trim() : `Project ${i + 1}`;
                
                // Create clean HTTP image path based on project name
                // Use the correct server URL since we're running on localhost:8000
                const serverUrl = window.location.protocol === 'file:' ? 'http://localhost:8000' : window.location.origin;
                const imagePath = `${serverUrl}/${projectName}/x pfp.jpg`;
                
                projectsInTier.push({
                    name: projectName,
                    imagePath: imagePath,
                    position: i
                });
                
                console.log(`📊 Collected: ${projectName} in tier ${tierLabels[tierIndex]} -> ${imagePath}`);
            }
            
            tierProjectData.push({
                tier: tierLabels[tierIndex],
                tierIndex: tierIndex,
                projects: projectsInTier
            });
        });
        
        // Now draw the tier list with clean image loading
        drawTierListWithCleanImages(tierProjectData);
        
        function drawTierListWithCleanImages(tierData) {
            console.log('🎨 Drawing tier list with clean image loading...');
            
            let yOffset = 120;
            let imagePromises = [];
            
            tierData.forEach((tier, tierIndex) => {
                // Draw tier background
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.fillRect(50, yOffset, canvas.width - 100, 80);
                
                // Draw tier label
                ctx.fillStyle = tierColors[tierIndex] || '#a29bfe';
                ctx.fillRect(50, yOffset, 100, 80);
                
                // Draw tier letter
                ctx.fillStyle = 'white';
                ctx.font = 'bold 32px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(tier.tier, 100, yOffset + 50);
                
                // Load and draw project images cleanly
                let xOffset = 170;
                tier.projects.forEach((project, projectIndex) => {
                    const currentX = xOffset;
                    const currentY = yOffset + 10;
                    
                    // Try to load image with proper CORS handling
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    const imagePromise = new Promise((resolve) => {
                        img.onload = function() {
                            console.log(`✅ Cleanly loaded image for ${project.name}`);
                            try {
                                // Draw the image
                                ctx.drawImage(img, currentX, currentY, 60, 60);
                                resolve({ success: true, project: project.name });
                            } catch (error) {
                                console.log(`❌ Failed to draw ${project.name}:`, error.message);
                                resolve({ success: false, project: project.name });
                            }
                        };
                        
                        img.onerror = function() {
                            console.log(`❌ Failed to load image for ${project.name}`);
                            // Draw fallback
                            drawProjectBox(currentX, currentY, project.name);
                            resolve({ success: false, project: project.name });
                        };
                        
                        // Use the HTTP path
                        console.log(`🔄 Loading image: ${project.imagePath}`);
                        img.src = project.imagePath;
                    });
                    
                    imagePromises.push(imagePromise);
                    xOffset += 80;
                });
                
                yOffset += 100;
            });
            
            // Wait for all images to load
            Promise.all(imagePromises).then((results) => {
                const successCount = results.filter(r => r.success).length;
                console.log(`✅ Successfully loaded ${successCount}/${results.length} project images cleanly`);
                
                // Now try to export - should work since images were loaded properly
                finishImageGeneration();
            });
        }
        
        function drawProjectBox(x, y, projectName) {
            // Draw gradient box as fallback
            const gradient = ctx.createLinearGradient(x, y, x + 60, y + 60);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, 60, 60);
            
            // Add border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, 60, 60);
            
            // Add project initial
            ctx.fillStyle = 'white';
            ctx.font = 'bold 18px Inter, sans-serif';
            ctx.textAlign = 'center';
            const initial = projectName.charAt(0).toUpperCase();
            ctx.fillText(initial, x + 30, y + 35);
        }
        
        function finishImageGeneration() {
            // Add branding
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '18px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('NFTemple.xyz', canvas.width / 2, canvas.height - 30);
            
            console.log('Canvas drawing complete with actual project images');
            
            // Try to get the image using multiple methods
            let dataUrl;
            try {
                // First try: Standard PNG export
                dataUrl = canvas.toDataURL('image/png', 0.9);
                console.log('✅ Canvas exported as PNG successfully');
            } catch (error) {
                if (error.name === 'SecurityError') {
                    console.log('⚠️ Canvas is tainted, trying alternative export methods...');
                    
                    // Try method 2: JPEG format (sometimes works when PNG fails)
                    try {
                        dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                        console.log('✅ Canvas exported as JPEG successfully');
                    } catch (error2) {
                        // Try method 3: WebP format
                        try {
                            dataUrl = canvas.toDataURL('image/webp', 0.9);
                            console.log('✅ Canvas exported as WebP successfully');
                        } catch (error3) {
                            // Try method 4: Lower quality JPEG
                            try {
                                dataUrl = canvas.toDataURL('image/jpeg', 0.5);
                                console.log('✅ Canvas exported as low-quality JPEG successfully');
                            } catch (error4) {
                                // Try method 5: Use canvas.toBlob instead of toDataURL
                                try {
                                    canvas.toBlob((blob) => {
                                        if (blob) {
                                            const url = URL.createObjectURL(blob);
                                            console.log('✅ Canvas exported using toBlob successfully');
                                            
                                            // Download using blob URL
                                            const link = document.createElement('a');
                                            link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_tier_list.png`;
                                            link.href = url;
                                            link.click();
                                            
                                            // Clean up
                                            setTimeout(() => URL.revokeObjectURL(url), 1000);
                                            
                                            // Open Twitter
                                            const tweetText = encodeURIComponent(`just created my monad NFT tier list\n\nare we bullish or nah?\n\ngenerate yours at nftemple.xyz`);
                                            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
                                            window.open(twitterUrl, '_blank');
                                            
                                            console.log('Image downloaded via blob and Twitter opened');
                                            
                                            // Restore button state
                                            restoreButton();
                                            return; // Exit early since we succeeded
                                        }
                                        throw new Error('Blob creation failed');
                                    }, 'image/png', 0.9);
                                    
                                    // Restore button state after blob callback
                                    setTimeout(() => {
                                        restoreButton();
                                    }, 1000);
                                    return; // Wait for blob callback
                                } catch (error5) {
                                    // Try method 6: getImageData approach
                                    try {
                                        console.log('🔄 Trying getImageData workaround...');
                                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                        
                                        // Create a new clean canvas and put the image data there
                                        const newCanvas = document.createElement('canvas');
                                        const newCtx = newCanvas.getContext('2d');
                                        newCanvas.width = canvas.width;
                                        newCanvas.height = canvas.height;
                                        newCtx.putImageData(imageData, 0, 0);
                                        
                                        // Try to export the new canvas
                                        const newDataUrl = newCanvas.toDataURL('image/png', 0.9);
                                        console.log('✅ getImageData workaround successful!');
                                        
                                        // Download the image
                                        const link = document.createElement('a');
                                        link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_tier_list.png`;
                                        link.href = newDataUrl;
                                        link.click();
                                        
                                        // Open Twitter
                                        const tweetText = encodeURIComponent(`${title} 🔥\n\nCheck out my Monad NFT tier list! 📊\n\nRank your favorites at NFTemple.xyz\n\n#MonadNFTs #TierList #Monad`);
                                        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
                                        window.open(twitterUrl, '_blank');
                                        
                                        console.log('Image with actual project images downloaded via getImageData!');
                                        
                                        // Restore button state
                                        restoreButton();
                                        return; // Success!
                                        
                                    } catch (error6) {
                                        console.log('❌ getImageData also failed:', error6.message);
                                        console.log('❌ All export methods failed, canvas is definitely tainted');
                                        return createCleanCanvas();
                                    }
                                }
                            }
                        }
                    }
                } else {
                    throw error;
                }
            }
            
            // Create download link for the image
            const link = document.createElement('a');
            link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_tier_list.png`;
            link.href = dataUrl;
            link.click();
            
            // Open Twitter with text and instructions
            const tweetText = encodeURIComponent(`just created my monad NFT tier list\n\nare we bullish or nah?\n\ngenerate yours at nftemple.xyz`);
            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
            window.open(twitterUrl, '_blank');
            
            console.log('Image downloaded and Twitter opened for sharing');
            
            // Restore button state
            restoreButton();
        }
        
        function createCleanCanvas() {
            console.log('Creating clean canvas without actual images...');
            // Create a new clean canvas and redraw without the problematic images
            const cleanCanvas = document.createElement('canvas');
            const cleanCtx = cleanCanvas.getContext('2d');
            cleanCanvas.width = 1200;
            cleanCanvas.height = 800;
            
            // Fill background
            cleanCtx.fillStyle = '#0a0514';
            cleanCtx.fillRect(0, 0, cleanCanvas.width, cleanCanvas.height);
            
            // Add title
            cleanCtx.fillStyle = 'white';
            cleanCtx.font = 'bold 36px Inter, sans-serif';
            cleanCtx.textAlign = 'center';
            cleanCtx.fillText(title, cleanCanvas.width / 2, 60);
            
            // Redraw tiers with fallback project representations
            let yOffset = 120;
            tierRows.forEach((row, index) => {
                const tierContent = row.querySelector('.tier-content');
                const projects = tierContent ? tierContent.children : [];
                
                // Draw tier background
                cleanCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                cleanCtx.fillRect(50, yOffset, cleanCanvas.width - 100, 80);
                
                // Draw tier label
                cleanCtx.fillStyle = tierColors[index] || '#a29bfe';
                cleanCtx.fillRect(50, yOffset, 100, 80);
                
                // Draw tier letter
                cleanCtx.fillStyle = 'white';
                cleanCtx.font = 'bold 32px Inter, sans-serif';
                cleanCtx.textAlign = 'center';
                cleanCtx.fillText(tierLabels[index], 100, yOffset + 50);
                
                // Draw project fallbacks
                let xOffset = 170;
                for (let i = 0; i < projects.length && i < 10; i++) {
                    const projectElement = projects[i];
                    const projectId = projectElement.dataset.projectId;
                    const projectName = projectId ? projectId.replace(/([A-Z])/g, ' $1').trim() : `Project ${i + 1}`;
                    
                    // Draw gradient box
                    const gradient = cleanCtx.createLinearGradient(xOffset, yOffset + 10, xOffset + 60, yOffset + 70);
                    gradient.addColorStop(0, '#667eea');
                    gradient.addColorStop(1, '#764ba2');
                    
                    cleanCtx.fillStyle = gradient;
                    cleanCtx.fillRect(xOffset, yOffset + 10, 60, 60);
                    
                    // Add border
                    cleanCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    cleanCtx.lineWidth = 2;
                    cleanCtx.strokeRect(xOffset, yOffset + 10, 60, 60);
                    
                    // Add project initial
                    cleanCtx.fillStyle = 'white';
                    cleanCtx.font = 'bold 18px Inter, sans-serif';
                    cleanCtx.textAlign = 'center';
                    const initial = projectName.charAt(0).toUpperCase();
                    cleanCtx.fillText(initial, xOffset + 30, yOffset + 45);
                    
                    xOffset += 80;
                }
                
                yOffset += 100;
            });
            
            // Add branding
            cleanCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            cleanCtx.font = '18px Inter, sans-serif';
            cleanCtx.textAlign = 'center';
            cleanCtx.fillText('NFTemple.xyz', cleanCanvas.width / 2, cleanCanvas.height - 30);
            
            // Export clean canvas
            const cleanDataUrl = cleanCanvas.toDataURL('image/png', 0.9);
            
            // Download clean version
            const link = document.createElement('a');
            link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_tier_list.png`;
            link.href = cleanDataUrl;
            link.click();
            
            // Open Twitter
            const tweetText = encodeURIComponent(`just created my monad NFT tier list\n\nare we bullish or nah?\n\ngenerate yours at nftemple.xyz`);
            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
            window.open(twitterUrl, '_blank');
            
            console.log('Clean canvas version downloaded');
            
            // Restore button state
            restoreButton();
        }
        
    } catch (error) {
        console.error('Error generating tier list image:', error);
        
        // Fallback to text-only sharing
        const title = document.getElementById('tier-list-title').value || 'My Tier List';
        const tweetText = encodeURIComponent(`just created my monad NFT tier list\n\nare we bullish or nah?\n\ngenerate yours at nftemple.xyz`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(window.location.href)}`;
        window.open(twitterUrl, '_blank');
        
        // Restore button
        restoreButton();
    }
}



// Save tier list to local storage (for future enhancement)
function saveTierList() {
    const title = document.getElementById('tier-list-title').value || 'My Tier List';
    const saveData = {
        title: title,
        tierData: tierData,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('monad_tier_list', JSON.stringify(saveData));
}

// Load tier list from local storage (for future enhancement)
function loadTierList() {
    const saved = localStorage.getItem('monad_tier_list');
    if (saved) {
        try {
            const saveData = JSON.parse(saved);
            const savedTierData = saveData.tierData;
            
            // Get all project IDs that were in the saved data
            const savedProjectIds = new Set();
            Object.values(savedTierData).forEach(tierProjects => {
                tierProjects.forEach(project => savedProjectIds.add(project.id));
            });
            
            // Find new projects that weren't in the saved data
            const newProjects = allProjects.filter(project => !savedProjectIds.has(project.id));
            
            // Merge saved data with new projects
            tierData = {
                S: savedTierData.S || [],
                A: savedTierData.A || [],
                B: savedTierData.B || [],
                C: savedTierData.C || [],
                D: savedTierData.D || [],
                E: savedTierData.E || [],
                F: savedTierData.F || [],
                unranked: [...(savedTierData.unranked || []), ...newProjects]
            };
            
            // Only set the title if it's not the old default value
            // This allows the placeholder to show for old saves with default title
            if (saveData.title && saveData.title !== 'My Monad NFT Tier List' && saveData.title !== 'My Tier List') {
                document.getElementById('tier-list-title').value = saveData.title;
            } else {
                // Leave empty to show placeholder
                document.getElementById('tier-list-title').value = '';
            }
            
            renderProjects();
        } catch (error) {
            console.error('Error loading saved tier list:', error);
            // If there's an error, fall back to loading all projects fresh
            tierData.unranked = [...allProjects];
            renderProjects();
        }
    }
}

// Mobile interaction system
function initializeMobileInteraction() {
    console.log('Initializing mobile interaction...'); // Debug log
    
    // Add click listeners to tier rows for mobile
    document.querySelectorAll('.tier-row').forEach(tierRow => {
        tierRow.classList.add('mobile-clickable');
        tierRow.addEventListener('click', handleMobileTierClick, { passive: false });
    });
    
    // Ensure all project items have proper mobile event listeners
    document.querySelectorAll('.project-item').forEach(projectItem => {
        // Remove any existing listeners to prevent duplicates
        projectItem.removeEventListener('click', handleMobileProjectClick);
        projectItem.removeEventListener('touchstart', handleTouchStart);
        projectItem.removeEventListener('touchmove', handleTouchMove);
        projectItem.removeEventListener('touchend', handleTouchEnd);
        
        // Add fresh mobile event listeners
        projectItem.addEventListener('click', handleMobileProjectClick, { passive: false });
        projectItem.addEventListener('touchstart', handleTouchStart, { passive: true });
        projectItem.addEventListener('touchmove', handleTouchMove, { passive: false });
        projectItem.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    console.log('Mobile interaction initialized'); // Debug log
}

function handleMobileProjectClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Mobile project click:', this.dataset.projectId); // Debug log
    
    const projectId = this.dataset.projectId;
    const projectName = this.dataset.name;
    
    // Check if this specific element is inside a tier row (not in unranked)
    const tierRow = this.closest('.tier-row');
    
    if (tierRow) {
        // This project is inside a tier row - show delete option
        const tierContent = tierRow.querySelector('.tier-content');
        const tierName = tierContent.dataset.tier;
        const projectInTier = tierData[tierName].find(p => p.id === projectId);
        
        if (projectInTier) {
            showDeleteOption(this, projectInTier, tierName, projectName);
        }
    } else {
        // This project is in unranked - use normal selection behavior
        // Clear previous selection
        document.querySelectorAll('.project-item.mobile-selected').forEach(item => {
            item.classList.remove('mobile-selected');
        });
        
        // Select this project
        this.classList.add('mobile-selected');
        selectedProject = {
            id: projectId,
            element: this
        };
        
        console.log('Project selected:', projectId); // Debug log
    }
}

function handleMobileTierClick(e) {
    console.log('Mobile tier click, selected project:', selectedProject ? selectedProject.id : 'none'); // Debug log
    
    // Only prevent default if we have a selected project (actual action)
    // Otherwise let normal scrolling work
    if (selectedProject) {
        e.preventDefault();
        e.stopPropagation();
        
        const tierContent = this.querySelector('.tier-content');
        const targetTier = tierContent.dataset.tier;
        
        console.log('Moving project to tier:', targetTier); // Debug log
        
        // Move the project
        const projectId = selectedProject.id;
        
        // Check if project is from unranked or another tier
        const sourceTierRow = selectedProject.element.closest('.tier-row');
        
        if (sourceTierRow) {
            // Project is being moved from a tier - actually move it
            const sourceTierContent = sourceTierRow.querySelector('.tier-content');
            const sourceTier = sourceTierContent.dataset.tier;
            
            // Only move if it's a different tier
            if (sourceTier !== targetTier) {
                const project = removeProjectFromTier(projectId, sourceTier);
                if (project) {
                    tierData[targetTier].push(project);
                    renderProjects();
                    clearMobileSelection();
                    console.log('Project moved from tier', sourceTier, 'to', targetTier); // Debug log
                }
            } else {
                // Same tier, just clear selection
                clearMobileSelection();
                console.log('Same tier, clearing selection'); // Debug log
            }
        } else {
            // Project is being moved from unranked - actually remove it and place in tier
            const project = removeProjectFromUnranked(projectId);
            if (project) {
                tierData[targetTier].push(project);
                renderProjects();
                clearMobileSelection();
                console.log('Project moved from unranked to tier', targetTier); // Debug log
            }
        }
    } else {
        // No project selected, show hint but don't prevent scrolling
        showMobileHint('Please select a project first');
        console.log('No project selected, showing hint'); // Debug log
    }
}

function clearMobileSelection() {
    document.querySelectorAll('.project-item.mobile-selected').forEach(item => {
        item.classList.remove('mobile-selected');
    });
    selectedProject = null;
}

function showMobileSelectionFeedback() {
    // Create or update selection hint
    let hint = document.querySelector('.mobile-selection-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'mobile-selection-hint';
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 136, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            pointer-events: none;
            font-size: 0.9rem;
        `;
        document.body.appendChild(hint);
    }
    
    hint.textContent = 'Project selected! Now tap a tier to place it.';
    hint.style.display = 'block';
    
    // Hide after 2 seconds
    setTimeout(() => {
        hint.style.display = 'none';
    }, 2000);
}

function showDeleteOption(element, project, tierName, projectName) {
    // Remove any existing delete dialog
    const existingDialog = document.querySelector('.delete-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Create delete dialog
    const dialog = document.createElement('div');
    dialog.className = 'delete-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #ff6b6b;
        border-radius: 12px;
        padding: 20px;
        z-index: 10001;
        text-align: center;
        min-width: 280px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    // Add content
    dialog.innerHTML = `
        <div style="color: white; margin-bottom: 15px;">
            <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 8px;">Remove Project?</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">Remove "${projectName}" from ${tierName} tier?</div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="delete-cancel" style="
                background: #333;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 0.9rem;
                cursor: pointer;
            ">Cancel</button>
            <button class="delete-confirm" style="
                background: #ff6b6b;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 0.9rem;
                cursor: pointer;
                font-weight: bold;
            ">Remove</button>
        </div>
    `;
    
    // Add event listeners
    dialog.querySelector('.delete-cancel').addEventListener('click', () => {
        dialog.remove();
    });
    
    dialog.querySelector('.delete-confirm').addEventListener('click', () => {
        // Remove the project from the tier
        const projectRemoved = removeProjectFromTier(project.id, tierName);
        if (projectRemoved) {
            // Add back to unranked if not already there
            const alreadyInUnranked = tierData.unranked.findIndex(p => p.id === project.id);
            if (alreadyInUnranked === -1) {
                tierData.unranked.push(projectRemoved);
            }
            renderProjects();
        }
        dialog.remove();
    });
    
    // Add click outside to close
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.remove();
        }
    });
    
    document.body.appendChild(dialog);
}

function showMobileHint(message) {
    let hint = document.querySelector('.mobile-selection-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'mobile-selection-hint';
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(168, 85, 247, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            pointer-events: none;
            font-size: 0.9rem;
        `;
        document.body.appendChild(hint);
    }
    
    hint.textContent = message;
    hint.style.display = 'block';
    
    // Hide after 2 seconds
    setTimeout(() => {
        hint.style.display = 'none';
    }, 2000);
}

// Auto-save functionality (save every 30 seconds)
setInterval(saveTierList, 30000);

// Load saved tier list on page load
window.addEventListener('load', loadTierList);
