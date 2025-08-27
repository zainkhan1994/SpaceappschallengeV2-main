const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.spaceappschallenge.org/2025/challenges/', { waitUntil: 'networkidle2' });

  // Wait for challenge cards to load (adjust selector if needed)
  await page.waitForSelector('.challenge-card, .card, .challenge, .MuiCard-root');

  // Scrape challenge data
  const challenges = await page.evaluate(() => {
    // Try to find all challenge cards
    const cards = Array.from(document.querySelectorAll('.challenge-card, .card, .challenge, .MuiCard-root'));
    return cards.map(card => {
      const title = card.querySelector('h2, h3, .title')?.innerText || '';
      const description = card.querySelector('p, .description')?.innerText || '';
      const image = card.querySelector('img')?.src || '';
      const difficulty = card.innerText.match(/Difficulty\s*:?[\s]*(Beginner\/Youth|Intermediate|Advanced)/)?.[1] || '';      const subjects = Array.from(card.querySelectorAll('.subject, .tag, .MuiChip-label')).map(e => e.innerText);
      return { title, description, image, difficulty, subjects };
    });
  });

  fs.writeFileSync('src/challenges.json', JSON.stringify(challenges, null, 2));
  await browser.close();
  console.log('Scraping complete! Data saved to src/challenges.json');
})();
