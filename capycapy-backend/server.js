const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const parser = new Parser();

app.use(cors());
app.use(express.json());

const feeds = [
  { url: 'https://www.tagesschau.de/xml/rss2', source: 'tagesschau.de', bias: 'center-left' },
  { url: 'https://www.taz.de/rss.xml', source: 'taz.de', bias: 'far-left' },
  { url: 'https://www.welt.de/feeds/section/nachrichten.rss', source: 'welt.de', bias: 'center-right' },
  { url: 'https://jungefreiheit.de/feed/', source: 'jungefreiheit.de', bias: 'far-right' }
];

async function translateText(text, sourceLang = 'de', targetLang = 'en') {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Translation API error: ${res.status}`);
    const data = await res.json();
    return data[0]?.[0]?.[0] || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

app.get('/api/articles', async (req, res) => {
  const allArticles = [];

  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);
      const items = parsed.items.slice(0, 3);

      for (const item of items) {
        const originalTitle = item.title;
        const translatedTitle = await translateText(originalTitle, 'de', 'en');

        allArticles.push({
          source: feed.source,
          url: item.link,
          date: item.pubDate || 'Unknown',
          headline: {
            de: originalTitle,
            en: translatedTitle
          },
          bias: feed.bias
        });
      }
    } catch (err) {
      console.error(`Failed to fetch from ${feed.url}:`, err.message);
    }
  }

  res.json(allArticles);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ CapyCapyNews backend running at http://localhost:${PORT}`);
});
