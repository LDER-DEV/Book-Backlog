const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = 'mongodb+srv://ludjydev:lSpwzCoEl3UYWQSn@cluster0.esdycxh.mongodb.net/personalExpress?retryWrites=true&w=majority';
const dbName = "personalExpress";

app.listen(9900, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {books: result})
  })
})


app.post('/books', (req, res) => {
  db.collection('books').insertOne({name: req.body.name, author: req.body.author, notes: req.body.notes, score: req.body.score}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
app.put('/books/check', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({ name: req.body.name, author: req.body.author,score: req.body.score}, {
    $set: {
      notes: req.body.notes
    }
  },
  {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result);
  })
})

app.delete('/books', (req, res) => {
  db.collection('books').findOneAndDelete({name: req.body.name, author: req.body.author}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

