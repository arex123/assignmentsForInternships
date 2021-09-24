const { request, response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

const url = "mongodb://localhost:27017/films";

var db = mongoose.connection;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });

const Schema = mongoose.Schema;

const filmSchema = new Schema({
  name: {
   type: String,
   required:true
  },

  summary: {
    type: String,
     required:true
  },
  image: {
    type: String,
    required:true
    },
  
});

const Film = mongoose.model("Film", filmSchema);

const film1 = new Film({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary:
    "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
});

const film2 = new Film({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary:
    "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
});
const film3 = new Film({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary:
    "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
});

const defaultName = [film1,film2,film3];



//read
app.get("/", async (req, res) => {

  try{
        const films = await Film.find();
        res.send(films);

  }catch(err){
        res.send(err);
  }


});
if(mongoose.connection.db.collection('films').count(function(err,count) {

  if(count==0){

    Film.insertMany(defaultName,function(err) {
      if(err){
        console.log(err);
      }
      else{
        console.log("default items succesfully inserted");
      }
    }
  }



//create
app.post('/',function(req,res) {
    var film = new Film()
        film.name=req.body.name,
        film.summary=req.body.summary,
        film.image=req.body.image,
      film.save(function(err, film){
        if(err) {
            res.send(err);
        } else {
            console.log(film);
            res.send(film);
        }
    });

     

    // try{
    //   let nd = await film.save()
    //   res.json(nd)
    // }
    // catch(error){
    //   res.send(error)
    // }
      

})


//update
app.patch('/:id', async (req, res) => {
    try {
    const post = await Film.findByIdAndUpdate(req.params.id, req.body);
    if(!post) throw Error('Something went wrong while updating the post');
    res.status(200).json({success: true});
    }catch(err) {
    res.send('Error');
  }
    });


 //delete
app.delete('/:id', async (req, res) => {
    try {
    const post = await Film.findByIdAndDelete(req.params.id);
    if(!post) throw Error('No post found!');
    res.status(200).json({success: true})
    }catch(err) {
    res.send('Error');
    }
    });

    //delete All
    app.delete('/',async(req,res)=>{
      try{
        Film.deleteMany();
        res.status(200).json({success: true})
        
      }catch(err){
        res.send('Error');
      }
    });


const port = 3000;

app.listen(port, (error) => {
  console.log(`Server listening on port ${port}`);
});
