
const bodyParser = require('body-parser')
const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('FileObmen.db')
const cors = require('cors');
const md5 = require('md5')
var jwt = require('jsonwebtoken');
const secret = 'users-auth'
const fs = require('fs');
const FTPClient = require('ftp');
const formidableMiddleware = require('express-formidable');
const ftp = require('ftp');





var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors());
const jsonParser = express.json()
const port = 4000;

app.listen(`${port}`, () => {
  console.log("Server is listening on port" + `${port}`);
});



app.post("/users/register", jsonParser, (req, res) => {
    const user = { email, login, password } = req.body;
    const createNewUser = () => {
      const token = jwt.sign({
        email: user.email
      }, secret, {
        expiresIn: 86400
      })
      db.run(`INSERT INTO users (login, password , email  , token) VALUES("${login}", "${md5(password)}" , "${email}", "${token}" )`)
    
      
  
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
    db.all(`SELECT  email , login , password , token FROM Users ` , (err, rows) => {
      res.json(rows)
    })
  })

  app.get('/CheckToken/:token', (req, res) => {
    const {token} = req.params
    db.all(`SELECT id FROM users WHERE token = ?`, [token] ,(err, rows) => {
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








  app.use(formidableMiddleware());

  // Загрузка файла на сервер с помощью FTP
  app.post('/upload', (req, res) => {
    // Создание нового FTP клиента
    const client = new FTPClient();
  
    // Настройки подключения FTP
    const ftpOptions = {
      host: 'j90903gn.beget.tech',
      user: 'j90903gn',
      password: '5ZJQXXWorNY4'
    };
  
    // Соединение с FTP сервером
    client.connect(ftpOptions);
  
    // Действия после подключения
    client.on('ready', () => {
      // Загрузка файла на сервер
      fs.readFile(req.files.file.path, (err, data) => {
        if (!err) {
          client.put(data, req.files.file.name, (err) => {
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
  
    // Обработка ошибок при подключении к FTP серверу
    client.on('error', (err) => {
      console.error('Ошибка при подключении к FTP серверу:', err);
      res.status(500).send('Ошибка при подключении к FTP серверу');
    });
  });
  
  app.get('/res', (req, res) => {
    // Создать нового экземпляра FTP клиента
    const client = new FTPClient();
  
    // Подключиться к FTP серверу
    client.connect({
      host: 'j90903gn.beget.tech',
      user: 'j90903gn',
      password: '5ZJQXXWorNY4'
    });
  
    // Обработка успешного подключения
    client.on('ready', () => {
      // Скачать файл
      client.get('don.txt', (err, stream) => {
        if (err) {
          // Обработка ошибки скачивания
          client.end();
          res.status(500).send('Ошибка при скачивании файла6768');
        } else {
          // Устанавливаем заголовки для скачивания файла
          res.setHeader('Content-Disposition', 'attachment; filename="don.txt"');
  
          // Передача потока файла клиенту
          stream.pipe(res);
  
          // Закрыть FTP соединение после завершения передачи файла
          stream.on('end', () => {
            client.end();
          });
        }
      });
    });
  
    // Обработка ошибки подключения к FTP серверу
    client.on('error', (err) => {
      res.status(500).send('Ошибка при подключении к FTP серверу');
    });
  });