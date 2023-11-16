
const uploadForm = document.getElementById('uploadForm');
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');


const loadingSpinner = document.getElementById('loading-spinner');


uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();


  loadingSpinner.style.display = 'block';
  if (fileInput.files.length > 0) {

    const file = fileInput.files[0];
    const formData = new FormData();

    formData.append('file', file);



  

    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {


        return response.text();
      })
      .then(result => {


      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
        alert('Ошибка при загрузке файла');
      })
      .finally(() => {

        loadingSpinner.style.display = 'none';
        window.location = window.location
      });


    let checkId = await fetch(`http://localhost:4000/id/${count}`, {
      method: 'GET',
    })
    const contentId = await checkId.json();
    let file_size;
    let count_Download = 0;
    let file_format;
    let file_path;
    let file_name;
    let user_id;




    contentId.map(a => {
      return user_id = a.id
    })


    file_name = file.name
    file_path = `http://j90903gn.beget.tech/${file_name}`
    file_format = file.type
    file_size = file.size


    if (file_name.includes(".rar") || file_name.includes(".zip")) {
      file_format = 'zip'
    }
    console.log(file)




    if (file_format === 'text/plain') {
      file_format = 'text'
    }

    if (file_format === 'image/png' || file_format === 'image/jpeg') {
      file_format = 'image'
    }


    let fileSizeInKb = file_size / 1024; // размер файла в килобайтах


    let fileSizeInMb


    if (fileSizeInKb >= 1024) {
      fileSizeInMb = fileSizeInKb / 1024; // размер файла в мегабайтах
      file_size = fileSizeInMb
      file_size = Math.round(file_size) + "mb"
    } else {
      file_size = fileSizeInKb
      file_size = Math.round(file_size) + "kb"
    }






    fetch('http://localhost:4000/loading/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, file_name, file_path, file_format, count_Download, file_size }),
    });


  }

});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    uploadButton.click();
    fileInput.value = ''
  }
});