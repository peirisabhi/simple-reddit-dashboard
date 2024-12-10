const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/reddit', async (req, res) => {
  try {
    const response = await fetch('https://www.reddit.com/r/popular.json');
    const data = await response.json();
    const posts = data.data.children.map(child => ({
      title: child.data.title,
      score: child.data.score,
      comments: child.data.num_comments
    })).slice(0, 10);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => {
  console.log();
});
