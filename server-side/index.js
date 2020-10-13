import './config/database';
import server from './config/server';
import { PORT } from './config/constants';

server.listen(PORT || 2000, () => {
  console.log(`App running on port ${PORT || 2000}`);
});