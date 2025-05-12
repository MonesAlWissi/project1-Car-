var loginForm = document.getElementById('loginForm');
var ABI_URL="http://127.0.0.1:5252/api/login";
var ABI_URL2="http://127.0.0.1:5252/api/cards";
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
   
    var user = {email, password};
  console.log(user);

  var response = await fetch(ABI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => res.json()).then(data=>{
    console.log(data);
    if(data.message == 'User logged in successfully'){
        alert('User logged in successfully');
        sessionStorage.setItem('authToken', data.token);
        window.location.href = '/html/main.html';

    }

      else{
        alert('User not found');
      }
     
  })
  console.log(response);
  

});