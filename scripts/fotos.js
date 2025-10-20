document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.photo-grid');
    const cards = document.querySelectorAll('.photo-card');
    
    // --- Constantes del CSS ---
    // (Asumimos que fotos.css tiene grid-auto-rows: 1px)
    const rowHeight = 1; 
    
    // (Asumimos que fotos.css tiene padding: 10px y border: 3px)
    const cardPadding = (2 * 10) + (2 * 3); // Total = 26px

    function resizeGridItem(item) {
        const img = item.querySelector('img');
        
        // Si no hay img, o no ha cargado (offsetHeight es 0)
        if (!img || img.offsetHeight === 0) {
            // Darle una altura mínima (solo padding)
            item.style.gridRowEnd = 'span ' + Math.ceil(cardPadding / rowHeight);
            return;
        }

        // 1. OBTENER LA ALTURA RENDERIZADA DE LA IMAGEN
        const imgRenderedHeight = img.offsetHeight; 

        // 2. CALCULAR LA ALTURA TOTAL DE LA TARJETA (Imagen + Padding + Bordes + 10px EXTRA)
        // ¡AQUÍ ESTÁ EL CAMBIO!
        const itemHeight = imgRenderedHeight + cardPadding + 20; 
        
        // 3. CALCULAR FILAS
        // Si itemHeight es 226px, el span será 226.
        const rowSpan = Math.ceil(itemHeight / rowHeight);
        
        // 4. APLICAR LA ALTURA AL ESTILO GRID
        item.style.gridRowEnd = 'span ' + rowSpan;
    }

    // --- 🔑 LA SOLUCIÓN: CUÁNDO EJECUTAR ---
    
    // 1. Función que redimensiona todo
    function resizeAllGridItems() {
        cards.forEach(resizeGridItem);
    }

    // 2. Ejecutar al cambiar el tamaño de la ventana (para el responsive)
    window.addEventListener('resize', resizeAllGridItems);
    
    // 3. Adjuntar listeners a TODAS las imágenes
    const images = grid.querySelectorAll('img');
    let imagesLoadedCount = 0;

    const onImageLoad = () => {
        imagesLoadedCount++;
        // Solo cuando TODAS las imágenes hayan cargado, redimensionamos todo
        if (imagesLoadedCount === images.length) {
            resizeAllGridItems();
        }
    };

    images.forEach(img => {
        // Asignar el listener de 'load' y 'error' a CADA imagen
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageLoad);
        
        // --- Manejo de imágenes en caché ---
        // Si la imagen ya está 'complete' (en caché), el evento 'load'
        // a veces no se dispara, así que lo forzamos.
        if (img.complete) {
            onImageLoad();
        }
    });
    
    // 4. Por si acaso, un recálculo final cuando toda la página
    // (incluyendo fuentes, etc.) haya cargado.
    window.addEventListener('load', () => {
        setTimeout(resizeAllGridItems, 300); // 300ms de seguridad
    });
});