// Definisi Class Buku
class Buku {
    constructor(judul, penulis, tahun) {
        this.judul = judul;
        this.penulis = penulis;
        this.tahun = tahun;
    }
    tampilkanInfo() {
        return `${this.judul} oleh ${this.penulis} (${this.tahun})`;
    }
}

// Array untuk menyimpan daftar buku dan buku favorit
let daftarBuku = [];
let bukuFavorit = [];

// Mengambil elemen DOM
const formTambahBuku = document.getElementById('form-tambah-buku');
const divDaftarBuku = document.getElementById('daftar-buku');
const divBukuFavorit = document.getElementById('buku-favorit');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');

// Event Listener untuk Form Tambah Buku
formTambahBuku.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahBuku();
});

// Fungsi untuk menambahkan buku ke daftar
function tambahBuku() {
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;

    if (judul === '' || penulis === '' || tahun === '') {
        alert('Semua kolom harus diisi!');
        return;
    }

    const bukuBaru = new Buku(judul, penulis, tahun);
    daftarBuku.push(bukuBaru);
    simpanDaftarBuku();
    tampilkanDaftarBuku();
    formTambahBuku.reset();
}

// Fungsi untuk menyimpan daftar buku ke Local Storage
function simpanDaftarBuku() {
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
}

// Fungsi untuk menampilkan daftar buku
function tampilkanDaftarBuku() {
    divDaftarBuku.innerHTML = '';
    daftarBuku.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('p-4', 'border', 'rounded', 'shadow', 'flex', 'justify-between', 'items-center');
        divBuku.innerHTML = `
            <span>${buku.tampilkanInfo()}</span>
            <div>
                <button onclick="tambahKeFavorit(${index})" class="text-blue-500 mr-2">
                    <i data-feather="heart"></i>
                </button>
            </div>
        `;
        divDaftarBuku.appendChild(divBuku);
    });
    feather.replace();
}

// Fungsi untuk menambahkan buku ke favorit
function tambahKeFavorit(index) {
    const buku = daftarBuku[index];
    if (bukuFavorit.some(favBuku => favBuku.judul === buku.judul)) {
        alert('Buku ini sudah ada di daftar favorit!');
        return;
    }
    bukuFavorit.push(buku);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Fungsi untuk menyimpan buku favorit ke Local Storage
function simpanBukuFavorit() {
    localStorage.setItem('bukuFavorit', JSON.stringify(bukuFavorit));
}

// Fungsi untuk menampilkan buku favorit
function tampilkanBukuFavorit() {
    divBukuFavorit.innerHTML = '';
    bukuFavorit.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('p-4', 'border', 'rounded', 'shadow', 'flex', 'justify-between', 'items-center');
        divBuku.innerHTML = `
            <span>${buku.tampilkanInfo()}</span>
            <div>
                <button onclick="hapusDariFavorit(${index})" class="text-red-500">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        `;
        divBukuFavorit.appendChild(divBuku);
    });
}

// Fungsi untuk menghapus buku dari favorit
function hapusDariFavorit(index) {
    bukuFavorit.splice(index, 1);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Event Listener untuk tombol simpan nama pengguna
btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    sessionStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    formTambahBuku.classList.remove('hidden');
});

// Fungsi untuk menampilkan nama pengguna
function tampilkanNamaPengguna() {
    const nama = sessionStorage.getItem('namaPengguna');
    if (nama) {
        salamPengguna.textContent = `Selamat datang, ${nama}!`;
        formTambahBuku.classList.remove('hidden');
    }
}

// Memuat data saat halaman dimuat
window.onload = function () {
    if (localStorage.getItem('daftarBuku')) {
        daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')).map(book => new Buku(book.judul, book.penulis, book.tahun));
        tampilkanDaftarBuku();
    }
    if (localStorage.getItem('bukuFavorit')) {
        bukuFavorit = JSON.parse(localStorage.getItem('bukuFavorit')).map(book => new Buku(book.judul, book.penulis, book.tahun));
        tampilkanBukuFavorit();
    }
    tampilkanNamaPengguna();
};

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
});

closeSidebar.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
});

function hapusDariFavorit(id_buku) {
    const bookElement = document.getElementById(`favorite-${id_buku}`);
    if (bookElement) {
        bookElement.remove();
    }
}