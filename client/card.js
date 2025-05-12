const API_URL = 'http://127.0.0.1:5252/api/cards';
const DELETE_URL = 'http://127.0.0.1:5252/api/deleteUser';
const token = sessionStorage.getItem('authToken');
var cardToUpdate = null; 

async function updateCard(id) {
  cardToUpdate = id;
  const updatedData = {
    name: document.getElementById('carName').value,
    model: document.getElementById('carModel').value,
    year: document.getElementById('carYear').value,
    price: document.getElementById('carPrice').value,
    color: document.getElementById('carColor').value,
    description: document.getElementById('carDescription').value,
    imagUrl: document.getElementById('carImage').value
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      },
      body: JSON.stringify(updatedData)
    });

    const result = await response.json();
    if (response.ok) {
      alert('Card updated successfully!');
      getUsers(); // refresh the list
    } else {
      alert('Update failed: ' + result.message);
    }
  } catch (error) {
    console.error('Error updating card:', error);
    alert('Error updating card');
  }
}


document.getElementById('saveChangesBtn').onclick = () => {
  if (cardToUpdate) {
    updateCard(cardToUpdate);
  }
};
async function saveCard(card) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      },
      body: JSON.stringify(card)
    });

    const result = await response.json();
    if (response.ok) {
      alert('Card created successfully!');
      getUsers(); // refresh the list
    } else {
      alert('Creation failed: ' + result.message);
    }
  } catch (error) {
    console.error('Error creating card:', error);
    alert('Error creating card');
  }
}


async function getUsers() {
  var supUpdate = document.getElementById('update')
  supUpdate.addEventListener('submit', async (e) => {
    e.preventDefault();
    var carName = document.getElementById('carName').value;
    var carModel = document.getElementById('carModel').value;
    var carPrice = document.getElementById('carPrice').value;
    var carImage = document.getElementById('carImage').value;
    var carDescription = document.getElementById('carDescription').value;
    var carColor = document.getElementById('carColor').value;
    var carYear = document.getElementById('carYear').value;
  
    var id = cardToUpdate;
    var updateData = {
      name: carName,
      model: carModel,
      price: carPrice,
      imagUrl: carImage,
      description: carDescription,
      color: carColor,
      year: carYear
    };
    var res = await fetch('http://127.0.0.1:5252/api/updateCard/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      },
      body: JSON.stringify(updateData)
    }).then(res=> res.json())
    .then(data => {
      console.log(data);
      
      if (data.message === 'Card updated successfully') {
        alert('Card updated successfully');
        window.location.reload();
      // refresh the list
      } else {
        alert('Error updating card:');
      }
    })


   const newCard = {
     name: carName,
     model: carModel,
     price: carPrice,
      imagUrl: carImage,
      description: carDescription,
      color: carColor,
      year: carYear

    };

   
  });
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const container = document.getElementById('cardsContainer');
    container.innerHTML = ''; 

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
      `;

      
    
      
      var updateButton   = document.createElement('button');
      updateButton.innerHTML = 'update';
      updateButton.setAttribute("data-bs-toggle","modal")
      updateButton.setAttribute("data-bs-target","#exampleModal")

      var updateModal = document.getElementById('updateModal')
      var updatecarName = document.getElementById('carName')
      var updatecarModel = document.getElementById('carModel')
      var updatecarYear = document.getElementById('carYear')
      var updatecarPrice = document.getElementById('carPrice')
      var updatecarColor = document.getElementById('carColor')
      var updatecarDescription = document.getElementById('carDescription')
      var updatecarImage = document.getElementById('carImage')
      

      updateButton.onclick=(e)=> {
        e.preventDefault()
        updatecarName.value = card.userName;
        updatecarModel.value = card.model;
        updatecarYear.value = card.year;
        updatecarPrice.value = card.price;
        updatecarColor.value = card.color;
        updatecarDescription.value = card.description;
        updatecarImage.value = card.imagUrl;
        cardToUpdate = card._id;
      }
      updateButton.className = 'btn btn-primary btn-sm update-btn';
      col.querySelector('.card-body').appendChild(updateButton);
      container.appendChild(col);


      var deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'delete';
      deleteButton.onclick = () => deleteUser(card._id);
     
      deleteButton.className = 'btn btn-danger btn-sm delete-btn';
      col.querySelector('.card-body').appendChild(deleteButton);
     
    
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    document.getElementById('cardsContainer').innerHTML = `<p class="text-danger">Failed to load car cards.</p>`;
  }
}

async function deleteUser(id) {
  const confirmed = confirm('you want to delete this user?');
  if (confirmed) {
    try {
      const response = await fetch(`${DELETE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Auth': token
        }
   
        
      });
    
      const data = await response.json();
      if (data.message === 'User delete successfully') {
        alert('User deleted successfully');
        getUsers(); 
      } else {
        alert('Error deleting user:', data.message);
      }
      getUsers();
      
      console.log("User ID:", id);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user:', error);
    }
  }
}


getUsers();
