const imgForm = document.querySelector('.form-add-btn')
const uploadButtonImg = document.getElementById('uploadButtonImg');
const fileInputImg = document.getElementById('fileInputImg');
imgForm.addEventListener('submit', async (event) => {
    event.preventDefault();




    if (fileInputImg.files.length > 0) {
        const fileImg = fileInputImg.files[0];
        const formData = new FormData();

        formData.append('fileImg', fileImg);

        console.log(fileImg)


        fetch('http://localhost:4000/upload/img', {
            method: 'POST',
            body: formData
        })
            .then(response => {


                return response.text();
            })
            .then(result => {
                console.log(result);

            })
            .catch(error => {
                console.error('Ошибка при загрузке файла:', error);
                alert('Ошибка при загрузке файла');
            })
            .finally(() => {
                window.location = window.location

            });

        let avatar_path = `http://j90903gn.beget.tech/${fileImg.name}`
        console.log(avatar_path)
        let checkIdForToken = await fetch(`http://localhost:4000/Checkid/token/${count}`, {
            method: 'GET'
        })
        const contentId = await checkIdForToken.json();

        contentId.map(async a => {
            console.log(a.id)
            await fetch(`http://localhost:4000/avatar/${a.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar_path }),
            });
        })

    }
})

fileInputImg.addEventListener('change', () => {
    if (fileInputImg.files.length > 0) {
        uploadButtonImg.click();
        fileInputImg.value = ''
    }
});