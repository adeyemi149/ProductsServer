import config from './config/config.js' 
import mongoose from 'mongoose' 
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from '../server/routes/product.routes.js'
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
} )
.then(() => {
    console.log("Connected to the database!");
    })

const app = express();

// Middleware
app.use(bodyParser.json())
app.use(cors());
app.use('/', productRoutes)
app.use((err, req, res, next) => 
{
if (err.name === 'UnauthorizedError') {
res.status(401).json({"error" : err.name + ": " + err.message}) 
}else if (err) {
res.status(400).json({"error" : err.name + ": " + err.message}) 
console.log(err)
} 
})
app.use(express.json());
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`) 
    })
// Routes
app.get('/', (req, res) => {
    res.json({"message":"Welcome to DressStore application."});
});

// Start Server
app.listen(config.port, () => {
    console.log('Server started on port %s.', config.port);
});