import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import logger from '../src/log/logger.js';
import { fileURLToPath } from 'url';

const loadEnvFile = (envFileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const moduleDir = dirname(__filename);
    const envFilePath = path.resolve(moduleDir, envFileName);

    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
        logger.info(`Loaded environment file from ${envFilePath}`);
    } else {
        logger.error(`Environment file ${envFileName} does not exist`);
        process.exit(1);
    }
};

export default loadEnvFile;