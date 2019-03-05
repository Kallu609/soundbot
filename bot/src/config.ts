// Read process.env only through this file!

import * as dotenv from 'dotenv';
import * as os from 'os';

dotenv.config();

export default {
  db: {
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
  },
  botToken: process.env.BOT_TOKEN || '',
  tempPath: os.tmpdir(),
  testChatId: parseInt(process.env.TEST_CHAT_ID || '1', 10),
  webUrl: process.env.WEB_URL || 'http://localhost:3000/',
};