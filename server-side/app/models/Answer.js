import mongoose, {Schema} from 'mongoose';
import User from './User';

let answerSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: User },
  upVotes: [{ type: Schema.Types.ObjectId, ref: User}],
  downVotes: [{ type: Schema.Types.ObjectId, ref: User}]
}, { timestamps: true });

let Answer = mongoose.model('Answer', answerSchema);

export default Answer;