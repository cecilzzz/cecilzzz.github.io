// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    fetch('components/nav.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('nav-container').innerHTML = html;
            
            // Setup mobile menu functionality
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            document.getElementById('nav-container').innerHTML = 
                '<div class="p-4 bg-red-100 text-red-700">Error loading navigation component</div>';
        });
}); 