import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import logger from '../src/log/logger.js';

const loadEnvFile = (envFileName) => {
    const moduleName = fileURLToPath(import.meta.url);
    const moduleDir = dirname(moduleName);
    const envFilePath = `${moduleDir}/${envFileName}`;

    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
    } else {
        logger.error(`Environment file ${envFileName} does not exist`);
        process.exit(1);
    }
};

export default loadEnvFile;