const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const path = require('path');

const products = require('./products')
const app = express();

require("dotenv").config()

app.use(express.json())
app.use(cors())

app.use("/api/register", register)
app.use("/api/login", login)

app.get('/', (req, res) => {
	res.send("Welcome to your express server")
})

app.get('/products', (req, res) => {
	res.send(products)
})

app.get('/products/:id', (req, res) => {
	const { id } = req.params;
	const product = products.find(product => product.id === id);

	if(!product) {
		return res.status(404).json({ error: 'Product not found' })
	}

	res.json(product)
})

const port = process.env.PORT || 4100;
const uri = process.env.DB_URI
console.log(uri);
app.listen(port, console.log(`server running on ${port}`))


mongoose.connect(uri, {
}).then(() => console.log('Mongo db connection successful...'))
.catch((err) => console.log('Mongo db connection failed...', err.message))


app.use((req, res, next) => {
	if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
		next()
	} else {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); 
      res.header('X-Zakinchuyetsya', '-1'); 
      res.header( 'Pragma', 'no-cache'); 
      res.sendFile(path.join(__dirname, 'build', 'index.html')); 
	}
})
