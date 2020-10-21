import express from 'express';
import expressGraphql from 'express-graphql';
//import { graphql } from 'graphql';
import scheme from './scheme/scheme.js';
import mongoose from 'mongoose';

const {graphqlHTTP} = expressGraphql;
const port = 5000;
const app = express();

const dbNmae = 'tacos-db';
const user = 'admin';
const password = '310044pp';
const connectionString = `mongodb+srv://${user}:${password}@clustertaco.uwtsf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {userNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(console.log('connected to taco-db'))
.catch(error => console.log(`[Error]: ${error}`));

app.use('/graphql', graphqlHTTP({
    schema: scheme,
    graphql: true 
}));

app.listen(port, console.log(`listening at: http://localhost:${port}/graphql`));