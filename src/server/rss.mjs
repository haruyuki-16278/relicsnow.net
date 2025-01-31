import { Feed } from 'feed';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';

const SITE_URL = 'https://relicsnow.net';
const AUTHOR = {
  name: 'Haruyuki',
  email: 'your-email@example.com',
  link: SITE_URL,
};

export async function generateRssFeed() {
  const feed = new Feed({
    title: 'relicsnow.net',
    description: 'feed of relicsnow.net / なごり雪',
    id: SITE_URL,
    link: SITE_URL,
    language: 'ja',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${AUTHOR.name}`,
    author: AUTHOR,
  });

  const contentFiles = await glob('src/content/*.md');

  for (const file of contentFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const { data, content: markdown } = matter(content);
    const url = `${SITE_URL}/blog/${data['slug']}`;

    feed.addItem({
      title: data['title'],
      id: url,
      link: url,
      description: data['description'],
      content: markdown,
      author: [AUTHOR],
      date: new Date(data['date'] || new Date()),
    });
  }

  await fs.mkdir('dist/analog/public', { recursive: true });
  await Promise.all([
    fs.writeFile('dist/analog/public/feed.xml', feed.rss2()),
    fs.writeFile('dist/analog/public/feed.json', feed.json1()),
    fs.writeFile('dist/analog/public/feed.atom', feed.atom1()),
  ]);
}
