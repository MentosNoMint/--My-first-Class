const divElement = document.getElementById('target'); 

function fadeOutAndIn() {
  divElement.style.opacity = '0'; 
  setTimeout(() => {
    divElement.style.opacity = '1'; 
  }, 50);
}


setInterval(fadeOutAndIn, 3000); 


const divElement2 = document.getElementById('target2'); 

function fadeOutAndIn2() {
  divElement2.style.opacity = '0'; 
  setTimeout(() => {
    divElement2.style.opacity = '1';
  }, 50);
}


setInterval(fadeOutAndIn2, 2000); 

const divElement3 = document.getElementById('target3'); 

function fadeOutAndIn3() {
  divElement3.style.opacity = '0'; 
  setTimeout(() => {
    divElement3.style.opacity = '1'; 
  }, 50);
}


setInterval(fadeOutAndIn3, 5000); 



let start = Date.now();

const ufo = document.getElementById('nlo');
let direction = 1;
let position = 0;

function moveUFO() {
    let timePassed = Date.now() - start;
    position += direction;
    ufo.style.left = position + 'px';

    if (timePassed >= 2000) {
        direction *= -1;
        
    }
}

setInterval(moveUFO, 250); 