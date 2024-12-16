const generateRoundRobin = require('./dist/index.js');

const teams = ['Real Madrid', 'Barcelona', 'Atletico', 'Valencia'];
const schedule = generateRoundRobin({ clubs: teams, legs: 2 });

console.log(JSON.stringify(schedule, null, 2));
