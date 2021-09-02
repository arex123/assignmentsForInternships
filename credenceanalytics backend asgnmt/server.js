const express = require('express');

const app = express();

//When the user reaches http://localhost:5000/ they will be able to access posts_controller.js file which has all the routes.
app.use(express.json());

//add mongo to server

const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

//When the user reaches http://localhost:5000/ they will be able to access posts_controller.js file which has all the routes.
const postsRoutes = require('./routes/api/posts_controller')


mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUndefinedTopology: true
}).then(() => console.log('MongoDB connected!'))
.catch(err =>console.log(err));


//When the user reaches http://localhost:5000/ they will be able to access posts_controller.js file which has all the routes.
app.use('/api/posts', postsRoutes);


app.get('/',(req,res) =>{
    res.send('Hello World');
});

const PORT =process.env.PORT || 5000;

app.listen(PORT,() =>
    console.log(`Server running at port ${PORT}`)
);