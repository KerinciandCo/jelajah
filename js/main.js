/**
 * Main Application Entry Point
 * Inisialisasi semua modules
 */

import { NavbarManager } from './navbar.js';
import { ModalManager } from './modal.js';
import { CountdownTimer } from './countdown.js';
import { AnimationManager, playVideo } from './animations.js';
import { WeatherManager } from './weather.js';

class App {
    constructor() {
        this.initManagers();
        this.setupGlobalFunctions();
        this.showDevNotice();
    }

    initManagers() {
        // Initialize all managers
        this.navbar = new NavbarManager();
        this.modal = new ModalManager();
        this.countdown = new CountdownTimer();
        this.weather = new WeatherManager();
        this.animations = new AnimationManager();
    }

    showDevNotice() {
        this.devNoticeModal = document.getElementById('devNoticeModal');
        if (!this.devNoticeModal) return;

        this.devNoticeModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeDevNotice() {
        const modal = document.getElementById('devNoticeModal');
        if (!modal) return;

        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    setupGlobalFunctions() {
        // Make functions available globally
        window.playVideo = playVideo;
        window.openLightbox = (src) => this.modal.openLightbox(src);
        window.closeLightbox = () => this.modal.closeLightbox();
        window.showDetail = (id) => this.modal.showDetail(id);
        window.closeDetail = () => this.modal.closeDetail();
        window.closeDevNotice = () => this.closeDevNotice();
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new App();
    });
} else {
    new App();
}
