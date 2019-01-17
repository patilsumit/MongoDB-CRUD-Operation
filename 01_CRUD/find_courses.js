// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Course Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

// Create a model from the Schema (Course is a model (Class))
const Course = mongoose.model('Course', courseSchema);

async function getAllCourses() {
    // const courses = await Course.find()
    // .and([
    //         {isPublished: true}, //Criteria 1 or
    //         {author: 'Jayakumar'} // Criteria 2
    //     ]);

    //----------------

    //     const courses = await Course.find(
    //     {
    //             isPublished: true, //Criteria 1 or
    //             author: 'Jayakumar' // Criteria 2
    //    });
    //---------

    // const courses = await Course.find().count();

    //const courses = await Course.find().sort({name:1}); //ascending order
    // const courses = await Course.find().sort({name:-1}); //descending order
  
     const courses=await Course.find()
        .sort({name:1})   
        .select('name author -_id') //Filed Including Result  -_id to remove id
        .limit(5);
        


    console.log(courses);
}

getAllCourses();