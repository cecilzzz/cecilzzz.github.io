// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    fetch('components/nav.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('nav-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            document.getElementById('nav-container').innerHTML = 
                '<div class="p-4 bg-red-100 text-red-700">Error loading navigation component</div>';
        });
}); 

// Function to toggle submenu
window.toggleSubmenu = function(submenuId) {
    const submenu = document.getElementById(submenuId);
    if (submenu) {
        submenu.classList.toggle('hidden');
    }
}; 