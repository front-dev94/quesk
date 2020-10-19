import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

let userSchema = new Schema({
  username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
  },
  firstName: {
      type: String,
      required: true,
      maxlength: 50
  },
  lastName: {
      type: String,
      required: true,
      maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
  },
  questionScore: {type: Number},
  answerScore: {type: Number}
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (this.password) {
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        let salt = await bcrypt.genSalt(10);
        this.getUpdate().password = await bcrypt.hash(update.password, salt);
    } else {
        next();
    }
});

let User = mongoose.model('User', userSchema);

export default User;