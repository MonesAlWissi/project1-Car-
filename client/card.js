const API_URL = 'http://127.0.0.1:5252/api/cards';



fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('cardsContainer');

    data.forEach(card => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';

      col.innerHTML = `
        <div class="card h-100 shadow">
          <img src="${card.imagUrl}" class="card-img-top" alt="${card.model}">
          <div class="card-body">
            <h5 class="card-title">${card.userName} - ${card.model}</h5>
            <p class="card-text">${card.description}</p>
            <ul class="list-group list-group-flush mb-2">
              <li class="list-group-item"><strong>Year:</strong> ${card.year}</li>
              <li class="list-group-item"><strong>Color:</strong> ${card.color}</li>
              <li class="list-group-item"><strong>Price:</strong> $${card.price}</li>
            </ul>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  })
  .catch(error => {
    console.error('Error fetching cards:', error);
    document.getElementById('cardsContainer').innerHTML = `<p class="text-danger">Failed to load car cards.</p>`;
  });
