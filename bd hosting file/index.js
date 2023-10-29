const bodyParser = require('body-parser')
const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('FileObmen.db')
const cors = require('cors');
const md5 = require('md5')
var jwt = require('jsonwebtoken');
const secret = 'users-auth'


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