const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    res.json(data);
});

app.get('/add', (req, res) => {
    res.send(`
        <form method="POST" action="/add">
            <label for="name">imie:</label>
            <input type="text" id="name" name="name">
            <label for="age">wiek:</label>
            <input type="number" id="age" name="age">
            <label for="password">haslo </label>
            <input type="password" id="password" name="password">
            <button type="submit">podtwierdz</button>
        </form>`);
});

app.post('/add', (req, res) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    if(req.body.age >= 18 && regex.test(req.body.password)) {
    const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
    data.push({id:data.length+1, ...req.body});
    fs.writeFileSync('data.json', JSON.stringify(data, null,4));
    res.send(`Zostalo dodane ${req.body.name}!
        <br><a href="/">wróc</a>
        <br><a href="/add">Dodaj</a>`);
    } else {
        res.send(`Muszisz byc pelnoletni albo utworz mocniejsze haslo`);
    }
});

const PORT = 1002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});