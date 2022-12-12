const express = require('express');
const dotenv = require('dotenv');
const cors = require ('cors');

dotenv.config({
    path: './config/.env'
});

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const initDBConnection = require('./config/db');
const hotelsRouter = require('./routes/hotels');

/*Mohamed Taha*/

const complainRouter = require('./routes/complain');
const reviewRouter = require('./routes/review');

app.use('/hotels', hotelsRouter);

/*Mohamed Taha*/

app.use('/complain', complainRouter);
app.use('/review', reviewRouter);




app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`);
    await initDBConnection();
});