require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require("./db")

const PORT = process.env.PORT || 3000;
// app.use(cors())
app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send({ "msg": "Hi from shubham shah server" });
});

app.get("/api/log/get", async (req, res) => {
  if (req.method === "GET") {
    try {
      let data = await db.get(req.body._id)
      res.send(data)
    } catch (err) {
      res.send(err)
    }
  } else {
    res.send({ msg: "Bad request" })
  }
});

app.get("/api/log/getAll", async (req, res) => {
  if (req.method === "GET") {
    try {
      let data = await db.getAll()
      res.send(data)
    } catch (err) {
      res.send(err)
    }
  } else {
    res.send({ msg: "Bad request" })
  }
});

app.post("/api/log/post", async (req, res) => {
  if (req.method === "POST") {
    if (req.body._id) {
      db.create(req.body).then(data => {
        res.send(data)
      }).catch(err => {
        res.send({ err })
      })
    } else {
      res.send({ msg: "Id must required" })
    }
  } else {
    res.send({ msg: "Bad request" })
  }
})

app.delete("/api/log/del/:id", async (req, res) => {
  if (req.method === "DELETE") {
    let id = req.params.id
    if (id) {
      if (id === "*") {
        res.send({ msg: "Deleted all data" })
      } else {
        db.get(id)
          .then((doc) => db.remove(doc))
          .then(() => res.send('Document deleted successfully.'))
          .catch((err) => res.status(404).send('Document not found.'));
      }
    } else {
      res.send({ msg: "Id must required" })
    }
  } else {
    res.send({ msg: "Bad request" })
  }
})

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully.');
});

app.get('/download/:fileName', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.fileName);
  res.download(file);
});

app.listen(PORT, () => {
  console.log(`https://api.shubham1888.repl.co:${PORT}`);
});

