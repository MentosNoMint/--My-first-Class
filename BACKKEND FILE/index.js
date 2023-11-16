
const bodyParser = require('body-parser')
const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('FileObmen.db')
const cors = require('cors');
const md5 = require('md5')
var jwt = require('jsonwebtoken');
const secret = 'users-auth'
const fs = require('fs');
const formidableMiddleware = require('express-formidable');
const ftp = require('ftp');




var app = express();

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())
const jsonParser = express.json()
const port = 4000;

app.listen(`${port}`, () => {
  console.log("Server is listening on port" + `${port}`);
});


app.use(express.static('public'));
app.get(`/fileId/:id`, (req, res) => {

  async function Allinfo() {


    const passFile = req.params.id


    let CheckIdFromMd5 = await fetch(`http://localhost:4000/CheckId/${passFile}`, {
      method: 'GET',
    })
    const ContentCheckIdFromMd5 = await CheckIdFromMd5.json();


    ContentCheckIdFromMd5.map(async a => {





      const html = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet">
      <link rel="stylesheet" href="/style.css">
      <title>Public Files</title>
  </head>
  
  <body>
      <main>
  
          <div class="wrapper">
              <div class="nameFile">
                  <span class="name-file-span">${a.file_name}</span>
              </div>
  
              <div class="main-content">
                  <div class="img-table-girl">
  
                  </div>
                  <div class="info-Content">
                      <div class="size-file">
                          <span class="text-info-Content">Размер файла: ${a.file_size}</span>
                      </div>
                      <div class="count-download-file">
                          <span class="text-info-Content">Количество скачиваний: ${a.count_Download}</span>
                      </div>
                      <img src="/img/download-link-girl.svg" alt="girl" class="download-link-girl">
                  </div>
              </div>
  
              <div class="footer-content" id="footer-con">
                  <!-- <a href="http://j90903gn.beget.tech/1234567890.zip" download>Скачать файл</a>
                      <button class="download-btn" id="download-btn">
                          <img src="/img/download-link-btn.svg" alt="">
                      </button>
                  
                  <a href="/index.html" class="main-page-text">Главная Страница</a> -->
              </div>
  
          </div>
      </main>
     

     
  </body>

  <script src="/OpenFiles.js"></script>
  </html>`;


      res.send(html);


    })
  }

  Allinfo()
});



app.post("/users/register", jsonParser, (req, res) => {
  const user = { email, login, password, avatar_path } = req.body;
  const createNewUser = () => {
    const token = jwt.sign({
      email: user.email
    }, secret, {
      expiresIn: 86400
    })
    db.run(`INSERT INTO users (login, password , email  , token , avatar_path) VALUES("${login}", "${md5(password)}" , "${email}", "${token}", "${avatar_path}" )`)



    db.get(`SELECT * FROM users WHERE login = "${login}"`, (err, data) => {
      res.status(201).json({
        data: {
          user: data,
          token
        }
      })
    })
  }





  db.get(`SELECT * FROM users WHERE email = "${email}"`, (err, data) => {
    if (err) {
      console.log('error: '.err)
    }
    if (data) {
      return res.status(409).json({
        error: "Пользователь с такой почтой уже существует"
      })
    }

    createNewUser()
  })
})


app.get('/check/email/login', (req, res) => {
  db.all(`SELECT  email , login , password , token FROM Users `, (err, rows) => {
    res.json(rows)
  })
})

app.get('/CheckToken/:token', (req, res) => {
  const { token } = req.params
  db.all(`SELECT id FROM users WHERE token = ?`, [token], (err, rows) => {
    res.json(rows)
  })
})

app.get('/user/token/:id', (req, res) => {
  const Id = req.params.id;

  db.all(`SELECT * FROM users WHERE id = ?`, Id, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});

app.post('/users/login', async (req, res) => {
  const user = { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${md5(password)}'`;

  // запрос к бд по логину
  db.get(sql, (err, row) => {
    if (err) {
      console.log(err.message);
      res.status(500).send('Ошибка входа.');
    } else if (row === undefined) {
      res.status(401).send('Неверная почта или пароль.'); //
    } else {
      const token = jwt.sign({
        email: user.email
      }, secret, {
        expiresIn: 86000
      })
      return res.json({
        data: {
          user,
          token
        }
      })

    }
  });
});



app.get('/users/:login', (req, res) => {
  const login = req.params.login;

  db.all(`SELECT token FROM users WHERE login = ?`, login, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});

app.get('/id/:token', (req, res) => {
  const token = req.params.token;

  db.all(`SELECT id FROM users WHERE token = ?`, token, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});


app.put('/rename/:id/', (req, res) => {
  const { id } = req.params;
  const { file_name } = req.body;

  db.run(`UPDATE Fukes SET file_name = ? WHERE id = ?`, [file_name, id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.put('/avatar/:id', (req, res) => {
  const { id } = req.params;
  const { avatar_path } = req.body;

  db.run(`UPDATE Users SET avatar_path = ? WHERE id = ?`, [avatar_path, id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/id/allinfo/:id', (req, res) => {
  const id = req.params.id;

  db.all(`SELECT * FROM users WHERE id = ?`, id, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});


app.get('/Checkid/token/:token', (req, res) => {
  const token = req.params.token;

  db.all(`SELECT * FROM Users WHERE token = ?`, token, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});


app.post('/login/checkpassword', (req, res) => {
  const login = req.body.login;
  const password = md5(req.body.password);

  db.get('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], (err, row) => {
    if (err || !row) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});


app.put('/users/:id/email', (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  db.run(`UPDATE Users SET email = ? WHERE id = ?`, [email, id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/users/:id/login', (req, res) => {
  const { id } = req.params;
  const { login } = req.body;

  db.run(`UPDATE Users SET login = ? WHERE id = ?`, [login, id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.put('/users/:id/korzina', (req, res) => {
  const { id } = req.params;
  const { korzina } = req.body;

  db.run(`UPDATE Fukes SET korzina = ? WHERE id = ?`, [korzina, id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/mdfive/:id', (req, res) => {
  const { id } = req.params;
  const { mdFive } = req.body;

  db.run(`UPDATE Fukes SET mdFive = ? WHERE id = ?`, [md5(mdFive), id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/files/:id/count_Download', (req, res) => {
  const { id } = req.params;
  const { count_Download } = req.body;

  db.run(`UPDATE Fukes SET count_Download = ? WHERE id = ?`, [count_Download, id], err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.get('/name/files/:nameFile', (req, res) => {
  const nameFile = req.params.nameFile

  db.all(`SELECT * from Fukes WHERE file_name LIKE '%' || ? || '%'`, nameFile, (err, row) => {

    if (err) {
      res.status(500).send()
      return;
    }
    res.send(row);
  })
})

app.get('/files/id/allinfo/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  db.all(`SELECT * FROM Fukes WHERE user_id = ?`, user_id, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});

app.get('/files/id/allinfo/id/:id', (req, res) => {
  const id = req.params.id;

  db.all(`SELECT * FROM Fukes WHERE id = ?`, id, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});

app.get('/CheckId/:mdfive', (req, res) => {
  const mdFive = req.params.mdfive;

  db.all(`SELECT * FROM Fukes WHERE mdFive = ?`, mdFive, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.send(row);
  });
});


app.post('/loading/files', (req, res) => {
  const { user_id, file_name, file_path, file_format, count_Download, file_size } = req.body;

  db.run(`INSERT INTO Fukes (user_id, file_name , file_path ,  file_format , count_Download , file_size ) VALUES("${user_id}", "${file_name}" , "${file_path}", "${file_format}" , "${count_Download}", "${file_size}")`)

  res.send({
    user_id,
    file_name,
    file_path,
    file_format,
    count_Download,
    file_size
  });
});


app.post('/loading/files/exe', (req, res) => {
  const { user_id, file_name, file_path, file_format, count_Download, file_size } = req.body;

  db.run(`INSERT INTO Fukes (user_id, file_name , file_path ,  file_format , count_Download , file_size ) VALUES("${user_id}", "${file_name}" , "${file_path}", "${file_format}" , "${count_Download}", "${file_size}")`)

  res.send({
    user_id,
    file_name,
    file_path,
    file_format,
    count_Download,
    file_size
  });
});




app.use(formidableMiddleware());


app.post('/upload', (req, res) => {

  const client = new ftp();


  const ftpOptions = {
    host: 'j90903gn.beget.tech',
    user: 'j90903gn',
    password: '5ZJQXXWorNY4'
  };


  client.connect(ftpOptions);


  client.on('ready', () => {

    fs.readFile(req.files.file.path, (err, data) => {
      if (!err) {
        client.put(data, '/j90903gn.beget.tech/public_html/' + req.files.file.name, (err) => {
          if (!err) {
            console.log('Файл успешно загружен на FTP сервер');
            res.send('Файл успешно загружен на FTP сервер');
          } else {
            console.error('Ошибка при загрузке файла на FTP сервер:', err);
            res.status(500).send('Ошибка при загрузке файла на FTP сервер');
          }
        });
      } else {
        console.error('Ошибка при чтении файла:', err);
        res.status(500).send('Ошибка при чтении файла');
      }
    });
  });


  client.on('error', (err) => {
    console.error('Ошибка при подключении к FTP серверу:', err);
    res.status(500).send('Ошибка при подключении к FTP серверу');
  });
});





app.post('/upload/img', (req, res) => {

  const client = new ftp();


  const ftpOptions = {
    host: 'j90903gn.beget.tech',
    user: 'j90903gn',
    password: '5ZJQXXWorNY4'
  };


  client.connect(ftpOptions);


  client.on('ready', () => {

    fs.readFile(req.files.fileImg.path, (err, data) => {
      if (!err) {
        client.put(data, '/j90903gn.beget.tech/public_html/' + req.files.fileImg.name, (err) => {
          if (!err) {
            console.log('Файл успешно загружен на FTP сервер');
            res.send('Файл успешно загружен на FTP сервер');
          } else {
            console.error('Ошибка при загрузке файла на FTP сервер:', err);
            res.status(500).send('Ошибка при загрузке файла на FTP сервер');
          }
        });
      } else {
        console.error('Ошибка при чтении файла:', err);
        res.status(500).send('Ошибка при чтении файла');
      }
    });
  });


  client.on('error', (err) => {
    console.error('Ошибка при подключении к FTP серверу:', err);
    res.status(500).send('Ошибка при подключении к FTP серверу');
  });
});


