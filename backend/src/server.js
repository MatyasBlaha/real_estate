import ip from 'ip';
import loadEnvFile from "../env/config.js";
import logger from './log/logger.js';
import app from './app.js';


loadEnvFile('.env.config')
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));