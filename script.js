document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.transition-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            
            // If already on this section, don't trigger the wipe
            if (this.classList.contains('active')) return;

            // 1. Reset overlay to start position WITHOUT a transition
            overlay.style.transition = 'none';
            overlay.classList.remove('exit', 'active');
            overlay.style.left = '-100%';

            // Use a tiny delay (force reflow) so the browser notices the reset
            // This is the "secret" to making it work every time
            void overlay.offsetWidth; 

            // 2. Start Wipe ON (0.5s)
            overlay.style.transition = 'left 0.5s ease-in-out';
            overlay.classList.add('active');

            // 3. Switch content behind the orange screen
            setTimeout(() => {
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
                window.scrollTo(0, 0);

                // 4. Wipe OFF to the right
                overlay.classList.remove('active');
                overlay.classList.add('exit');

            }, 500); 
        });
    });
});
