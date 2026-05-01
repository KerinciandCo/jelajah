/**
 * Navbar Manager
 * Mengelola efek scroll navbar dan mobile menu
 */

export class NavbarManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLogoText = document.getElementById('nav-logo-text');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.updateNavbarStyle(window.scrollY > 50);
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
                this.updateNavbarStyle(true);
            } else {
                this.navbar.classList.remove('scrolled');
                this.updateNavbarStyle(false);
            }
        });
    }

    updateNavbarStyle(isScrolled) {
        if (isScrolled) {
            this.navbar.classList.remove('bg-transparent');
            this.navbar.classList.add('shadow-md', 'bg-white/95');

            this.navbar.classList.remove('bg-white', 'bg-gray-900', 'bg-gray-800', 'bg-gray-900/95');
            this.navLogoText.classList.remove('text-white', 'text-primary-600', 'text-gray-800');
            this.navLogoText.classList.add('text-primary-600');

            this.navLinks.forEach(link => {
                link.classList.remove('text-white', 'text-gray-800');
                link.classList.add('text-gray-800');
            });

            this.mobileMenuBtn.classList.remove('text-white', 'text-gray-800');
            this.mobileMenuBtn.classList.add('text-gray-800');
        } else {
            this.navbar.classList.remove('bg-white', 'bg-gray-900', 'bg-gray-800', 'bg-white/95', 'bg-gray-900/95', 'shadow-md');
            this.navbar.classList.add('bg-transparent');

            this.navLogoText.classList.remove('text-primary-600', 'text-gray-800', 'text-white');
            this.navLogoText.classList.add('text-white');

            this.navLinks.forEach(link => {
                link.classList.remove('text-gray-800', 'text-white');
                link.classList.add('text-white');
            });

            this.mobileMenuBtn.classList.remove('text-gray-800', 'text-white');
            this.mobileMenuBtn.classList.add('text-white');
        }
    }

    setupMobileMenu() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.mobileMenu.classList.toggle('hidden');
            });

            // Close menu when clicking link
            this.mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.mobileMenu.classList.add('hidden');
                });
            });
        }
    }
}
