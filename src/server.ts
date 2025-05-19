import app from './app';
import { config } from './config/config';

app.listen(config.port, () => {
  console.log(`running at http://localhost:${config.port}`);
  console.log(`running at http://192.168.18.173:${config.port}`);
});
