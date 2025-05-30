const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const parser = new Parser();

app.use(cors());
app.use(express.static('public'));

const sources = [
  { url: 'https://www.tagesschau.de/xml/rss2', bias: 'center' },
  { url: 'https://taz.de/rss.xml', bias: 'left' },
  { url: 'https://www.welt.de/feeds/section/politik.rss', bias: 'right' }
];

app.get('/api/news', async (req, res) => {
  const results = [];

  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source.url);
      feed.items.slice(0, 3).forEach(item => {
        results.push({
          source: feed.title,
          url: item.link,
          date: item.pubDate,
          headline: {
            en: item.title,
            de: item.title // We'll improve translation later
          },
          bias: source.bias
        });
      });
    } catch (err) {
      console.error(`Error parsing ${source.url}:`, err.message);
    }
  }

  res.json(results);
});

app.listen(port, () => {
  console.log(`CapyCapyNews backend running on http://localhost:${port}`);
});
