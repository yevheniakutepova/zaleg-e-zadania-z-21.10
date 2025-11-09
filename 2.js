const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`To instrukcja do gry w ogien i wode</em>`);
});

app.get('/woda', (req, res) => {
    res.send(`Woda poruszasz sie za pomoca a w s d i skaczesz przyciskiem f `);
});

app.get('/ogien', (req, res) => {
    res.send(`Ogniem poruszasz sie za pomoca strzalek po prawej stronie i skaczesz spacja`);
});

const PORT = 1001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});