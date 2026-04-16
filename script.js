document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.transition-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            
            if (this.classList.contains('active')) return;

            // 1. INSTANT RESET: Snap back to start off-screen
            overlay.style.transition = 'none';
            overlay.classList.remove('active', 'exit');
            
            // Force the browser to recognize the reset (Reflow)
            void overlay.offsetWidth; 

            // 2. TRIGGER WIPE: Small delay ensures the reset "sticks"
            setTimeout(() => {
                overlay.style.transition = 'transform 0.5s ease-in-out';
                overlay.classList.add('active');

                // 3. SWITCH CONTENT: Swap when screen is orange
                setTimeout(() => {
                    navLinks.forEach(l => l.classList.remove('active'));
                    sections.forEach(s => s.classList.remove('active'));
                    
                    this.classList.add('active');
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) targetSection.classList.add('active');
                    
                    window.scrollTo(0, 0);

                    // 4. FINISH: Slide orange away to the right
                    overlay.classList.remove('active');
                    overlay.classList.add('exit');
                }, 500); 
            }, 20); 
        });
    });
});
