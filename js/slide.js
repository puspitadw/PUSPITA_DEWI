// Variabel global untuk menyimpan indeks slide yang sedang ditampilkan
let slideIndex = 0;

// Fungsi untuk menghapus semua kelas yang menentukan posisi slide
function resetSlideClasses(slides) {
    slides.classList.remove('slide-position-0', 'slide-position-1', 'slide-position-2');
    // Tambahkan penghapusan kelas lainnya jika ada
}

// Fungsi untuk menampilkan slide sesuai dengan indeks yang diberikan
function showSlides(n) {
    // Mengambil semua elemen dengan kelas 'slide'
    const slides = document.querySelectorAll(".slide");
    const slidesContainer = document.querySelector('.slides');
    
    // Jika indeks lebih besar dari jumlah slide, setel ke 0
    if (n >= slides.length) { slideIndex = 0; }
    
    // Jika indeks kurang dari 0, setel ke slide terakhir
    if (n < 0) { slideIndex = slides.length - 1; }
    
    // Hapus semua kelas posisi dari slide yang sedang aktif
    resetSlideClasses(slidesContainer);

    // Tambahkan kelas posisi untuk slide yang baru
    slidesContainer.classList.add(`slide-position-${slideIndex}`);
}

// Fungsi untuk memindahkan ke slide berikutnya atau sebelumnya
function changeSlide(n) {
    // Tambah langkah n pada slideIndex untuk mengubah slide
    slideIndex += n;
    
    // Panggil fungsi untuk menampilkan slide baru berdasarkan indeks yang diperbarui
    showSlides(slideIndex);
}

// Tampilkan slide pertama kali saat halaman dimuat
showSlides(slideIndex);

// Atur interval untuk otomatis mengganti slide setiap 5 detik
setInterval(() => changeSlide(1), 5000);
