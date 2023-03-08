'use strict';
const express = require('express');
const config = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouters = require('./routers/userRouters')
const productRouters = require('./routers/productRouters')
const cartRouters = require('./routers/cartRouters')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', userRouters.routes)
app.use('/api', productRouters.routes)
app.use('/api', cartRouters.routes)

app.listen(config.port, () => console.log('Server is listening on http://localhost:' + config.port))