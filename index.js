const express = require("express");
const logger = require('morgan');
const cors = require("cors");
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

const apiRouter = require('./routes');

const app = express();
const router = express.Router();

app.use(cors())
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb'
}));

app.get("/", (req, res) => {
    res.send({
        message: "Secangkir Ilmu - Project Akhir"
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

router.use('/semu', apiRouter)

app.use('/api', router);