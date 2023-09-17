const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: String, minLength: 3, required: true },
    title: { type: String, minLength: 8, required: true },
    content: { type: String, minLength: 40, required: true },
    date_added: { type: String, required: true },
    image: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

PostSchema.virtual('url').get(function() {
    return `/posts/${this._id}`;
})

module.exports = mongoose.model('Post', PostSchema);