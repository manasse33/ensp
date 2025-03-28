function toggleMenu(){
    const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('active');
    }

        // Fonction pour ajouter ou enlever la classe 'scrolled' à l'header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 0) { // Si l'utilisateur fait défiler la page
                header.classList.add('scrolled');
            } else { // Si l'utilisateur est tout en haut de la page
                header.classList.remove('scrolled');
            }
        });