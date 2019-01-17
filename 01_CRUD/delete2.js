/*
 * Title: MongoDB application to delte a document
 * Description: Use mongoose to connect to MongoDB and
 * delete a document from a document collection
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/play')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Course Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Create a model from the Schema (Course is a model (Class))
const Course = mongoose.model('Course', courseSchema);

// Delete/Remove course by ID
async function removeCourse(id) {
    const result = await Course.findByIdAndRemove(id);
    console.log(result);
}

removeCourse('5b5c05d54dc3fe1ce7c4cd78');

