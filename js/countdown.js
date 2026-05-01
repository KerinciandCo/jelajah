/**
 * Countdown Timer
 * Mengelola countdown untuk event utama
 */

export class CountdownTimer {
    constructor() {
        this.daysEl = document.getElementById('days');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.startCountdown();
    }

    startCountdown() {
        const targetElement = document.getElementById('mainEventTarget');
        let endDate = new Date();

        if (targetElement && targetElement.dataset.date) {
            const targetDate = new Date(targetElement.dataset.date);
            if (!Number.isNaN(targetDate.getTime())) {
                endDate = targetDate;
            }
        } else {
            endDate.setDate(endDate.getDate() + 15);
        }

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance < 0) {
                this.setDisplay(0, 0, 0, 0);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.setDisplay(days, hours, minutes, seconds);
        };

        updateTimer();
        this.intervalId = setInterval(updateTimer, 1000);
    }

    setDisplay(days, hours, minutes, seconds) {
        if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, '0');
        if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
        if (this.minutesEl) this.minutesEl.textContent = String(minutes).padStart(2, '0');
        if (this.secondsEl) this.secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
