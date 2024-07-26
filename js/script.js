const baseUrl = 'https://api-berita-indonesia.vercel.app/cnn/'

let pageInt = 1;
const postsPerPage = 18; // Jumlah pos yang ditampilkan per halaman
const totalPosts = 54; // Total pos yang ada
const paginationContainer = document.querySelector("#pagination"); // Elemen untuk menampilkan pagination
let allPosts = []; // Array untuk menyimpan semua pos
let totalPages = 0; // Total halaman

// Fungsi untuk membuat elemen pagination
function createPagination() {
  clearPagination(); // Menghapus link pagination yang ada

  // Loop untuk membuat link halaman
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a'); // Membuat elemen link baru
    pageLink.href = '#'; // Menetapkan href untuk link
    pageLink.className = 'page'; // Menetapkan kelas untuk styling
    pageLink.textContent = i; // Menetapkan teks link dengan nomor halaman
    if (i === pageInt) { // Jika ini adalah halaman aktif
      pageLink.classList.add('active'); // Menambahkan kelas aktif
    }
    // Menambahkan event listener untuk klik pada link halaman
    pageLink.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah perilaku default link
      pageInt = i; // Mengubah halaman saat ini
      showPage(pageInt); // Menampilkan halaman yang dipilih
    });
    paginationContainer.appendChild(pageLink); // Menambahkan link ke kontainer pagination
  }
}

// Fungsi untuk menghapus semua link pagination yang ada
function clearPagination() {
  while (paginationContainer.firstChild) {
    paginationContainer.removeChild(paginationContainer.firstChild); // Menghapus semua anak dari kontainer pagination
  }
}

// Fungsi untuk mendapatkan berita dari API
function getNews(apiUrl = `${baseUrl}terbaru`) {
  fetch(apiUrl) // Mengambil data dari URL API
    .then((response) => response.json()) // Mengubah respons menjadi JSON
    .then((response) => {
      allPosts = response.data.posts.slice(0, totalPosts); // Menyimpan pos yang diambil
      totalPages = Math.ceil(allPosts.length / postsPerPage); // Menghitung total halaman
      createPagination(); // Membuat pagination setelah mendapatkan berita
      showPage(pageInt); // Menampilkan halaman pertama
    })
    .catch((err) => console.error(err)); // Menangani error jika terjadi
}

// Fungsi untuk menampilkan pos
function showPost(post) {
  const showPosts = document.querySelector('#show-post'); // Elemen untuk menampilkan pos
  const figure = document.createElement('figure'); // Membuat elemen figure
  const imageContainer = document.createElement('div'); // Membuat kontainer untuk gambar
  imageContainer.className = 'image-container'; // Menetapkan kelas untuk styling
  const img = document.createElement('img'); // Membuat elemen gambar
  img.setAttribute('src', post.thumbnail); // Menetapkan sumber gambar
  const h2 = document.createElement('h2'); // Membuat elemen judul
  h2.innerText = post.title; // Menetapkan teks judul
  const figcaption = document.createElement('figcaption'); // Membuat elemen figcaption
  const date = document.createElement('p'); // Membuat elemen paragraf untuk tanggal
  date.innerText = post.pubDate; // Menetapkan teks tanggal
  date.className = 'date'; // Menetapkan kelas untuk styling
  const desc = document.createElement('p'); // Membuat elemen paragraf untuk deskripsi
  desc.innerText = post.description; // Menetapkan teks deskripsi
  const a = document.createElement('a'); // Membuat elemen link
  a.setAttribute('href', post.link); // Menetapkan href link
  a.classList.add('news-card'); // Menetapkan kelas untuk styling

  figcaption.appendChild(date); // Menambahkan tanggal ke figcaption
  figcaption.appendChild(desc); // Menambahkan deskripsi ke figcaption
  imageContainer.appendChild(h2); // Menambahkan judul ke imageContainer
  imageContainer.appendChild(img); // Menambahkan gambar ke imageContainer
  figure.appendChild(imageContainer); // Menambahkan imageContainer ke figure
  figure.appendChild(figcaption); // Menambahkan figcaption ke figure
  a.appendChild(figure); // Menambahkan figure ke link
  showPosts.appendChild(a); // Menambahkan link ke elemen show-post
}

// Fungsi untuk menampilkan halaman berdasarkan nomor halaman
function showPage(page) {
  const startIndex = (page - 1) * postsPerPage; // Menghitung index mulai pos
  const endIndex = page * postsPerPage; // Menghitung index akhir pos
  const postsToShow = allPosts.slice(startIndex, endIndex); // Mengambil pos yang akan ditampilkan

  const showPosts = document.querySelector('#show-post'); // Elemen untuk menampilkan pos
  clearPosts(showPosts); // Menghapus pos yang ada

  postsToShow.forEach(post => {
    showPost(post); // Menampilkan setiap pos
  });

  document.querySelectorAll('.page').forEach(link => {
    link.classList.remove('active'); // Menghapus kelas aktif dari semua link
  });
  document.querySelector(`.page:nth-child(${page})`).classList.add('active'); // Menambahkan kelas aktif pada link halaman yang dipilih
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Scroll halus ke atas halaman
  });
}

// Fungsi untuk menghapus semua pos yang ada
function clearPosts(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild); // Menghapus semua anak dari kontainer pos
  }
}

// Fungsi untuk mencari berdasarkan kategori
function searchByCategory(event) {
  event.preventDefault(); // Mencegah perilaku default formulir
  const keyword = document.querySelector("#keyword").value.toLowerCase().trim(); // Mendapatkan kata kunci pencarian
  const categoryPaths = {
    "terbaru": "terbaru",
    "nasional": "nasional",
    "internasional": "internasional",
    "ekonomi": "ekonomi",
    "olahraga": "olahraga",
    "teknologi": "teknologi",
    "hiburan": "hiburan",
    "gaya hidup": "gayaHidup"
  };

  if (categoryPaths.hasOwnProperty(keyword)) { // Memeriksa apakah kategori valid
    const categoryPath = categoryPaths[keyword]; // Mendapatkan path kategori
    window.location.href = `kategori.html?category=${categoryPath}`; // Mengalihkan ke halaman kategori yang sesuai
  } else {
    alert("Category not found!"); // Menampilkan peringatan jika kategori tidak ditemukan
  }
}

// Fungsi untuk membuat elemen footer
function createFooter() {
  let content = document.querySelector('.footer'); // Elemen footer
  let footerContent = document.createElement('section'); // Membuat elemen section untuk footer
  footerContent.id = 'footer-content'; // Menetapkan id untuk styling

  // Membuat elemen tentang kami
  let aboutUs = document.createElement('div');
  aboutUs.className = 'about-us'; // Menetapkan kelas untuk styling
  let aboutUsTitle = document.createElement('h3');
  aboutUsTitle.textContent = 'About Us'; // Menetapkan judul
  let aboutUsText = document.createElement('p');
  aboutUsText.textContent = 'Express Update is your reliable source for the latest news and insights across various domains including news, markets, and entrepreneurship.'; // Menetapkan teks deskripsi
  aboutUs.appendChild(aboutUsTitle); // Menambahkan judul ke aboutUs
  aboutUs.appendChild(aboutUsText); // Menambahkan teks ke aboutUs

  // Membuat elemen kontak
  let contactInfo = document.createElement('div');
  let contactTitle = document.createElement('h3');
  contactTitle.textContent = 'Contact'; // Menetapkan judul kontak
  let address = document.createElement('p');
  address.textContent = 'Alamat: Jl. Bissmillah No. 123, Bandung, Indonesia'; // Menetapkan alamat
  let email = document.createElement('p');
  let emailLink = document.createElement('a');
  emailLink.href = '#'; // Menetapkan href untuk email
  emailLink.textContent = 'info@ExpressUpdate.com'; // Menetapkan teks email
  email.textContent = 'Email: '; // Menetapkan label email
  email.appendChild(emailLink); // Menambahkan link email ke paragraf
  let phone = document.createElement('p');
  phone.textContent = 'Telepon: +62 21 1234567'; // Menetapkan nomor telepon

  contactInfo.appendChild(contactTitle); // Menambahkan judul kontak ke contactInfo
  contactInfo.appendChild(address); // Menambahkan alamat ke contactInfo
  contactInfo.appendChild(email); // Menambahkan email ke contactInfo
  contactInfo.appendChild(phone); // Menambahkan telepon ke contactInfo

  // Membuat elemen media sosial
  let socialMedia = document.querySelector('.social-media');

  // Membuat elemen legal
  let legal = document.createElement('div');
  legal.className = 'legal'; // Menetapkan kelas untuk styling
  let privacyPolicy = document.createElement('a');
  privacyPolicy.textContent = 'Kebijakan Privasi'; // Menetapkan teks kebijakan privasi
  let separator = document.createElement('span');
  separator.textContent = ' | '; // Menetapkan separator
  let termsConditions = document.createElement('a');
  termsConditions.textContent = 'Syarat dan Ketentuan'; // Menetapkan teks syarat dan ketentuan
  let copyright = document.createElement('p');
  copyright.textContent = 'Hak Cipta © 2024 ExpressUpdate.com. Semua Hak Dilindungi.'; // Menetapkan teks hak cipta

  legal.appendChild(privacyPolicy); // Menambahkan kebijakan privasi ke legal
  legal.appendChild(separator); // Menambahkan separator ke legal
  legal.appendChild(termsConditions); // Menambahkan syarat dan ketentuan ke legal
  legal.appendChild(copyright); // Menambahkan hak cipta ke legal
  footerContent.appendChild(aboutUs); // Menambahkan aboutUs ke footerContent
  footerContent.appendChild(contactInfo); // Menambahkan contactInfo ke footerContent
  footerContent.appendChild(socialMedia); // Menambahkan socialMedia ke footerContent
  footerContent.appendChild(legal); // Menambahkan legal ke footerContent
  content.appendChild(footerContent); // Menambahkan footerContent ke elemen footer
}

// Menambahkan event listener ketika DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
  getNews(); // Memanggil getNews() untuk menampilkan berita terbaru di halaman utama
  const searchForm = document.querySelector('.search-box');
  if (searchForm) {
    searchForm.addEventListener('submit', searchByCategory); // Menambahkan event listener untuk formulir pencarian
  }

  const sidebarLinks = document.querySelectorAll('.tags a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Mencegah perilaku default link
      const href = this.getAttribute('href'); // Mendapatkan href dari link
      window.location.href = href; // Mengalihkan ke href yang dipilih
    });
  });
  
  createFooter(); // Memanggil dan menampilkan footer
});
