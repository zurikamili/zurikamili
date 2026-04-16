document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.transition-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent instant section switching
            e.preventDefault();
            
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            // If we are already on this section, do nothing
            if (this.classList.contains('active')) return;

            // 1. START THE ORANGE WIPE
            // Match the timing (0.5s) to your CSS transition
            overlay.style.transition = 'left 0.5s ease-in-out';
            overlay.classList.add('active');

            // 2. WAIT FOR OVERLAY TO COVER SCREEN
            setTimeout(() => {
                // Switch active states behind the orange curtain
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                // Scroll to top so the new page starts at the beginning
                window.scrollTo(0, 0);

                // 3. MOVE WIPE OFF-SCREEN TO THE RIGHT
                overlay.classList.remove('active');
                overlay.classList.add('exit');

                // 4. RESET OVERLAY POSITION FOR NEXT CLICK
                // We wait for the exit animation to finish before resetting
                setTimeout(() => {
                    overlay.style.transition = 'none'; // Move it back instantly
                    overlay.classList.remove('exit');
                    overlay.style.left = '-100%'; // Reset to left side
                }, 500); 

            }, 500); 
        });
    });
});
