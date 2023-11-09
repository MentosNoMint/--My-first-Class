let localToken = localStorage.getItem('auth_token')
var tok = JSON.parse(localToken);
let count = tok
console.log(count)
let para = document.getElementById("reg-box")

let abyssBlack = document.getElementById("modal-wrapper")

let login = document.getElementById("login-box")

let form1 = document.getElementById("reg-form")


document.getElementById("load-btn").addEventListener("click", function () {

    let isAuthenticated
if(count != null){
     isAuthenticated = true 
     window.location.replace("My files/Myfiles.html");
}else{
    isAuthenticated = false
}
  


    if (!isAuthenticated) {



        para.style.display = 'flex';
        para.classList.add('visible');
        abyssBlack.style.display = 'flex';

    }

});



document.getElementById("btn-login").addEventListener("click", function () {



    let isAuthenticated = false;


    if (!isAuthenticated) {

        form1.style.marginTop = '120px';
        login.style.display = 'flex';
        para.style.display = 'none';
        para.classList.add('visible');
        abyssBlack.style.display = 'flex';
    }
});

