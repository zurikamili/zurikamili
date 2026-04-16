document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.transition-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-section');
            if (this.classList.contains('active')) return;

            // 1. Wipe ON: Slide orange screen from left to cover everything
            overlay.style.transition = 'left 0.5s ease-in-out';
            overlay.classList.add('active');

            // 2. The Switch: Swap content when screen is fully orange
            setTimeout(() => {
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
                window.scrollTo(0, 0);

                // 3. Wipe OFF: Slide orange screen away to the right
                overlay.classList.remove('active');
                overlay.classList.add('exit');

                // 4. Reset: Put it back on the left (hidden) for next click
                setTimeout(() => {
                    overlay.style.transition = 'none'; 
                    overlay.classList.remove('exit');
                    overlay.style.left = '-100%'; 
                }, 500); 

            }, 500); 
        });
    });
});

