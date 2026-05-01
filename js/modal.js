/**
 * Modal Manager
 * Mengelola lightbox, detail modal, dan fungsi modal lainnya
 */

export class ModalManager {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.detailModal = document.getElementById('detailModal');
        this.modalContent = document.getElementById('modalContent');
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        if (this.detailModal) {
            this.detailModal.addEventListener('click', (e) => {
                if (e.target === this.detailModal) {
                    this.closeDetail();
                }
            });
        }
    }

    openLightbox(src) {
        this.lightboxImg.src = src;
        this.lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    destinationDetails = {
        'kerinci': {
            title: 'Gunung Kerinci',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
            description: 'Gunung Kerinci adalah gunung berapi tertinggi di Sumatera dan gunung berapi aktif tertinggi di Indonesia dengan ketinggian 3.805 meter di atas permukaan laut. Terletak di Provinsi Jambi, gunung ini menawarkan pengalaman mendaki yang menantang dengan pemandangan kawah yang spektakuler.',
            facts: [
                'Ketinggian: 3.805 mdpl',
                'Jalur Pendakian: 2 jalur utama (Kersik Tuo & Solok Selatan)',
                'Waktu Tempuh: 7-9 jam ke puncak',
                'Suhu Puncak: 0° - 10°C'
            ],
            price: 'Rp 350.000/orang (include guide & izin)'
        },
        'telun': {
            title: 'Air Terjun Telun Berasap',
            image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80',
            description: 'Air Terjun Telun Berasap adalah air terjun megah dengan ketinggian sekitar 50 meter. Dinamai "Berasap" karena kabut yang selalu menyelimuti area air terjun ini, menciptakan suasana magis dan mistis.',
            facts: [
                'Ketinggian: 50 meter',
                'Lokasi: Desasup, Kayu Aro',
                'Akses: Trekking 30 menit',
                'Fasilitas: Warung lokal & toilet'
            ],
            price: 'Rp 50.000/orang'
        },
        'kaco': {
            title: 'Danau Kaco',
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
            description: 'Danau Kaco adalah danau kristal biru yang terletak di tengah hutan hujan tropis. Airnya yang sangat jernih memungkinkan Anda melihat dasar danau dengan jelas. Menurut legenda setempat, danau ini memiliki kekuatan mistis.',
            facts: [
                'Kedalaman: ±30 meter',
                'Lokasi: Desa Lempur, Gunung Raya',
                'Akses: Trekking 2 jam',
                'Aktivitas: Swimming & camping'
            ],
            price: 'Rp 100.000/orang (include guide)'
        },
        'gunungtujuh': {
            title: 'Danau Gunung Tujuh',
            image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&q=80',
            description: 'Danau Gunung Tujuh adalah danau tertinggi di Sumatra yang terletak di ketinggian 1.996 meter di atas permukaan laut. Dikelilingi oleh tujuh puncak gunung yang menjulang tinggi, danau ini menawarkan pemandangan spektakuler dan suasana yang sangat sejuk.',
            facts: [
                'Ketinggian: 1.996 mdpl',
                'Lokasi: Taman Nasional Kerinci Seblat',
                'Akses: Trekking 4-5 jam',
                'Aktivitas: Camping & hiking'
            ],
            price: 'Rp 150.000/orang (include guide)'
        },
        'kerinci_danau': {
            title: 'Danau Kerinci',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
            description: 'Danau Kerinci adalah danau vulkanik terbesar di Indonesia dengan luas sekitar 4.200 hektar. Terletak di ketinggian 783 meter di atas permukaan laut, danau ini dikelilingi oleh pegunungan dan hutan tropis yang lebat.',
            facts: [
                'Luas: 4.200 hektar',
                'Ketinggian: 783 mdpl',
                'Lokasi: Kabupaten Kerinci',
                'Aktivitas: Perahu & memancing'
            ],
            price: 'Rp 75.000/orang'
        },
        'rawabento': {
            title: 'Rawa Bento',
            image: 'https://images.unsplash.com/photo-1500534314209-a2fb0c3b7711?w=800&q=80',
            description: 'Rawa Bento adalah rawa tertinggi di dunia yang terletak di ketinggian 2.000 meter di atas permukaan laut. Ekosistem unik ini merupakan habitat bagi berbagai jenis flora dan fauna langka, termasuk jenis tanaman khas dataran tinggi.',
            facts: [
                'Ketinggian: 2.000 mdpl',
                'Lokasi: Taman Nasional Kerinci Seblat',
                'Akses: Trekking 3 jam',
                'Ekosistem: Flora & fauna langka'
            ],
            price: 'Rp 125.000/orang (include guide)'
        },
        'bukitkhayangan': {
            title: 'Bukit Khayangan',
            image: 'https://images.unsplash.com/photo-1511863974851-8dc80b3b4bdd?w=800&q=80',
            description: 'Bukit Khayangan adalah spot pemandangan terbaik di Kerinci untuk melihat lanskap Kota Sungai Penuh dan Kabupaten Kerinci dari ketinggian. Pemandangan matahari terbit dan terbenam dari bukit ini sangat spektakuler.',
            facts: [
                'Ketinggian: ±1.500 mdpl',
                'Lokasi: Desa Sungai Penuh',
                'Akses: Naik kendaraan',
                'Best time: Sunrise & sunset'
            ],
            price: 'Rp 25.000/orang'
        },
        'talangkemulun': {
            title: 'Air Terjun Talang Kemulun',
            image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
            description: 'Air Terjun Talang Kemulun adalah air terjun bertingkat yang tersembunyi di dalam Taman Nasional Kerinci Seblat. Dengan ketinggian sekitar 80 meter, air terjun ini memiliki beberapa tingkatan yang menciptakan pemandangan yang eksotis.',
            facts: [
                'Ketinggian: 80 meter',
                'Lokasi: TNKS, Kerinci',
                'Akses: Trekking 2 jam',
                'Fitur: Bertingkat'
            ],
            price: 'Rp 75.000/orang (include guide)'
        },
        'goakasah': {
            title: 'Goa Kasah',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
            description: 'Goa Kasah adalah gua eksotis yang terletak di dalam hutan Kerinci. Goa ini memiliki formasi batuan yang unik dan pemandangan alam di sekitarnya yang sangat memukau. Aktivitas eksplorasi gua ini memberikan sensasi petualangan yang berbeda.',
            facts: [
                'Lokasi: Hutan Kerinci',
                'Akses: Trekking 1 jam',
                'Fitur: Formasi batuan unik',
                'Aktivitas: Caving'
            ],
            price: 'Rp 100.000/orang (include guide)'
        },
        'tehkayuaro': {
            title: 'Perkebunan Teh Kayu Aro',
            image: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?w=800&q=80',
            description: 'Perkebunan Teh Kayu Aro adalah perkebunan teh tertua dan tertinggi di Indonesia yang didirikan pada tahun 1925. Terletak di ketinggian 1.200-1.800 meter di atas permukaan laut, perkebunan ini menawarkan pemandangan hijau yang asri.',
            facts: [
                'Luas: 2.500 hektar',
                'Didirikan: 1925',
                'Ketinggian: 1.200-1.800 mdpl',
                'Aktivitas: Tur perkebunan'
            ],
            price: 'Rp 30.000/orang'
        },
        'stroberi': {
            title: 'Wisata Stroberi Gunung Selasih',
            image: 'https://images.unsplash.com/photo-1490885578174-acda6df92eb9?w=800&q=80',
            description: 'Wisata Stroberi Gunung Selasih adalah kebun stroberi populer yang terletak di Desa Beliu Tinggi, Kecamatan Depati Tujuh. Pengunjung dapat memetik stroberi langsung dari tanaman dan menikmati berbagai olahan stroberi.',
            facts: [
                'Lokasi: Desa Beliu Tinggi',
                'Aktivitas: Petik stroberi',
                'Fasilitas: Restoran & playground',
                'Musim: September - Februari'
            ],
            price: 'Rp 40.000/orang'
        },
        'airpanas': {
            title: 'Air Panas Semurup',
            image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&q=80',
            description: 'Air Panas Semurup adalah sumber mata air panas alami yang mengandung belerang. Terletak di kaki Gunung Kerinci, mata air panas ini memiliki suhu sekitar 40-50°C dan diyakini memiliki khasiat untuk kesehatan kulit dan relaksasi.',
            facts: [
                'Suhu: 40-50°C',
                'Lokasi: Kaki Gunung Kerinci',
                'Kandungan: Belerang',
                'Fasilitas: Kolam & warung'
            ],
            price: 'Rp 20.000/orang'
        },
        'rumahlarik': {
            title: 'Rumah Larik Amor Kerinci',
            image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
            description: 'Rumah Larik Amor adalah rumah tradisional khas masyarakat Kerinci yang memiliki arsitektur panjang memanjang. Rumah ini mencerminkan budaya dan kearifan lokal masyarakat Kerinci dalam membangun hunian yang harmonis dengan alam.',
            facts: [
                'Arsitektur: Panjang memanjang',
                'Material: Kayu & bambu',
                'Lokasi: Berbagai desa di Kerinci',
                'Fungsi: Hunian & pertemuan'
            ],
            price: 'Rp 15.000/orang (tur budaya)'
        },
        'kuliner': {
            title: 'Kuliner Khas Kerinci',
            image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
            description: 'Kuliner khas Kerinci menawarkan berbagai hidangan tradisional yang unik dan lezat. Beberapa yang terkenal adalah Gulai Ikan Semah (ikan mas dengan bumbu khas), Dodol Kentang (kue manis dari kentang), dan Kopi Kawo (kopi robusta lokal).',
            facts: [
                'Gulai Ikan Semah: Ikan mas dengan bumbu rempah',
                'Dodol Kentang: Kue manis khas',
                'Kopi Kawo: Kopi robusta premium',
                'Lokasi: Warung-warung lokal'
            ],
            price: 'Rp 25.000 - Rp 50.000/porsi'
        }
    };

    showDetail(id) {
        const data = this.destinationDetails[id];
        if (!data) return;

        const content = `
            <img src="${data.image}" class="w-full h-64 object-cover rounded-xl mb-6">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">${data.title}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">${data.description}</p>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Fakta Menarik:</h3>
            <ul class="space-y-2 mb-6">
                ${data.facts.map(fact => `<li class="flex items-center text-gray-600 dark:text-gray-300"><i class="fas fa-check-circle text-primary-500 mr-3"></i>${fact}</li>`).join('')}
            </ul>
            
            <div class="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 mb-6">
                <span class="text-sm text-gray-600 dark:text-gray-400">Harga:</span>
                <div class="text-2xl font-bold text-primary-600">${data.price}</div>
            </div>
            
            <button onclick="closeDetail()" class="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition">
                Tutup
            </button>
        `;
        
        this.modalContent.innerHTML = content;
        this.detailModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeDetail() {
        this.detailModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}
