let load = document.querySelector('.footer-content');


async function Allinfo() {
    let url = window.location.href;
    let parts = url.split('/');
    let fileId = parts.pop();

    let arr = [];

    arr.push(fileId);





    let CheckIdFromMd5 = await fetch(`http://localhost:4000/CheckId/${arr}`, {
        method: 'GET',
    })
    const ContentCheckIdFromMd5 = await CheckIdFromMd5.json();

    ContentCheckIdFromMd5.map(async a => {
        let allInfoOtId = await fetch(`http://localhost:4000/files/id/allinfo/id/${a.id}`, {
            method: 'GET',
        })
        const ContentallInfoOtId = await allInfoOtId.json();
        ContentallInfoOtId.map(a => {
            let href = `${a.file_path}`

            load.innerHTML = `<a href="${href}" download id="a-download">  
<button class="download-btn" id="download-btn">
    <img src="/img/download-link-btn.svg" alt="">
</button>
</a>
<a href="/index.html" class="main-page-text">Главная Страница</a>`

let count_Download = a.count_Download + 1

console.log(count_Download)
document.getElementById("a-download").addEventListener("click", async function () {
    await fetch(`http://localhost:4000/files/${a.id}/count_Download`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count_Download }),
    });
});
        })
    })


  

}

Allinfo()