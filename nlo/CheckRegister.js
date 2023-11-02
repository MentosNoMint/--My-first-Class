
let para = document.getElementById("reg-box")

let abyssBlack = document.getElementById("modal-wrapper")



document.getElementById("load-btn").addEventListener("click", function () {



    let isAuthenticated = false;


    if (!isAuthenticated) {

        
   
        para.style.display = 'flex';
        para.classList.add('visible');
        abyssBlack.style.display = 'flex';
    }
});


