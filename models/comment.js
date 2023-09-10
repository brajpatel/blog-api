const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    date_added: { type: String, required: true }
})

module.exports = mongoose.model('Comment', CommentSchema);