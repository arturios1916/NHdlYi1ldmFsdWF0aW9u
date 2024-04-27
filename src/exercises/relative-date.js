/*
* Write a function that will take a date and compare with today date and return text:
* - Today: same year, same month, same date
* - Yesterday: date = today - 1
* - This week: today - 7 < date < today - 1
* - Last week: today - 14 < date <= today - 7
* - This month: same year, same month, date <= today - 14
* - Last month: month = current month - 1
* - This year: same year
* - last year: year = current year - 1
* - Long time ago: everything else
*
* Lastly, please write a unit test for calculateRelativeDate function
* */

const relativeDateValues = {
  TODAY: 'Today',
  YESTERDAY: 'Yesterday',
  THIS_WEEK: 'This week',
  LAST_WEEK: 'Last week',
  THIS_MONTH: 'This month',
  LAST_MONTH: 'Last month',
  THIS_YEAR: 'This year',
  LAST_YEAR: 'Last year',
  LONG_TIME_AGO: 'Long time ago'
}

const calculateRelativeDate = (inputDateString) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const inputDate = new Date(new Date(inputDateString).setHours(0, 0, 0, 0));
  const diff = Math.round((today - inputDate) / (1000 * 60 * 60 * 24))
  const getYearDiff = () => today.getFullYear() - inputDate.getFullYear();
  const getMonthDiff = () => today.getMonth() - inputDate.getMonth();

  const day = 1;
  const week = day * 7;

  if (diff <= 0) {
    return relativeDateValues.TODAY;
  } else if (diff <= day) {
    return relativeDateValues.YESTERDAY;
  } else if (diff <= week) {
    return relativeDateValues.THIS_WEEK;
  } else if (diff <= ((week * 2) - day)) {
    return relativeDateValues.LAST_WEEK;
  } else if ((getYearDiff() === 0) && (getMonthDiff() === 0) && diff >= (week * 2)) {
    return relativeDateValues.THIS_MONTH;
  } else if (getYearDiff() === 0 && getMonthDiff() === 1) {
    return relativeDateValues.LAST_MONTH;
  } else if (getYearDiff() === 0) {
    return relativeDateValues.THIS_YEAR;
  } else if (getYearDiff() === 1) {
    return relativeDateValues.LAST_YEAR;
  } else {
    return relativeDateValues.LONG_TIME_AGO;
  }
}


const View = {
  init: () => {
    document.getElementById('relative-date-btn').addEventListener('click', () => {
      const msgElement = document.getElementById('relative-date-msg');
      const inputDateElem = document.getElementById('relative-date-input');
      msgElement.textContent = calculateRelativeDate(inputDateElem.value);
    });
  }
};

document.addEventListener('DOMContentLoaded', View.init);
export { calculateRelativeDate, relativeDateValues };
