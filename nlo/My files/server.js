fetch('http://localhost:4000/image')
  .then(response => {
    if (response.ok) {
      return response.blob();
    } else {
      throw new Error('Ошибка при загрузке изображения');
    }
  })
  .then(blob => {
    const url = URL.createObjectURL(blob);
    // Вставь изображение на страницу
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error(error);
  });
