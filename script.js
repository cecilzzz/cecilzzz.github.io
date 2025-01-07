document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewSection = document.getElementById('previewSection');
    const originalPreview = document.getElementById('originalPreview');
    const compressedPreview = document.getElementById('compressedPreview');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const downloadBtn = document.getElementById('downloadBtn');

    let originalFile = null;

    // Handle file upload events
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#007AFF';
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#c7c7c7';
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#c7c7c7';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    });

    // Handle file processing
    function handleFile(file) {
        originalFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            originalPreview.src = e.target.result;
            originalSize.textContent = `Size: ${formatFileSize(file.size)}`;
            compressImage(e.target.result, qualitySlider.value / 100);
            previewSection.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Compress image
    function compressImage(base64Str, quality) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            compressedPreview.src = compressedBase64;
            
            // Calculate compressed size
            const compressedSize = Math.round((compressedBase64.length * 3) / 4);
            document.getElementById('compressedSize').textContent = 
                `Size: ${formatFileSize(compressedSize)}`;
        };
        img.src = base64Str;
    }

    // Quality slider event
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = `${e.target.value}%`;
        if (originalFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                compressImage(e.target.result, qualitySlider.value / 100);
            };
            reader.readAsDataURL(originalFile);
        }
    });

    // Download button event
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `compressed_${originalFile.name}`;
        link.href = compressedPreview.src;
        link.click();
    });

    // Utility function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 