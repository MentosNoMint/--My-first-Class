let localToken = localStorage.getItem('auth_token')
var tok = JSON.parse(localToken);
let count = tok
const form = document.querySelector('.My-form');
console.log(`Токен ${count}`)
const admins = document.querySelector('.admins-tools');
const textAdm = document.querySelector('.nick');

const loginList = document.querySelector('.login-profile-view');

const emailList = document.querySelector('.email-profile-view');

const list = document.querySelector('.nick')

async function CheckAdm() {
    let responceEmailLogin = await fetch(`http://localhost:4000/id/${count}`, {
        method: 'GET',
    })
    const contentEmailLogin = await responceEmailLogin.json();

    contentEmailLogin.map(async a => {
        let infornationAdm = await fetch(`http://localhost:4000/id/allinfo/${a.id}`, {
            method: 'GET',
        })

        const adm = await infornationAdm.json();
        adm.map(a => {
            list.innerHTML = `<span class="login-text-profile">${a.login}</span>`
            emailList.innerHTML = `<span class="text-change-profile">Почта:${a.email}</span>`
            loginList.innerHTML = `<span class="text-change-profile">Логин:${a.login}</span>`
            if (a.Admin === 1) {
                admins.style.display = 'flex';
                textAdm.style.color = "#FF0000";
            }
        })
    })
}
CheckAdm();

async function getResponce() {

    let numId = await fetch(`http://localhost:4000/CheckToken/${count}`, {
        method: 'GET',
    })
    const resId = await numId.json()


    resId.map(async a => {
        let UserInfo = await fetch(`http://localhost:4000/user/token/${a.id}`, {
            method: 'GET',
        })
        const resId = await UserInfo.json()

    })
}
getResponce()


if (count == null) {
    window.location.replace("/index.html");
}

form.addEventListener('submit', async (event) => {

    localStorage.removeItem('auth_token')


})