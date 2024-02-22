import React, { useEffect, useState } from 'react'
import "./News.css"

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
  // time difference 
  const getTimeDifference = (publishedTime: string) => {
    const currentTime = new Date();
    const published = new Date(publishedTime);
    const differenceInSeconds = Math.floor(
      (currentTime.getTime() - published.getTime()) / 1000
    );

    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  };
  return (
    <>
      <div className="article-container">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.article_url}
            target="_blank"
            rel="noopener noreferrer"
            className="article-link"
          >
            <div className="article-card">
              <img
                src={article.image_url}
                alt={article.title}
                className="article-image"
              />
              <div className="article-details">
                <div className="article-meta">
                  <span className="article-publisher">
                    {article.publisher.name}
                  </span>
                  <span className="article-time">
                    {getTimeDifference(article.published_utc)}
                  </span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}