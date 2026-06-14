const express = require('express');
const app = express();
const sequelize = require('./config/database');
const dbs = require('./models');
const UserRoutes = require('./routes/user.route');
const ErrorMiddleware = require('./middleware/Error');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;

// dbs.sequelize.sync({alter: true})

app.use("/api/users", UserRoutes)
 
app.use(ErrorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})