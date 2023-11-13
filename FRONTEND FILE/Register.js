const form = document.querySelector('#my-form');



form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email')
    const login = formData.get('login')
    const password = formData.get('password')

    let checkEmailLogin = false

    let responceEmailLogin = await fetch(`http://localhost:4000/check/email/login`, {
        method: 'GET',
    })
    const contentEmailLogin = await responceEmailLogin.json();

    console.log(contentEmailLogin)

    const list = document.querySelector('.error-register')


    contentEmailLogin.map(a => {

        if (a.email === email) {
            list.innerHTML = '<p class="error-txt">Почта занята</p>';
            return checkEmailLogin = true;
        }
        if (a.login === login) {
            list.innerHTML = '<p class="error-txt">Логин занят</p>';
            return checkEmailLogin = true;
        }
    });

    if (!email || !login || !password) {
        list.innerHTML = '<p class="error-txt">Укажите все данные</p>'
        return;
    }

    if (!isValidEmail(email)) {
        list.innerHTML = '<p class="error-txt">Неверный формат Эл.почты</p>';
        return;
    }

    if (!isStrongPassword(password)) {
        list.innerHTML = '<p class="error-txt">Слабый пароль</p>';
        return;
    }

    if (login.includes(' ')) {
        list.innerHTML = '<p class="error-txt">Укажите все данные</p>'
        return;
    }

    if (!checkEmailLogin) {
        fetch('http://localhost:4000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, login, password }),
        });


        window.location.replace("/index.html");
    }




    function isValidEmail(email) {
        let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }

    function isStrongPassword(password) {
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    }

})








