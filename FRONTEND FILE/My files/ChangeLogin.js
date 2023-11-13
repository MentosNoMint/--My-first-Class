let localTokenCheckLogin = localStorage.getItem('auth_token')
var tok = JSON.parse(localTokenCheckLogin);
let countCheckLogin = tok

const form2 = document.querySelector('.my-form-change-password');

form2.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form2);
    const login = formData.get('login-change')

    let responceEmailLogin = await fetch(`http://localhost:4000/id/${countCheck}`, {
        method: 'GET',
    })
    const contentEmailLogin = await responceEmailLogin.json();



    contentEmailLogin.map(async a => {
        
        const response = await fetch(`http://localhost:4000/users/${a.id}/login`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login }),
        });
    })
    function timer() {
       
        setTimeout(function() {
      
          window.location.reload();
        }, 2000);
      }
      
    
      timer();
})