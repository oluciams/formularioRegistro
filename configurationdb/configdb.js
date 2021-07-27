const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost:27017/mongo-4', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {console.log('db connected')})   

