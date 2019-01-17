/*
 * Title: MongoDB application to create a document
 * Description: Use mongoose to connect to MongoDB and
 * insert documents into a database, with async validation
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
        required: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (val, callback) { // Async validation func
                setTimeout(() => {
                    const result = val.length > 0;
                    callback(result);
                }, 3000);
            },
            message: 'A course should have alteast one tag'
        }
    },
    category: {
        type: String,
        enum: ["web", "mobile", "network"]
    },
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        required: function () { // price is required only if course is published
            return this.isPublished;
        }
    },
    isPublished: Boolean
});

// Create a model from the Schema (Course is a model (Class))
const Course = mongoose.model('Course', courseSchema);

// Function to create a course
async function createCourse() {
    // Instantiate the Course. Here course represents a document object
    const course = new Course({
        name: "Python Programming Language",
        author: "Mubeen J",
        tags: [],
        category: "web",
        price: 7,
        isPublished: true
    });

    // Save the document
    try {
        // Use validate method to validate a document
        var result = await course.validate();
        result = await course.save();
        console.log(result);
    }
    catch (err) {
        console.log("Error: Could not save document", err.message)
    }
}

// Create a course document
createCourse();
