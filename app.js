require('dotenv').config();
const express = require('express');
const sequelize = require('./utils/database');
const routes = require('./routes')
const cors = require('cors');
// intialized port 
const port = process.env.PORT;
const app = express(); // called app server

app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/', routes);

// calling the server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, function (err) {
        if (err) {
            console.log("Error in Running the Server", err);
        }
        console.log(`Successfully Running the server on Port: ${port}`);
    })
}).catch((err) => {
    console.error('Error in databse connection', err);
})
