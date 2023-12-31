const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: { type: String, minLength: 3, required: true },
    message: { type: String, minLength: 20, required: true },
    date_added: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true}
})

module.exports = mongoose.model('Comment', CommentSchema);