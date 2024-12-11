const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_CONN
let connectBD = async () => {
    try {
        await mongoose.connect(mongo_url);

        console.log("connect to mongoDb");
    } catch (error) {
        console.log("Error in connecting to monoDB");
        console.log(error);
    }
};
connectBD()