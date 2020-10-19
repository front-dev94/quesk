import mongoose, {Schema} from 'mongoose';
import Answer from './Answer';
import User from './User';

let questionSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: User },
  answers: [{ type: Schema.Types.ObjectId,  ref: Answer }],
  tags: [{type : String}],
  upVotes: [{ type: Schema.Types.ObjectId, ref: User}],
  downVotes: [{ type: Schema.Types.ObjectId, ref: User}],
  voteScore: {type: Number}
}, { timestamps: true });

let Question = mongoose.model('Question', questionSchema);

export default Question;