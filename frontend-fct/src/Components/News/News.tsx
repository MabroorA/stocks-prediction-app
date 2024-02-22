import React, { useEffect, useState } from 'react'


interface Article {
  amp_url: string;
  article_url: string;
  author: string;
  description: string;
  id: string;
  image_url: string;
  keywords: string[];
  published_utc: string;
  publisher: {
    favicon_url: string;
    homepage_url: string;
    logo_url: string;
    name: string;
  };
  tickers: string[];
  title: string;
}

export default function News() {
  
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3000/news");
        const data = await response.json();
        setArticles(data.results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);  

  return (
    <>
      <div className="article-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <img src={article.image_url} alt={article.title} />
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.article_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}