document.addEventListener('DOMContentLoaded', () => {
    const revealButton = document.getElementById('reveal-button');
    const giftReveal = document.getElementById('gift-reveal');

    revealButton.addEventListener('click', () => {
        // Oculta el botón
        revealButton.style.display = 'none';
        
        // Muestra la revelación y la anima
        giftReveal.classList.remove('hidden');
        setTimeout(() => {
            giftReveal.style.opacity = '1';
        }, 50); // Pequeño retraso para la transición CSS
        
        // Lanza el confeti
        launchConfetti();
    });
    
    // --- 🎊 Funciones de Confeti (CÓDIGO REUTILIZADO) ---
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confetti = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Confetto {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            this.color = color;
            this.rotation = Math.random() * 360;
            this.speed = Math.random() * 5 + 3;
            this.rotationSpeed = Math.random() * 0.5 - 0.25;
            this.gravity = 0.1;
            this.velocity = { x: Math.random() * 6 - 3, y: -(Math.random() * 10 + 5) };
        }

        update() {
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    // Colores de confeti: Dorado, Rojo Navidad, Blanco Nieve, Chocolate
    const confettiColors = ['#ffd700', '#c0392b', '#ffffff', '#a0522d', '#f8b500']; 

    function launchConfetti() {
        const startX = canvas.width / 2;
        const startY = canvas.height / 2;

        for (let i = 0; i < 150; i++) {
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.push(new Confetto(startX, startY, color));
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = confetti.length - 1; i >= 0; i--) {
                confetti[i].update();
                confetti[i].draw();

                if (confetti[i].y > canvas.height) {
                    confetti.splice(i, 1);
                }
            }

            if (confetti.length > 0) {
                requestAnimationFrame(animateConfetti);
            }
        }

        animateConfetti();
        // Relanzar después de un momento para un efecto más denso y festivo
        setTimeout(function() {
             for (let i = 0; i < 80; i++) {
                const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                confetti.push(new Confetto(startX, startY, color));
            }
        }, 500);
    }
});