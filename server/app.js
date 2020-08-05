require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema/schema')
const app = express();
const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Headers', 'origin, contenttype, accept');
  next()
})

/////////////////////////////////////////////////////////

const fs = require('fs');
const pathToEntry = './build/index.html';
const bundlesRegExp = /\/static\/\w+\/\w+.[a-z0-9]+.\w{2,3}/g;
const splitBy = '</title>';

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const links = builtHTMLContent.match(bundlesRegExp);
const parts = builtHTMLContent.split(splitBy);

let fileWithPreload = [
  parts[0],
  splitBy,
];

links.forEach(link => {
  let fileType = 'script';

  if (/\.css$/.test(link)) {
    fileType = 'style';
  }

  fileWithPreload = [
    ...fileWithPreload,
    `<link rel="preload" href="${link}" as="${fileType}">`,
  ];
});

fileWithPreload = [
  ...fileWithPreload,
  parts[1],
];

fs.writeFileSync(pathToEntry, fileWithPreload.join(''));

/////////////////////////////////////////////////////////

app.use(express.json({ extended: true }))

mongoose.connect(`mongodb+srv://admin:NfoSAy2ePnJVQE36@mrskai.g24zh.azure.mongodb.net/database?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
