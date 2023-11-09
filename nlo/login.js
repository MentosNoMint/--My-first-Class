const loginform = document.querySelector('#my-form-login');


const list1 = document.querySelector('.error-login')

loginform.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData1 = new FormData(loginform);
    const login = formData1.get('login-log')
    const password = formData1.get('password-log')


    let responceEmailLogin = await fetch(`http://localhost:4000/check/email/login`, {
        method: 'GET',
    })
    const contentEmailLogin = await responceEmailLogin.json();
    contentEmailLogin.map(a => {
        console.log(contentEmailLogin)
        console.log(login, password)

        async function CheckPassword(login, password) {
            let checkPassword;
            await fetch(`http://localhost:4000/login/checkpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            })
                .then(response => response.json())
                .then(result => {
                    console.log(checkPassword = result);
                })
       
            if (a.login === login && checkPassword) {

                let inportToken = await fetch(`http://localhost:4000/users/${login}`, {
                    method: 'GET',
                })

                const contentInportToken = await inportToken.json();

                contentInportToken.map(a => {
                    localStorage.setItem("auth_token", `"${a.token}"`)
                    console.log(localStorage.getItem('auth_token'))

                    window.location.replace("My files/Myfiles.html");
                })

            } else {
                list1.innerHTML = '<p class="error-txt">Неверная почта или пароль</p>';
            }
        }
        CheckPassword(login , password)
      
    })

})

