class ENSPMobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('navLinks');
        this.overlay = document.getElementById('overlay');
        this.header = document.getElementById('header');
        this.navItems = document.querySelectorAll('.nav-links a');
        
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Event listeners pour le menu
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        this.overlay.addEventListener('click', () => this.closeMenu());

        // Fermer le menu en cliquant sur un lien
        this.navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                    
                    // Gestion de la navigation smooth scroll
                    const href = link.getAttribute('href');
                    if (href.startsWith('#') && href !== '#') {
                        e.preventDefault();
                        this.smoothScrollTo(href);
                    }
                }
                
                // Gestion des liens actifs
                this.setActiveLink(link);
            });
        });

        // Gestion du clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Gestion du redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Gestion du scroll pour le header
        this.handleScrollEffects();
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.hamburger.classList.add('active');
        this.navLinks.classList.add('active');
        // this.overlay.classList.add('active');
        
        // Empêcher le scroll
        document.body.style.overflow = 'hidden';
        
        this.isMenuOpen = true;

        // Focus sur le premier lien pour l'accessibilité
        setTimeout(() => {
            const firstLink = this.navLinks.querySelector('a');
            if (firstLink) firstLink.focus();
        }, 400);
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('active');
        // this.overlay.classList.remove('active');
        
        // Restaurer le scroll
        document.body.style.overflow = '';
        
        this.isMenuOpen = false;
    }

    setActiveLink(activeLink) {
        // Retirer la classe active de tous les liens
        this.navItems.forEach(link => {
            link.classList.remove('active');
        });
        
        // Ajouter la classe active au lien cliqué (sauf pour le CTA)
        if (!activeLink.classList.contains('cta-button')) {
            activeLink.classList.add('active');
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = this.header.offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    handleScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Effet d'ombre au scroll
            if (currentScrollY > 20) {
                this.header.style.boxShadow = '0 4px 25px rgba(0,0,0,0.15)';
                this.header.style.background = 'rgba(255,255,255,0.95)';
                this.header.style.backdropFilter = 'blur(10px)';
            } else {
                this.header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                this.header.style.background = '#fff';
                this.header.style.backdropFilter = 'none';
            }

            lastScrollY = currentScrollY;
        });
    }
}

// Gestionnaire pour l'animation du logo
class LogoAnimations {
    constructor() {
        this.logo = document.querySelector('.logo');
        this.init();
    }

    init() {
        // Animation au survol du logo
        this.logo.addEventListener('mouseenter', () => {
            const icon = this.logo.querySelector('i');
            icon.style.animation = 'bounce 0.6s ease';
        });

        this.logo.addEventListener('mouseleave', () => {
            const icon = this.logo.querySelector('i');
            icon.style.animation = '';
        });
    }
}

// Animation CSS pour le logo
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px) rotate(5deg); }
        60% { transform: translateY(-5px) rotate(-5deg); }
    }
`;
document.head.appendChild(style);

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new ENSPMobileMenu();
    new LogoAnimations();
    
    // Animation d'entrée pour les éléments de navigation
    setTimeout(() => {
        const navItems = document.querySelectorAll('.nav-links li');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.warn('ENSP Menu: Une erreur s\'est produite:', e.error);
});