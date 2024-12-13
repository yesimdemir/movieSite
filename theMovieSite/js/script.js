function showGallery(galleryId) {
    // Tüm galeri div'lerini gizle
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.style.display = 'none';
    });

    // Seçilen kategorinin galerisini göster
    const selectedGallery = document.getElementById(galleryId);
    if (selectedGallery) {
        selectedGallery.style.display = 'grid';
    }
}

// Sayfa yüklendiğinde işlemleri başlat
document.addEventListener('DOMContentLoaded', () => {
    // 'My List' içeriğini göster
    displayMyList();

    // Kategori tıklama olaylarını bağla
    // Kategorilere tıklanıp tıklanmadığını kontrol et
document.querySelectorAll('li[data-category]').forEach(categoryItem => {
    categoryItem.addEventListener('click', () => {
        const category = categoryItem.getAttribute('data-category');
        console.log(`Kategori: ${category} tıklandı`);
        const galleryId = `${category}-gallery`;
        console.log(`Gösterilecek galeri: ${galleryId}`);
        showGallery(galleryId);
    });
});


    // Varsayılan olarak ilk kategoriye tıkla
    const firstCategory = document.querySelector('li[data-category]');
    if (firstCategory) {
        firstCategory.click();
    }

    // Kalp ikonlarına tıklama olayını bağla
    document.querySelectorAll('.heart-icon').forEach(heartIcon => {
        heartIcon.addEventListener('click', addToMyList);
    });
});

// 'My List'e film ekleme işlevi
function addToMyList(event) {
    event.preventDefault();
    event.stopPropagation();

    const movie = event.target.closest('.movie');
    const movieId = movie.querySelector('img').dataset.id || movie.querySelector('img').alt;
    const movieName = movie.querySelector('img').alt;
    const movieImage = movie.querySelector('img').src;

    // LocalStorage işlemleri
    let myList = JSON.parse(localStorage.getItem('myList')) || [];
    const movieExists = myList.some(item => item.id === movieId);

    if (!movieExists) {
        myList.push({ id: movieId, name: movieName, image: movieImage });
        localStorage.setItem('myList', JSON.stringify(myList));
        alert(`${movieName} Added to My List!`);
    } else {
        alert(`${movieName} Already added!`);
    }
}

// 'My List' içeriğini gösterme işlevi


function displayMyList() {
    const myListContainer = document.getElementById('my-list');
    if (!myListContainer) {
        console.error("my-list öğesi bulunamadı!"); // Hata mesajı
        return;
    }

    const myList = JSON.parse(localStorage.getItem('myList')) || [];
    myListContainer.innerHTML = '';

    myList.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.classList.add('movie');
        movieItem.dataset.id = movie.id;
        movieItem.innerHTML = `
            <img src="${movie.image}" alt="${movie.name}">
            <div class="remove-icon">✖</div>
            <span>${movie.name}</span>
        `;
        myListContainer.appendChild(movieItem);

        // Çarpı ikonuna tıklama ile filmi listeden kaldır
        movieItem.querySelector('.remove-icon').addEventListener('click', () => {
            const updatedList = myList.filter(item => item.id !== movie.id);
            localStorage.setItem('myList', JSON.stringify(updatedList));
            displayMyList();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 'My List' içeriğini göster
    displayMyList(); 

    // Kategori tıklama olaylarını bağla
    document.querySelectorAll('li[data-category]').forEach(categoryItem => {
        categoryItem.addEventListener('click', () => {
            const category = categoryItem.getAttribute('data-category');
            const galleryId = `${category}-gallery`;
            showGallery(galleryId);
        });
    });

    // Varsayılan olarak ilk kategoriye tıkla
    const firstCategory = document.querySelector('li[data-category]');
    if (firstCategory) {
        firstCategory.click();
    }
});



// Kategori tıklama işlemi
document.querySelectorAll('ul li').forEach(item => {
    item.addEventListener('click', (event) => {
        // Tüm galerileri gizle
        document.querySelectorAll('.gallery').forEach(gallery => {
            gallery.classList.remove('active');
        });

        // Tıklanan kategoriye ait galeriyi göster
        const category = item.getAttribute('data-category');
        document.getElementById(`${category}-gallery`).classList.add('active');
    });
});

'use strict';

const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lotr_123',
  database: 'testdb'
});

connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });