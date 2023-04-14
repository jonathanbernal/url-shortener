require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// Set up middleware
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}));

// User-defined imports
const database = require('./bin/Database.js');
const urlValidator = require('./bin/urlValidator.js');
const URLDocument = require('./models/URLModel.js');

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/', async function(req, res) {
  const urlStringToCheck = req.body.url;
  const record = new URLDocument({
    original_url: urlStringToCheck,
    short_url: 1
  });

  let URLDocumentFound = null;
  if (urlValidator(urlStringToCheck)) {
    URLDocumentFound = await URLDocument.findOneByURL(urlStringToCheck);

    if(URLDocumentFound) {
      res.json({
        original_url: URLDocumentFound.original_url,
        short_url: URLDocumentFound.short_url
      });
    } else { // we need to create a new document and add it to the DB.
      const totalCount = await URLDocument.getCount();
      const newURLDocument = new URLDocument({
        original_url: urlStringToCheck,
        short_url: totalCount + 1,
      });
      newURLDocument.save()
      // since save() returns the saved document, we can use the result to verify
      // the new document was saved to the database.
        .then(result => {
          console.log(`${result.original_url} saved to DB.`);
          res.json({original_url: result.original_url, short_url: result.short_url})
        })
        .catch(err => console.log(err));
    }
  } else if ( !Number.isNaN(parseInt(urlStringToCheck)) ) { // a valid integer
    URLDocumentFound = await URLDocument.findOneByShortURL(urlStringToCheck);
    if (URLDocumentFound) {
      res.redirect(URLDocumentFound.original_url);
    } else {
      res.json({'error': 'invalid url'});
    }
  } else {
    res.json({'error': 'invalid url'});
  }
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));
