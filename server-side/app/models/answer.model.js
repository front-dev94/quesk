const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = mongoose.Schema({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('answer', AnswerSchema);