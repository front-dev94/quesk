const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema({
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    answers: [{ type: Schema.Types.ObjectId,  ref: 'answer' }],
    tags: [{type : String}],
    upVotes: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    downVotes: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    voteScore: {type: Number}
}, {
    timestamps: true
});

module.exports = mongoose.model('question', QuestionSchema);