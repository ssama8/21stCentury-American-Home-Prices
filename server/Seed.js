const State = require('./models/state.js');
require('dotenv').config();
// console.log(process.env);

console.log(process.env.TEST_URL);

const mongoose = require('mongoose');
// console.log(mongoose);
mongoose.connect(process.env.CONNECTION_URI);
const db = mongoose.connection;
// console.log(db);
db.once('open', () => console.log('Connected to the databse'));

console.log('Store all of the values in the database');

let data = require('fs').readFileSync('./data/properties.CSV', 'utf8');
let stateData = require('fs')
  .readFileSync('./data/state_data.CSV', 'utf8')
  .split('\n');

data = data.split(',');

const InitializeDB = () => {
  deleteExistingCollection();
  populateCollection();
};

const deleteExistingCollection = () => {
  db.collection('States').drop(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log('Collection deleted');
  });
};
const populateCollection = () => {
  const states = [];
  for (let i = 0; i < stateData.length - 1; i++) {
    currentState = stateData[i].split(',');
    const stateObj = {};
    stateObj['name'] = currentState[2];
    stateObj['abbrev'] = currentState[4];
    stateObj.prices = [];
    for (let j = 5; j < data.length; j++) {
      if ((j + 4) % 12 === 0) {
        stateObj.prices.push([data[j], currentState[j]]);
      }
    }

    const state = new State({ ...stateObj });
    state.save();
    states.push(stateObj);
  }
};

InitializeDB();
