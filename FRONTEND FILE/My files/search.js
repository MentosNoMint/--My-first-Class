const formSearch = document.querySelector('.form-search')


formSearch.addEventListener('input', async (event) => {
    event.preventDefault();
    const formData = new FormData(formSearch);
    const file_name = formData.get('input-search')

    if (file_name != '') {
        let inputId = await fetch(`http://localhost:4000/name/files/${file_name}`, {
            method: 'get',
        })
        let contentInputId = await inputId.json();

        allFiles.innerHTML = ''


        setTimeout(function () {

            AllFilesSearch();
        }, 100);



        let animeText;
        async function AllFilesSearch() {
            contentInputId.map(async a => {

                if (a.file_format === 'text') {
                    animeText = 2
                }
                if (a.file_format === 'image') {
                    animeText = 4
                }
                if (a.file_format === 'zip') {
                    animeText = 1
                }
                if (a.korzina == 'no' || a.korzina == null) {
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
    } else {

        if (changeColorFile.style.color == 'red' || changeColorDelete.style.color == 'red' || changeColorPhoto.style.color == 'red') {
            window.location = window.location
        }
        let inputId = await fetch(`http://localhost:4000/CheckToken/${count}`, {
            method: 'get',
        })
        let contentInputId = await inputId.json();



        contentInputId.map(async idCheck => {
            allFiles.innerHTML = ''


            setTimeout(function () {

                AllFilesSearchNull()
            }, 100);


            let allFilesUser = await fetch(`http://localhost:4000/files/id/allinfo/${idCheck.id}`, {
                method: 'get'
            })

            let contentAllFilesUser = await allFilesUser.json();
            console.log(contentAllFilesUser)
            async function AllFilesSearchNull() {
                contentAllFilesUser.map(async a => {
                    let animeText;
                    if (a.file_format === 'text') {
                        animeText = 2
                    }
                    if (a.file_format === 'image') {
                        animeText = 4
                    }
                    if (a.file_format === 'zip') {
                        animeText = 1
                    }

                    if (a.korzina == 'no' || a.korzina == null) {
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
        })

    }


})


