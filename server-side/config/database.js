import mongoose from "mongoose";

import { DATABASE, DB_HOST, DB_PORT } from '../config/constants';

class Connection {
  constructor() {
    const url = 'mongodb://'+DB_HOST+':'+DB_PORT+'/'+DATABASE;
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(url);
  }
}

export default new Connection();