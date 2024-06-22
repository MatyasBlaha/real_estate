import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import logger from '../src/log/logger.js';

const loadEnvFile = (envFileName) => {
    const moduleName = import.meta.url;
    const modulePath = fileURLToPath(moduleName);
    const moduleDir = dirname(modulePath);
    const envFilePath = path.resolve(moduleDir, envFileName);

    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
        logger.info(`Loaded environment file from ${envFileName}`);
    } else {
        logger.error(`Environment file ${envFileName} does not exist`);
        process.exit(1);
    }
};

export default loadEnvFile;