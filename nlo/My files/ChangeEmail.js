let localTokenCheck = localStorage.getItem('auth_token')
var tok = JSON.parse(localTokenCheck);
let countCheck = tok



const formEmail = document.querySelector('.my-form-change');




formEmail.addEventListener('submit', async (event) => {
    const formData = new FormData(formEmail);
    const email = formData.get('email-change')

    let responceEmailLogin = await fetch(`http://localhost:4000/id/${countCheck}`, {
        method: 'GET',
    })
    const contentEmailLogin = await responceEmailLogin.json();



    contentEmailLogin.map(async a => {
        const response = await fetch(`http://localhost:4000/users/${a.id}/email`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
    })
})




