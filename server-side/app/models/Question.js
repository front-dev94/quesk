import mongoose, {Schema} from 'mongoose';
import Answer from './Answer';
import User from './User';

let questionSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: User, required: true },
  answers: [{ type: Schema.Types.ObjectId,  ref: Answer }],
  tags: [{type : String}],
  upVotes: [{ type: Schema.Types.ObjectId, ref: User}],
  downVotes: [{ type: Schema.Types.ObjectId, ref: User}],
  voteScore: {type: Number}
}, { timestamps: true });

questionSchema.pre(
  "save",
  function(next) {
    let question = this;
    if (!question.isModified("title")) {
      return next();
    }
    question.slug = slugify(question.title, "-");
    return next();
  },
  function(err) {
    next(err);
  }
);

let Question = mongoose.model('Question', questionSchema);

export default Question;