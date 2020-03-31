export default class Fantasmator {

  set persons(val) {
    if (val instanceof Array) {
      this._persons = val;
    }
  }

  get persons() {
    return this._persons || ['Azize', 'Patxi', 'Dani', 'Juli', 'Marius'];
  }

  /**
   * Index of the last week day the person is in charge, the next day it will
   * change to the next one. It's a 0 based index value and it starts on Sunday.
   */
  set changeDayIndex(val) {
    if (val instanceof Number && val >= 0 && val <= 6) {
      this._changeDayIndex = val;
    }
  }

  get changeDayIndex() {
    return this._changeDayIndex || 2;
  }

  set startDate(val) {
    try {
      const newDate = new Date(val);
      if (!isNaN(newDate.getTime())) {
        this._startDate = newDate;
      }
    } catch(e) {
      console.warn('Unable to instantiate Date from provided value');
    }
  }

  get startDate() {
    const today = this._getTodayDate();
    return this._startDate || new Date(`${today.getFullYear()}-01-1`);
  }

  get dayLength() {
    return 24 * 60 * 60 * 1000;
  }

  get weekLength() {
    return this.dayLength * 7;
  }

  get _maxWeeksInAYear() {
    return 53;
  }

  constructor({ persons, changeDayIndex, startDate } = {}) {
    this.persons = persons;
    this.changeDayIndex = changeDayIndex;
    this.startDate = startDate;
  }

  getPerson() {
    const { weeksSinceStartDate } = this._getCycleStartDate();
    let index = weeksSinceStartDate % this.persons.length;
    while (!this.persons[index] && index < this.persons.length + 1) {
      index++;
    }
    return this.persons[index];
  }

  getCycleStartDate() {
    const { startDate } = this._getCycleStartDate();
    return startDate;
  }

  _getCycleStartDate() {
    const today = this._getTodayDate();
    let weeksSinceStartDate = 0;
    let startDate = this._getStartDate();
    while(!this._isInWeekRange(startDate, today) && weeksSinceStartDate < this._maxWeeksInAYear) {
      startDate = new Date(startDate.getTime() + this.weekLength);
      weeksSinceStartDate++;
    }
    return { weeksSinceStartDate, startDate };
  }

  _getTodayDate() {
    const now = new Date();
    return new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  }

  _getStartDate() {
    let startDate = this.startDate;
    let failSafe = 0;
    while(startDate.getDay() !== this.changeDayIndex && failSafe < 8) {
      startDate = new Date(startDate.getTime() + this.dayLength);
      failSafe++;
    }
    return startDate;
  }

  _isInWeekRange(dateA, dateB) {
    const endRangeDay = new Date(dateA.getTime() + this.weekLength);
    return (dateA.getTime() < dateB.getTime()) && (dateB.getTime() < endRangeDay.getTime());
  }

}
