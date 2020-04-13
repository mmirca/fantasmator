import Fantasmator from './fantasmator.js';

(function() {
  const persons = [
    { name: 'Marius', avatar: './img/marius.jpg' },
    { name: 'Azize', avatar: './img/azize.png' },
    { name: 'Iván', avatar: './img/ivan.png' },
    { name: 'Dani', avatar: './img/dani.jpeg' },
    { name: 'Juli', avatar: './img/juli.jpg' }
  ];
  const $mainImage = document.querySelector('#main-image');
  const $mainTitle = document.querySelector('#main-title');
  const $mainDate = document.querySelector('#main-date');
  const $fantasmatorList = document.querySelector('#fantasmator-list');
  const $fantasmatorItemTemplate = document.querySelector('#fantasmator-item-template');

  const fantasmator = new Fantasmator({
    startDate: '2020-04-07',
    persons
  });

  const currentPerson = fantasmator.getPerson();
  const cycleStartDate = new Date(fantasmator.getCycleStartDate().getTime() + fantasmator.dayLength);

  $mainImage.src = currentPerson.avatar;
  $mainTitle.innerText = currentPerson.name;
  $mainDate.innerText = cycleStartDate.toDateString();

  const currentPersonIndex = persons.indexOf(currentPerson);
  const fantasmatorList = [
      ...persons.slice(currentPersonIndex),
      ...persons.slice(0, currentPersonIndex)
    ]
    .filter((person) => person !== currentPerson)
    .map((person, index) => ({
      ...person,
      startDate: new Date(cycleStartDate.getTime() + (fantasmator.weekLength * (index + 1)))
    }));
  $fantasmatorList.innerHTML = fantasmatorList.map(getItemTemplate).join('');

  function getItemTemplate(person) {
    return $fantasmatorItemTemplate.innerHTML
      .split('{{name}}').join(person.name)
      .split('{{date}}').join(person.startDate.toDateString())
      .split('{{image}}').join(person.avatar);
  }

})();