const express = require('express');
const Parser = require('rss-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const parser = new Parser();

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// RSS Feeds with bias metadata
const feeds = [
  { url: 'https://www.tagesschau.de/xml/rss2', source: 'tagesschau.de', bias: 'center-left' },
  { url: 'https://www.taz.de/rss.xml', source: 'taz.de', bias: 'far-left' },
  { url: 'https://www.welt.de/feeds/section/nachrichten.rss', source: 'welt.de', bias: 'center-right' },
  { url: 'https://jungefreiheit.de/feed/', source: 'jungefreiheit.de', bias: 'far-right' }
];

// API route to serve articles
app.get('/api/articles', async (req, res) => {
  const allArticles = [];

  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);
      parsed.items.slice(0, 3).forEach(item => {
        allArticles.push({
          source: feed.source,
          url: item.link,
          date: item.pubDate || 'Unknown',
          headline: {
            en: item.title,
            de: item.title // placeholder for translation
          },
          bias: feed.bias
        });
      });
    } catch (err) {
      console.error(`Failed to fetch from ${feed.url}:`, err.message);
    }
  }

  res.json(allArticles);
});

// Catch-all route to support client-side routing (e.g., React, Vue)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CapyCapyNews backend running on http://localhost:${PORT}`);
});
