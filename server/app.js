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

app.use(express.json({ extended: true }))

mongoose.connect(`mongodb+srv://admin:EoRHh9rzLTEJHmXA@maritelgeneral.llqa9.gcp.mongodb.net/maritel?retryWrites=true&w=majority`,
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
