const LATITUDE = -1.773269;
const LONGITUDE = 101.316530;
const CACHE_KEY = `kerinciWeatherCache-${LATITUDE}-${LONGITUDE}`;
const TIMEZONE = 'Asia/Jakarta';
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,surface_pressure,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(TIMEZONE)}`;

const WEATHER_CODES = [
    { codes: [0], label: 'Cerah', icon: 'sun' },
    { codes: [1, 2, 3], label: 'Cerah Berawan', icon: 'cloud-sun' },
    { codes: [45, 48], label: 'Kabut', icon: 'smog' },
    { codes: [51, 53, 55, 61, 63, 65, 80, 81, 82], label: 'Hujan', icon: 'cloud-rain' },
    { codes: [56, 57, 66, 67], label: 'Hujan Beku', icon: 'cloud-meatball' },
    { codes: [71, 73, 75, 77, 85, 86], label: 'Salju', icon: 'snowflake' },
    { codes: [95, 96, 99], label: 'Badai', icon: 'bolt' },
];

const WEEKDAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function formatDay(dateString) {
    const date = new Date(dateString);
    return WEEKDAY_NAMES[date.getDay()];
}

function getWeatherMeta(code) {
    const match = WEATHER_CODES.find((item) => item.codes.includes(code));
    return match || { label: 'Tidak Diketahui', icon: 'question' };
}

function getTodayKey() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function parseVisibility(value) {
    if (typeof value !== 'number') return '--';
    return `${Math.round(value / 1000)} km`;
}

class WeatherManager {
    constructor() {
        this.temperatureEl = document.getElementById('weather-temperature');
        this.conditionEl = document.getElementById('weather-condition');
        this.updatedEl = document.getElementById('weather-last-updated');
        this.windEl = document.getElementById('weather-wind');
        this.humidityEl = document.getElementById('weather-humidity');
        this.pressureEl = document.getElementById('weather-pressure');
        this.uvEl = document.getElementById('weather-uv');
        this.forecastEl = document.getElementById('weather-forecast');
        this.updateBtn = document.getElementById('weatherUpdateBtn');

        this.init();
    }

    init() {
        this.loadCachedWeather();
        this.updateBtn?.addEventListener('click', () => this.handleUpdate());
    }

    loadCachedWeather() {
        const cache = this.getCache();
        if (cache && cache.date === getTodayKey() && cache.payload) {
            this.renderWeather(cache.payload);
        } else {
            this.fetchWeather();
        }
    }

    getCache() {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    }

    saveCache(payload) {
        const cache = {
            date: getTodayKey(),
            timestamp: Date.now(),
            payload,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }

    async handleUpdate() {
        const cache = this.getCache();
        if (cache && cache.date === getTodayKey()) {
            alert('Cuaca sudah diperbarui hari ini. Silakan kembali besok untuk pembaruan baru.');
            return;
        }

        await this.fetchWeather();
    }

    async fetchWeather() {
        this.setLoadingState();

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Gagal mengambil data cuaca.');
            }
            const data = await response.json();
            const payload = this.normalizeWeather(data);
            this.saveCache(payload);
            this.renderWeather(payload);
        } catch (error) {
            const cache = this.getCache();
            if (cache && cache.payload) {
                this.renderWeather(cache.payload);
            } else {
                this.renderError();
            }
        }
    }

    normalizeWeather(apiData) {
        const current = apiData.current || {};
        const daily = apiData.daily || {};

        return {
            temperature: current.temperature_2m ?? '--',
            wind: current.wind_speed_10m ?? '--',
            humidity: current.relative_humidity_2m ?? '--',
            pressure: current.surface_pressure ?? '--',
            uv: current.uv_index ?? '--',
            condition: getWeatherMeta(current.weather_code ?? -1),
            daily: (daily.time || []).slice(1, 4).map((date, index) => ({
                date,
                weathercode: daily.weather_code?.[index + 1] ?? -1,
                max: daily.temperature_2m_max?.[index + 1] ?? '--',
                min: daily.temperature_2m_min?.[index + 1] ?? '--',
            })),
            updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        };
    }

    setLoadingState() {
        if (this.conditionEl) {
            this.conditionEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Memuat...';
        }
    }

    renderWeather(payload) {
        if (this.temperatureEl) {
            this.temperatureEl.textContent = `${payload.temperature}°C`;
        }
        if (this.conditionEl) {
            this.conditionEl.innerHTML = `<i class="fas fa-${payload.condition.icon} mr-2"></i>${payload.condition.label}`;
        }
        if (this.updatedEl) {
            this.updatedEl.textContent = `Terakhir diperbarui: ${payload.updatedAt}`;
        }
        if (this.windEl) {
            this.windEl.textContent = `${payload.wind} km/j`;
        }
        if (this.humidityEl) {
            this.humidityEl.textContent = `${payload.humidity}%`;
        }
        if (this.pressureEl) {
            this.pressureEl.textContent = `${Math.round(payload.pressure)} hPa`;
        }
        if (this.uvEl) {
            this.uvEl.textContent = `${payload.uv}`;
        }
        if (this.forecastEl) {
            this.forecastEl.innerHTML = payload.daily.map((day) => {
                const meta = getWeatherMeta(day.weathercode);
                return `
                    <div class="bg-white/20 backdrop-blur rounded-xl p-3">
                        <div class="mb-2 text-sm">${formatDay(day.date)}</div>
                        <i class="fas fa-${meta.icon} text-2xl mb-2"></i>
                        <div class="font-bold text-sm">${Math.round(day.max)}° / ${Math.round(day.min)}°</div>
                    </div>
                `;
            }).join('');
        }
    }

    renderError() {
        if (this.conditionEl) {
            this.conditionEl.textContent = 'Tidak dapat memuat data cuaca.';
        }
        if (this.updatedEl) {
            this.updatedEl.textContent = 'Periksa koneksi internet dan coba lagi besok.';
        }
    }
}

export { WeatherManager };
