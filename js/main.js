// 使用 Unsplash API 獲取圖片
async function fetchImages() {
    // Replace with your actual Unsplash access key
    const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
    
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=interior-design&count=6&client_id=${accessKey}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        
        const images = await response.json();
        
        // Clear existing content
        const spaceGrid = document.querySelector('.space-grid');
        spaceGrid.innerHTML = '';
        
        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading';
        spaceGrid.appendChild(loadingIndicator);
        
        // Render images
        images.forEach(image => {
            spaceGrid.innerHTML += `
                <article class="space-card">
                    <img src="${image.urls.regular}" 
                         alt="${image.alt_description || '室內設計靈感'}"
                         loading="lazy">
                    <h3>${image.user.name}</h3>
                    <p>Photo by <a href="${image.user.links.html}?utm_source=interior_inspiration&utm_medium=referral" 
                          target="_blank">${image.user.name}</a> on 
                       <a href="https://unsplash.com/?utm_source=interior_inspiration&utm_medium=referral" 
                          target="_blank">Unsplash</a></p>
                </article>
            `;
        });
        
        // Remove loading indicator
        loadingIndicator.remove();
        
    } catch (error) {
        console.error('Error fetching images:', error);
        document.querySelector('.space-grid').innerHTML = `
            <div class="error-message">
                無法載入圖片，請稍後再試。
            </div>
        `;
    }
}

// 頁面加載時獲取圖片
document.addEventListener('DOMContentLoaded', fetchImages); 