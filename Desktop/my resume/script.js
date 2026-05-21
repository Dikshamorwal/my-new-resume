/**
 * Diksha Morwal Web Portfolio / Resume - Multi-Page Core Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSkillsAnimation();
    initProjectSearchAndFilter();
    initContactForm();
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE (GLOBAL PERSISTENCE)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (theme === 'dark') {
            newTheme = 'light';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add click scaling animation to toggle button
        themeToggleBtn.style.transform = 'scale(0.85)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 150);
    });
}

/* ==========================================================================
   2. SKILLS LOADER & PROGRESS ANIMATION
   ========================================================================== */
function initSkillsAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    if (progressBars.length === 0) return;
    
    // Animate progress widths on page enter
    setTimeout(() => {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent;
        });
    }, 150);
}

/* ==========================================================================
   3. PROJECTS INTEGRATED LIVE SEARCH & TAG FILTER
   ========================================================================== */
let activeFilter = null;

function initProjectSearchAndFilter() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const projectItems = document.querySelectorAll('.project-item');
        
        // Reset active tag filter when typing in search
        if (activeFilter) {
            clearFilter();
        }

        projectItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const itemTech = item.getAttribute('data-tech').toLowerCase();
            
            if (itemText.includes(query) || itemTech.includes(query)) {
                item.classList.remove('dimmed');
            } else {
                item.classList.add('dimmed');
            }
        });
    });
}

window.filterProjects = function(techName) {
    const projectItems = document.querySelectorAll('.project-item');
    const skillTags = document.querySelectorAll('.skill-tag');
    const filterIndicator = document.getElementById('filter-indicator');
    const activeTagName = document.getElementById('active-tag-name');
    const searchInput = document.getElementById('project-search');

    // Clear search box on tag click
    if (searchInput) {
        searchInput.value = '';
    }

    // If clicking the currently active filter, clear it (toggle behavior)
    if (activeFilter === techName) {
        clearFilter();
        return;
    }

    activeFilter = techName;

    // Show indicator
    if (filterIndicator) filterIndicator.classList.remove('hidden');
    if (activeTagName) activeTagName.textContent = `Filtered by: ${techName}`;

    // Loop through projects and match tags
    projectItems.forEach(item => {
        const itemTech = item.getAttribute('data-tech') || '';
        
        if (itemTech.toLowerCase().includes(techName.toLowerCase())) {
            item.classList.remove('dimmed');
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
            item.classList.add('dimmed');
        }
    });

    // Update active state on skill tags
    skillTags.forEach(tag => {
        if (tag.textContent.trim().toLowerCase().includes(techName.toLowerCase())) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
};

window.clearFilter = function() {
    const projectItems = document.querySelectorAll('.project-item');
    const skillTags = document.querySelectorAll('.skill-tag');
    const filterIndicator = document.getElementById('filter-indicator');

    activeFilter = null;

    // Hide indicator
    if (filterIndicator) filterIndicator.classList.add('hidden');

    // Reset project classes
    projectItems.forEach(item => {
        item.classList.remove('dimmed');
        item.classList.remove('highlighted');
    });

    // Reset tag active classes
    skillTags.forEach(tag => {
        tag.classList.remove('active');
    });
};

/* ==========================================================================
   4. CONTACT FORM HANDLING & SUCCESS MODAL
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form Validation Check
        const requiredInputs = contactForm.querySelectorAll('[required]');
        let isFormValid = true;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isFormValid = false;
                input.style.borderColor = '#ef4444';
                
                // Red border flash animation
                input.style.transform = 'translateX(4px)';
                setTimeout(() => { input.style.transform = ''; }, 100);
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isFormValid) return;

        // Visual loading submission logic
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Dispatching...';
        submitBtn.disabled = true;

        // Mock API callback timer
        setTimeout(() => {
            // Show Success Modal Dialog
            const modal = document.getElementById('success-modal');
            if (modal) {
                modal.classList.add('active');
            }

            // Reset elements
            contactForm.reset();
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
        }, 1200);
    });

    // Close Modal event hooks
    const modalCloseBtn = document.getElementById('modal-close');
    const successModal = document.getElementById('success-modal');
    
    if (modalCloseBtn && successModal) {
        modalCloseBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        
        // Close modal if clicking overlay background
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
}
