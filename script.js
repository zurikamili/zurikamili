document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.transition-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            
            if (this.classList.contains('active')) return;

            // 1. Reset: Instantly move overlay back to the left start
            overlay.style.transition = 'none';
            overlay.classList.remove('active', 'exit');
            overlay.style.left = '-100%';

            // Smallest possible delay to let the reset "stick"
            setTimeout(() => {
                // 2. Start the Wipe
                overlay.style.transition = 'left 0.5s ease-in-out';
                overlay.classList.add('active');

                // 3. Swap content while screen is orange
                setTimeout(() => {
                    navLinks.forEach(l => l.classList.remove('active'));
                    sections.forEach(s => s.classList.remove('active'));
                    
                    this.classList.add('active');
                    document.getElementById(targetId).classList.add('active');
                    window.scrollTo(0, 0);

                    // 4. Wipe off to the right
                    overlay.classList.remove('active');
                    overlay.classList.add('exit');
                }, 500); 
            }, 10); 
        });
    });
});
