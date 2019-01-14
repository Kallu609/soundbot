import * as Logger from './utils/logger';

process.env.NTBA_FIX_319 = '😋'; // Gets rid of node-telegram-bot-api warnings
process.env.NTBA_FIX_350 = '😋'; // -//-

import { startBot } from './bot';
import { areWeTestingWithJest } from './utils/jestCheck';

export function initialize() {
  process.on('unhandledRejection', e => {
    Logger.error(e);
  });

  startBot();
}

if (!areWeTestingWithJest()) {
  initialize();
}
