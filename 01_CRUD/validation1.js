/*
 * Title: MongoDB application to create a document
 * Description: Use mongoose to connect to MongoDB and
 * insert documents into a database
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/play')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        min: 5,
        max: 200
    },
    isPublished: Boolean
});

// Create a model from the Schema (Course is a model (Class))
const Course = mongoose.model('Course', courseSchema);

// Function to create a course
async function createCourse() {
    // Instantiate the Course. Here course represents a document object
    const course = new Course({
        name: "C Programming Language",
        author: "Mubeen J",
        tags: ["programming", "OOPs"],
        price: 10,
        isPublished: false
    });

    // Save the document
    try {
        // Use validate method to validate a document
        let result = await course.validate();
        result = await course.save();
        console.log(result);
    }
    catch(err) {
        console.log("Error: Could not save document", err.message)
    }
}

// Create a course document
createCourse();
