import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
const app = express();

// fetch port from env
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
    });
app.all('*', (req, res) => {    
    res.send('the route does not exist!')
    });
    app.listen(port, '0.0.0.0',() => {
    console.log(`Example app listening at http://localhost:${port}`)
    });