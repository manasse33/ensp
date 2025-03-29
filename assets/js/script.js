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

let slideIndex = 0;  // L'indice de l'image actuelle

// Fonction pour déplacer le slide
function moveSlide(n) {
    const slides = document.querySelectorAll(".member");
    const totalSlides = slides.length;

    slideIndex += n;// Vérifie si l'indice du slide est en dehors des limites et le réinitialise si nécessaire
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    // Déplace le slider
    const slider = document.querySelector(".team-members");
    slider.style.transform = translateX( $ (-slideIndex * 100 )  );
}
// Optionnel : faire avancer le slider automatiquement toutes les 3 secondes
setInterval(() => {
    moveSlide(1);
}, 3000);
