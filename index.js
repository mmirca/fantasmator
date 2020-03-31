const Fantasmator = require('./fantasmator');

console.log((new Fantasmator({
  persons: ['dani', 'juli', 'marius', 'azize', 'patxi', 'dani'],
  startDate: '2020-03-24'
})).getPerson());