// Menunggu hingga seluruh konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Mengambil elemen dengan kelas 'hamburger-menu' dan menyimpannya dalam variabel
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    // Mengambil elemen dengan kelas 'menu' dan menyimpannya dalam variabel
    const menu = document.querySelector('.menu');

    // Menambahkan event listener untuk menangani klik pada elemen hamburger menu
    hamburgerMenu.addEventListener('click', function () {
        // Menambah atau menghapus kelas 'active' pada elemen menu
        menu.classList.toggle('active');
        // Menambah atau menghapus kelas 'active' pada elemen hamburger menu itu sendiri
        this.classList.toggle('active');
    });
});
