const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log('¡¡HUBO UN ERROR!!');
        console.log('EL ERROR ES: ', error);
        process.exit(1) //En caso de error, detiene la app
    }
}

module.exports = conectarDB;