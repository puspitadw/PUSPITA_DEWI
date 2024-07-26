// Menunggu sampai seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Menyimpan referensi ke elemen switch tema dan elemen body
    const themeSwitch = document.querySelector('.theme-switch');
    const body = document.body;

    // Memeriksa penyimpanan lokal untuk preferensi tema
    if (localStorage.getItem('theme') === 'dark') {
        // Jika tema yang disimpan adalah 'dark', aktifkan mode gelap
        body.classList.add('dark-mode');
        // Ubah ikon switch dari bulan (dark mode) ke matahari (light mode)
        themeSwitch.querySelector('i').classList.replace('bx-moon', 'bx-sun');
        themeSwitch.querySelector('i').classList.add('sun-icon'); // Tambahkan kelas sun-icon untuk gaya tambahan
    }

    // Menambahkan event listener untuk switch tema saat diklik
    themeSwitch.addEventListener('click', function () {
        // Toggle antara mode gelap dan terang
        body.classList.toggle('dark-mode');

        // Menyimpan referensi ke elemen ikon dalam switch
        const icon = themeSwitch.querySelector('i');
        
        // Toggle antara ikon bulan dan matahari
        icon.classList.toggle('bx-moon'); // Tambah atau hapus ikon bulan
        icon.classList.toggle('bx-sun'); // Tambah atau hapus ikon matahari

        if (body.classList.contains('dark-mode')) {
            // Jika mode gelap aktif, simpan preferensi di penyimpanan lokal
            localStorage.setItem('theme', 'dark'); // Menyimpan tema gelap
            icon.classList.add('sun-icon'); // Tambahkan kelas sun-icon untuk gaya tambahan
        } else {
            // Jika mode gelap tidak aktif, hapus preferensi dari penyimpanan lokal
            localStorage.removeItem('theme'); // Menghapus preferensi tema
            icon.classList.remove('sun-icon'); // Hapus kelas sun-icon jika ada
        }
    });
});
