import app from './app/app';
import { mongoUrl, port } from './config';
import { connectMongoDB } from './db/dbConnect';

(async () => {
  try {
    if (mongoUrl) {
      // eslint-disable-next-line no-console
      console.log('database is connecting...');
      await connectMongoDB(mongoUrl);
      const listenPort = Number(port) || 5000;
      app.listen(listenPort, () => {
        // eslint-disable-next-line no-console
        console.log(`server is running at ${listenPort}`);
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('MongoDB URL is not defined.');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to the database:', error);
  }
})();
