// function initDragAndDrop() {
    
  
// const zoneMain = document.querySelector('.check-zone');
// const zoneDelete = document.querySelector('.delete-obj');
// const files = document.querySelectorAll('.randomTyan-file');
// const checkFile = document.querySelector('.randomTyan-file');

// zoneDelete.style.transform = "scale(0.8)";
// let current;


// let img = new Image();
// img.src = '/img/tyan-2.svg'




// function increaseElementSize() {

//     zoneDelete.style.transform = "scale(1)";
// }


// files.forEach(function (files) {
//     files.addEventListener('dragstart', function (event) {
//         current = this;
//         console.log(current)
//         event.dataTransfer.setDragImage(img, 10, 10);
//         zoneDelete.style.transition = "transform 0.5s ease";

//         increaseElementSize();

//     })
// })



// zoneDelete.addEventListener('dragover', function (event) {
//     event.preventDefault()
// })

// zoneDelete.addEventListener('drop', function (event) {
//     current.remove();
// })

// zoneMain.addEventListener('dragover', function (event) {
//     event.preventDefault()
    
// })

// zoneMain.addEventListener('drop', function (event) {
//     zoneDelete.style.background = 'none';
//     zoneDelete.style.transform = "scale(0.8)";
    
// }) 





//   zoneMain.addEventListener('click', function (event) {
//     let menu = document.getElementById("Menu");
//     menu.style.display = "none";
    
// }) 


// }

// initDragAndDrop()
// allFiles.addEventListener('DOMNodeInserted', () => {
//     initDragAndDrop();
//   });