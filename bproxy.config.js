module.exports = {
  "debug": false,
  "disableCache": true,
  "port": 8888,
  "https": true,
  "rules": [{
      "url": /(google|github)./,
      "proxy": "http://127.0.0.1:4780"
    },
    {
      url: 'https://www.duelpeak.com/pages/poster/**',
      target: 'http://localhost:5173/pages/poster/',
    },
    {
      url: 'https://www.duelpeak.com/pages/poster',
      target: 'http://localhost:5173/pages/poster',
    },
    
  ]
}