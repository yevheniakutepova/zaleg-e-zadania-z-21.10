const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res) => {
    const jedzenie = JSON.parse(fs.readFileSync('owoce.json', 'utf-8'));
    const type = req.query.type || 'Unknown';
    if(type == "owoce") {
        res.end(JSON.stringify(jedzenie.owoce));
    } else if(type == "warzywa") {
        res.end(JSON.stringify(jedzenie.warzywa));
    } else {
        res.end(JSON.stringify(jedzenie));
    }
});

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});