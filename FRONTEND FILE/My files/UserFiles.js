
const allFiles = document.querySelector('.files-main')

const publicFiles = document.querySelector('.info-Content')

const changeColorDelete = document.querySelector('.delete-text')

const changeColorPhoto = document.querySelector('.text-photo')

const changeColorFile = document.querySelector('.btn-photo-file')

let menu = document.getElementById("Menu");

let menuHeal = document.getElementById("menu-heal");



async function MainFilesUser() {

    let checkId = await fetch(`http://localhost:4000/id/${count}`, {
        method: 'GET',
    })
    const contentId = await checkId.json();
    contentId.map(async a => {
        let allinfo = await fetch(`http://localhost:4000/files/id/allinfo/${a.id}`, {
            method: 'GET',
        })
        const allContentAllInfoFile = await allinfo.json();


        let IdMassive = []
        for (i = 0; i < allContentAllInfoFile.length; i++) {

            IdMassive.push(allContentAllInfoFile[i]['id'])

        }
        console.log(IdMassive)

        for (i = 0; i < allContentAllInfoFile.length; i++) {
            let allInfoOtId = await fetch(`http://localhost:4000/files/id/allinfo/id/${IdMassive[i]}`, {
                method: 'GET',
            })
            const ContentallInfoOtId = await allInfoOtId.json();


            let animeText;

           
            ContentallInfoOtId.map(a => {


                if (a.file_format === 'text') {
                    animeText = 2
                }
                if (a.file_format === 'image') {
                    animeText = 4
                }
                if (a.file_format === 'zip') {
                    animeText = 1
                }

                let korzina = 'no';

                function changeKorzina() {
                    changeColorDelete.style.color = 'red';
                    changeColorPhoto.style.color = 'white';
                    changeColorFile.style.color = 'white';
                    let korzina = 'yes';

                    if (a.korzina == korzina) {
                        allFiles.innerHTML +=
                            `
        <div class="randomTyan-file" id="${a.id}">
        <img src="/img/tyan-element-${animeText}.svg" alt="Tyan" class="all-files-tyan${animeText}" id="${a.id}">
            <div class="nameAndFile" id="${a.id}">
            <div class="blockfile" draggable="true">
                <div class="otherfile" id="${a.id}">
                <img src="/img/other${a.file_format}.svg" alt="" class="photo-red" id="${a.id}">
                </div>
            </div>
           
            <div class="text-file-box" id="${a.id}">
               <div class="rename-text${a.id}"id="${a.id}">
                <span class="text-file-name">${a.file_name}</span>
               </div>
            </div>
         </div>
        </div>
             `


                        contextMenuHeal()
                    }
                }

                async function contextMenuHeal() {
                    document.addEventListener('contextmenu', async function (e) {



                        let targetElement = e.target;

                        let current = targetElement.id;
                        if (targetElement.className == 'otherfile' || targetElement.className == 'photo-red' || targetElement.className == 'menu') {

                            e.preventDefault();
                            menu.style.display = 'none';

                            menuHeal.style.display = "flex";
                            menuHeal.style.position = "absolute";
                            menuHeal.style.left = e.pageX + "px";
                            menuHeal.style.top = e.pageY + "px";
                        } else {
                            e.preventDefault();

                            menuHeal.style.display = "none";
                        }
                        let allinfo = await fetch(`http://localhost:4000/files/id/allinfo/id/${current}`, {
                            method: 'GET',
                        })
                        const allContentAllInfoFile = await allinfo.json();
                        console.log(allContentAllInfoFile)

                        document.getElementById("heal-btn-count").addEventListener("click", async function () {
                            let korzina = 'no'

                            let result = current
                            await fetch(`http://localhost:4000/users/${result}/korzina`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ korzina }),
                            });
                            window.location = window.location
                        });


                    })
                }
              
                function changePhoto() {
                    if (a.file_format == 'image' && a.korzina == 'no' || a.korzina == null && a.file_format == 'image') {

                        changeColorDelete.style.color = 'white';
                        changeColorPhoto.style.color = 'red';
                        changeColorFile.style.color = 'white';
                        allFiles.innerHTML +=
                            `
        <div class="randomTyan-file" id="${a.id}">
        <img src="/img/tyan-element-${animeText}.svg" alt="Tyan" class="all-files-tyan${animeText}" id="${a.id}">
            <div class="nameAndFile" id="${a.id}">
            <div class="blockfile" draggable="true">
                <div class="otherfile" id="${a.id}">
                <img src="/img/other${a.file_format}.svg" alt="" class="photo-red" id="${a.id}">
                </div>
            </div>
           
            <div class="text-file-box" id="${a.id}">
               <div class="rename-text${a.id}"id="${a.id}">
                <span class="text-file-name">${a.file_name}</span>
               </div>
            </div>
         </div>
        </div>
             `
             contextmenu()
                        
                        menuHeal.style.display = 'none';

                    }
                }

                function changeFile() {
                    changeColorDelete.style.color = 'white';
                    changeColorPhoto.style.color = 'white';
                    changeColorFile.style.color = 'red';
                    if (a.file_format == 'zip' && a.korzina == 'no' || a.file_format == 'zip' && a.korzina == null || a.file_format == 'text' && a.korzina == 'no' || a.file_format == 'text' && a.korzina == null) {
                        allFiles.innerHTML += `
        <div class="randomTyan-file" id="${a.id}">
        <img src="/img/tyan-element-${animeText}.svg" alt="Tyan" class="all-files-tyan${animeText}" id="${a.id}">
            <div class="nameAndFile" id="${a.id}">
            <div class="blockfile" draggable="true">
                <div class="otherfile" id="${a.id}">
                <img src="/img/other${a.file_format}.svg" alt="" class="photo-red" id="${a.id}">
                </div>
            </div>
           
            <div class="text-file-box" id="${a.id}">
               <div class="rename-text${a.id}"id="${a.id}">
                <span class="text-file-name">${a.file_name}</span>
               </div>
            </div>
         </div>
        </div>
             `
             contextmenu()

                        menuHeal.style.display = 'none';
                    }
                }


                document.querySelector('.btn-return-variant').addEventListener('click', () => {
                    window.location = window.location
                })

                document.getElementById('btn-delete-variant').addEventListener('click', () => {
                    allFiles.innerHTML = ''

                    setTimeout(function () {

                        changeKorzina()
                    }, 100);
                })


                document.querySelector('.btn-photo').addEventListener('click', () => {
                    allFiles.innerHTML = ''

                    setTimeout(function () {

                        changePhoto();
                    }, 100);
                })


                document.querySelector('.files-variant-btn').addEventListener('click', () => {
                    allFiles.innerHTML = ''
                    setTimeout(function () {

                        changeFile();
                    }, 100);
                })
                a.file_name = a.file_name.length > 15 ? a.file_name.slice(0, 15) + "..." : a.file_name;



                if (a.korzina == korzina || a.korzina == null) {


                    allFiles.innerHTML +=
                        `
            <div class="randomTyan-file" id="${a.id}">
            <img src="/img/tyan-element-${animeText}.svg" alt="Tyan" class="all-files-tyan${animeText}" id="${a.id}">
                <div class="nameAndFile" id="${a.id}">
                <div class="blockfile" draggable="true">
                    <div class="otherfile" id="${a.id}">
                    <img src="/img/other${a.file_format}.svg" alt="" class="photo-red" id="${a.id}">
                    </div>
                </div>
               
                <div class="text-file-box" id="${a.id}">
                   <div class="rename-text${a.id}"id="${a.id}">
                    <span class="text-file-name">${a.file_name}</span>
                   </div>
                </div>
             </div>
            </div>
                 `
                   
                }

            })

        }

        async function contextmenu() {

            document.addEventListener('contextmenu', async function (e) {



                let targetElement = e.target;

                let current = targetElement.id;




                document.getElementById("delete-btn-count").addEventListener("click", async function (e) {

                    let korzina = 'yes'

                    let result = current
                    await fetch(`http://localhost:4000/users/${result}/korzina`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ korzina }),
                    });
                    window.location = window.location

                });






                if (targetElement.className == 'otherfile' || targetElement.className == 'photo-red' || targetElement.className == 'menu') {

                    e.preventDefault();
                    menu.style.display = "flex";
                    menu.style.position = "absolute";
                    menu.style.left = e.pageX + "px";
                    menu.style.top = e.pageY + "px";
                }
                let allinfo = await fetch(`http://localhost:4000/files/id/allinfo/id/${current}`, {
                    method: 'GET',
                })
                const allContentAllInfoFile = await allinfo.json();



                document.getElementById("rename-btn-count").addEventListener("click", async function () {


                    let id = targetElement.id




                    for (i = 0; i < allContentAllInfoFile.length; i++) {
                        let allInfoOtId = await fetch(`http://localhost:4000/files/id/allinfo/id/${targetElement.id}`, {
                            method: 'GET',
                        })
                        const ContentallInfoOtId = await allInfoOtId.json();








                        ContentallInfoOtId.map(async a => {

                            let renameText = document.querySelector(`.rename-text${a.id}`)

                            renameText.innerHTML = `
                                <form class="form-rename" id="form-rename">
                                    <label class="rename-file">
                                        <input type="text" name="rename-file" id="rename-file" placeholder="${a.file_name}" class="text-file-name">
                                    </label>
                                </form>
                            `;

                            const formRename = document.querySelector('#form-rename');

                            formRename.addEventListener('submit', async (event) => {


                                const formData = new FormData(formRename);
                                const file_name = formData.get('rename-file');

                                await fetch(`http://localhost:4000/rename/${targetElement.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ file_name }),
                                });
                            });

                        })
                    }

                });

                console.log(allContentAllInfoFile)
                allContentAllInfoFile.map(a => {
                    document.getElementById("download-btn-count").addEventListener("click", function () {
                        window.location.href = a.file_path;
                    });
                })
                console.log(`ЭТОООО ${targetElement.id}`)


                allContentAllInfoFile.map(a => {
                    document.getElementById("share-btn-count").addEventListener("click", async function () {

                        let mdFive = targetElement.id

                        console.log(mdFive)
                        await fetch(`http://localhost:4000/mdfive/${targetElement.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ mdFive }),
                        });

                        url = `http://localhost:4000/fileId/${a.mdFive}`

                        if (a.mdFive == null) {
                            window.location = window.location
                            alert('Создаётся ссылка , страница будет перезагружена')
                        } else {
                            window.open(url)
                            window.location = window.location
                        }



                    });
                })
            });
        }







        async function initDragAndDrop() {


            const zoneMain = document.querySelector('.check-zone');
            const zoneDelete = document.querySelector('.delete-obj');
            const files = document.querySelectorAll('.randomTyan-file');
            const checkFile = document.querySelector('.randomTyan-file');

            zoneDelete.style.transform = "scale(0.8)";
            let current;


            let img = new Image();
            img.src = '/img/tyan-2.svg'




            function increaseElementSize() {

                zoneDelete.style.transform = "scale(1)";
            }


            files.forEach(function (files) {
                files.addEventListener('dragstart', function (event) {
                    current = this;
                    event.dataTransfer.setDragImage(img, 10, 10);
                    zoneDelete.style.transition = "transform 0.5s ease";

                    increaseElementSize();

                })
            })



            zoneDelete.addEventListener('dragover', function (event) {
                event.preventDefault()
            })




            zoneDelete.addEventListener('drop', async function (event) {


                let korzina = 'yes'

                let result = current.id
                await fetch(`http://localhost:4000/users/${result}/korzina`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ korzina }),
                });
                window.location = window.location
            })

            zoneMain.addEventListener('dragover', function (event) {
                event.preventDefault()

            })

            zoneMain.addEventListener('drop', function (event) {
                zoneDelete.style.background = 'none';
                zoneDelete.style.transform = "scale(0.8)";

            })





            zoneMain.addEventListener('click', function (event) {
             
                menu.style.display = "none";
                menuHeal.style.display = "none";
            })


        }

        initDragAndDrop()
        allFiles.addEventListener('DOMNodeInserted', () => {
            initDragAndDrop();

        });





        contextmenu()
    })


   

}




MainFilesUser()


