import { generateRssFeed } from '../src/server/rss.mjs';

console.log('Generating RSS feeds...');
await generateRssFeed();
console.log('RSS feeds generated successfully!');
