import cors from 'cors';
import express from 'express';

app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Hello World");
});

export {app};