require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const app = express();
const cors = require('cors');
mongoose.connect(process.env.MDB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(process.env.PORT || 3333);