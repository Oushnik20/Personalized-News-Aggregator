document.getElementById('fetch-news').addEventListener('click', fetchNews);

function fetchNews() {
  const keywords = document.getElementById('keywords').value.trim();

  if (!keywords) {
    alert('Please enter some keywords!');
    return;
  }

  const apiKey = 'd1c385074e5f4606850781c598fbc1e1';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => displayArticles(data.articles))
    .catch(error => {
      console.error('Error fetching news:', error);
      displayError('Failed to fetch news. Please try again later.');
    });
}

function displayArticles(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<p>No news found for the given keywords.</p>';
    return;
  }

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-article');
    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
    `;
    newsContainer.appendChild(articleElement);
  });
}

function displayError(message) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = `<p class="error">${message}</p>`;
}
