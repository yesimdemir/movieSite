// My List sayfasındaki içerikleri localStorage'dan al ve sayfada göster
function displayMyList() {
    const myListContainer = document.querySelector('#my-list ul');
    const myList = JSON.parse(localStorage.getItem('myList')) || [];

    myListContainer.innerHTML = ''; // Önce listeyi temizle

    if (myList.length === 0) {
        // myListContainer.innerHTML = '<li>No movies added to your list yet.</li>';
    } else {
        myList.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.classList.add('movie');
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
                displayMyList(); // Listeyi tekrar güncelle
            });
        });
    }
}

// Sayfa yüklendiğinde işlemleri başlat
document.addEventListener('DOMContentLoaded', displayMyList);
