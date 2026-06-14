const Seqeulize = require('sequelize');

const sequelize = new Seqeulize('instagram_follow_system', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,

});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
    } catch (err) {
        console.log('Failed to connect db');

    }
}
connectToDatabase();
module.exports = sequelize;