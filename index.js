import Fantasmator from './fantasmator.js';

(function() {
  const fantasmator = new Fantasmator({
    persons: ['Dani', 'Juli', 'Marius', 'Azize', 'Patxi'],
    startDate: '2020-03-24'
  });
  const person = fantasmator.getPerson();
  console.log(person);
})();