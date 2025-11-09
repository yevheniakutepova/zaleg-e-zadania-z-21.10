const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res) => {
    res.send(`<br><a href="/arty">Pokaż</a>
        <br><a href="/add">Dodaj</a>`);
});

app.get('/add', (req, res) => {
    res.send(`
        <form method="POST" action="/add">
            <label for="title">Tytuł:</label>
            <input type="text" id="title" name="title">
            <label for="description">Opis:</label>
            <textarea id="description" name="description"></textarea>
            <button type="submit">Gotowe</button>
        </form>`);
});

app.post('/add', (req, res) => {
    const article = JSON.parse(fs.readFileSync('articles.json','utf-8'));
    article.push({id:article.length+1, ...req.body});
    fs.writeFileSync('articles.json', JSON.stringify(article, null,4));
    res.send(`Dodane ${req.body.title}!
        <br><a href="/">Wróć</a>
        <br><a href="/add">dodaj</a>`);
});

app.get('/arty', (req, res) => {
    const articles = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
    res.json(articles);
});

app.get('/arty/:title', (req, res) => {
    const data = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
    const title = req.params.title;
    const article = data.find(articles => articles.title == title);
    res.json(article);
});

const PORT = 1003;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});