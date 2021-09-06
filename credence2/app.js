const { request, response } = require("express");
const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes'); //it will link the route to this page
const mongoose = require('mongoose');
const router = express.Router();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true,
// }));


const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    image,
    summary
});


// routes(app);


app.get('/users', (request, response) => {
       response.send(users);
});



//create
router.post('/', async (req, res) => {
    const newPost = new Posts(req.body);
    try {
    const post = await newPost.save();
    if(!post) throw Error('Something went wrong with the post')
    res.status(200).json(post);
    } catch {
    res.status(400).json({msg: error})
    }
    });

    
//get all posts
router.get('/', async (req, res) => {
    try {
    const posts = await Posts.find();
    if(!posts) throw Error('No Items');
    res.status(200).json(posts);
    }catch(err) {
    res.status(400).json({mesg: err})
    }
    });


//get one post
router.get('/:id', async (req, res) => {
    try {
    const post = await Posts.findById(req.params.id);
    if(!post) throw Error('No Items');
    res.status(200).json(post);
    }catch(err) {
    res.status(400).json({mesg: err})
    }
    });

    
//update
router.patch('/:id', async (req, res) => {
    try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if(!post) throw Error('Something went wrong while updating the post');
    res.status(200).json({success: true});
    }catch(err) {
    res.status(400).json({msg:err});
    }
    });


//delete
router.delete('/:id', async (req, res) => {
    try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if(!post) throw Error('No post found!');
    res.status(200).json({success: true})
    }catch(err) {
    res.status(400).json({msg: error})
    }
    });





const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});