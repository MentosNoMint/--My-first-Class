let para = document.getElementById("Profile-box")

let abyssBlack = document.getElementById("modal-wrapper")

let changeEmail = document.getElementById("put-login-email-box")

let btnChangeLogin = document.getElementById("btn-email-profile")

let changePassword = document.getElementById("put-login-password-box")

document.getElementById("load-btn").addEventListener("click", function () {



    let isAuthenticated = false;


    if (!isAuthenticated) {



        para.style.display = 'flex';
        para.classList.add('visible');
        abyssBlack.style.display = 'flex';
    }
});


document.getElementById("btn-email-profile").addEventListener("click", function () {



    let isAuthenticated = false;


    if (!isAuthenticated) {

       
        para.style.display = 'none';
        changeEmail.style.display = 'flex';
        changeEmail.classList.add('visible');
      
    }
});


document.getElementById("btn-password-profile").addEventListener("click", function () {



    let isAuthenticated = false;


    if (!isAuthenticated) {

       
        para.style.display = 'none';
        changePassword.style.display = 'flex';
        changePassword.classList.add('visible');
      
    }
});