const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const app = express();
const cors = require('cors');
mongoose.connect('mongodb+srv://admin:admin@clusterh1-3glzs.gcp.mongodb.net/Chocolate?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(process.env.PORT || 3333);