const fetch = require('node-fetch');

exports.handler = async (event) => {
  const API_KEY = process.env.NEWS_API_KEY; 
  const response = await fetch(`https://newsapi.org/v2/everything?q=Pokemon&from=2024-04-03&sortBy=popularity&apiKey=${API_KEY}`);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};