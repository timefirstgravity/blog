// Navigation functionality for Time-First Gravity Blog

// Paper data for navigation
const papers = [
    {
        id: 'paper1-gravity-temporal',
        number: 'I',
        title: 'Gravity as Temporal Geometry',
        shortTitle: 'Temporal Geometry',
        doi: '10.5281/zenodo.16878019',
        hasOverview: false,
        hasDetailed: false
    },
    {
        id: 'paper2-experimental',
        number: 'II',
        title: 'Experimental Signatures',
        shortTitle: 'Experimental Signatures',
        doi: '10.5281/zenodo.16888504',
        hasOverview: false,
        hasDetailed: false
    },
    {
        id: 'paper3-cosmology',
        number: 'III',
        title: 'Cosmology as Temporal Geometry',
        shortTitle: 'FRW Equivalence',
        doi: '10.5281/zenodo.16884232',
        hasOverview: false,
        hasDetailed: false
    },
    {
        id: 'paper4-origin-time',
        number: 'IV',
        title: 'Origin of Time',
        shortTitle: 'Origin of Time',
        doi: '10.5281/zenodo.16891005',
        hasOverview: false,
        hasDetailed: false
    },
    {
        id: 'paper4.2-testing',
        number: 'IV.2',
        title: 'Testing The Origin Of Time',
        shortTitle: 'Testing Origin',
        doi: '10.5281/zenodo.16891943',
        hasOverview: false,
        hasDetailed: false
    },
    {
        id: 'paper6-black-holes',
        number: 'VI',
        title: 'Singularity-Free Black Holes',
        shortTitle: 'Black Holes',
        doi: '',
        hasOverview: true,
        hasDetailed: true
    }
];

// Function to create navigation HTML
function createNavigation() {
    const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="/index.html" class="nav-brand">Time-First Gravity</a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="/index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Papers</a>
                    <div class="dropdown">
                        ${papers.map(paper => `
                            <a href="/papers/${paper.id}/overview.html" class="dropdown-item">
                                Paper ${paper.number}: ${paper.shortTitle}
                            </a>
                        `).join('')}
                    </div>
                </li>
                <li class="nav-item">
                    <a href="/index.html#faq-scientists" class="nav-link">FAQ</a>
                </li>
            </ul>
        </div>
    </nav>`;
    
    return navHTML;
}

// Function to create breadcrumbs
function createBreadcrumbs(path) {
    const parts = path.split('/').filter(p => p);
    let breadcrumbHTML = '<div class="breadcrumbs">';
    breadcrumbHTML += '<a href="/index.html">Home</a>';
    
    if (parts.includes('papers')) {
        const paperId = parts[parts.indexOf('papers') + 1];
        const paper = papers.find(p => p.id === paperId);
        if (paper) {
            breadcrumbHTML += ' › ';
            breadcrumbHTML += `<span>Paper ${paper.number}: ${paper.shortTitle}</span>`;
            
            const page = parts[parts.length - 1].replace('.html', '');
            if (page === 'overview' || page === 'detailed') {
                breadcrumbHTML += ' › ';
                breadcrumbHTML += `<span>${page.charAt(0).toUpperCase() + page.slice(1)}</span>`;
            }
        }
    }
    
    breadcrumbHTML += '</div>';
    return breadcrumbHTML;
}

// Function to create view toggle
function createViewToggle(currentView, paperId) {
    const paper = papers.find(p => p.id === paperId);
    if (!paper || (!paper.hasOverview && !paper.hasDetailed)) {
        return '';
    }
    
    let toggleHTML = '<div class="view-toggle">';
    
    if (paper.hasOverview) {
        toggleHTML += `<a href="/papers/${paperId}/overview.html" 
                          class="${currentView === 'overview' ? 'active' : ''}">Overview</a>`;
    }
    
    if (paper.hasDetailed) {
        toggleHTML += `<a href="/papers/${paperId}/detailed.html" 
                          class="${currentView === 'detailed' ? 'active' : ''}">Step-by-Step</a>`;
    }
    
    toggleHTML += '</div>';
    return toggleHTML;
}

// Function to create chapter navigation for step-by-step pages
function createChapterNav(currentChapter, totalChapters, paperId) {
    let navHTML = '<div class="chapter-nav">';
    
    if (currentChapter > 1) {
        navHTML += `<a href="${currentChapter - 1}-*.html">← Previous Chapter</a>`;
    } else {
        navHTML += '<span class="placeholder"></span>';
    }
    
    if (currentChapter < totalChapters) {
        navHTML += `<a href="${currentChapter + 1}-*.html">Next Chapter →</a>`;
    } else {
        navHTML += '<span class="placeholder"></span>';
    }
    
    navHTML += '</div>';
    return navHTML;
}

// Function to insert navigation into page
function insertNavigation() {
    // Get current page info from URL
    const path = window.location.pathname;
    
    // Insert main navigation at start of body
    const nav = createNavigation();
    document.body.insertAdjacentHTML('afterbegin', nav);
    
    // Add container div around existing content
    const existingContent = Array.from(document.body.children).slice(1); // Skip nav we just added
    const container = document.createElement('div');
    container.className = 'container';
    
    // Add breadcrumbs if not on homepage
    if (path !== '/' && path !== '/index.html') {
        const breadcrumbs = createBreadcrumbs(path);
        container.insertAdjacentHTML('beforeend', breadcrumbs);
    }
    
    // Add view toggle if on a paper page
    if (path.includes('/papers/')) {
        const parts = path.split('/');
        const paperId = parts[parts.indexOf('papers') + 1];
        const currentView = path.includes('overview') ? 'overview' : 'detailed';
        const viewToggle = createViewToggle(currentView, paperId);
        if (viewToggle) {
            container.insertAdjacentHTML('beforeend', viewToggle);
        }
    }
    
    // Move existing content into container
    existingContent.forEach(el => container.appendChild(el));
    document.body.appendChild(container);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertNavigation);
} else {
    insertNavigation();
}