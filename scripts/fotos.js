document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.photo-grid');
    const cards = document.querySelectorAll('.photo-card');
    
    // 1. DEFINIMOS LAS CONSTANTES DEL CSS
    // ¡¡AQUÍ ESTÁ EL CAMBIO!! Ahora la fila base es 1px
    const rowHeight = 1; 
    const rowGap = 20;    // De gap: 20px;
    
    // La altura del padding (10*2) + borde (3*2) = 26px
    const cardPadding = (2 * 10) + (2 * 3); 

    function resizeGridItem(item) {
        const img = item.querySelector('img');
        
        if (!img || !img.complete || img.naturalWidth === 0) {
            item.style.gridRowEnd = 'span ' + Math.ceil(cardPadding / rowHeight);
            return;
        }

        // 1. OBTENER LA ALTURA RENDERIZADA DE LA IMAGEN
        const imgRenderedHeight = img.offsetHeight; 

        // 2. CALCULAR LA ALTURA TOTAL DE LA TARJETA (Imagen + Padding + Bordes)
        const itemHeight = imgRenderedHeight + cardPadding; 
        
        // 3. CALCULAR FILAS DEL GRID
        // Esta fórmula ahora funciona con (1px + 20px)
        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
        
        // 4. APLICAR LA ALTURA AL ESTILO GRID
        item.style.gridRowEnd = 'span ' + rowSpan;
    }

    // Función principal de redimensionamiento
    function resizeAllGridItems() {
        cards.forEach(resizeGridItem);
    }
    
    // --- Gestión de la carga de imágenes ---
    
    resizeAllGridItems();

    const images = grid.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', () => {
                resizeGridItem(img.closest('.photo-card'));
            });
            img.addEventListener('error', () => {
                resizeGridItem(img.closest('.photo-card'));
            });
        }
    });

    window.addEventListener('resize', resizeAllGridItems);
    
    setTimeout(resizeAllGridItems, 500); 
});