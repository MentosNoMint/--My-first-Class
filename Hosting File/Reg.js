const form = document.querySelector('#my-form');


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email')
    const login = formData.get('login')
    const password = formData.get('password')
    
    fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, login, password }),
    });
});

