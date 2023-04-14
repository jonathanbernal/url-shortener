const mongoose = require('mongoose');

const Database = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, });
    return connection;
}

module.exports = Database().then(console.log(`Successfully connected to database`))
    .catch(error => console.log(`Could not connect to database. Error:\n${error}`));