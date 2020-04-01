const dp = document.querySelector('.date-picker');
const sd = document.querySelector('.date-picker .selected-date');

const dates = document.querySelector('.date-picker .dates');
const month_el = document.querySelector('.date-picker .dates .month .mth');
const next_month_el = document.querySelector(
  '.date-picker .dates .month .next-mth'
);
const prev_month_el = document.querySelector(
  '.date-picker .dates .month .prev-mth'
);
const days_element = document.querySelector('.date-picker .dates .days');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

month_el.textContent = months[month] + ' ' + year;

sd.textContent = formatDate(date);
sd.dataset.value = selectedDate;

populateDates();

next_month_el.addEventListener('click', goToNextMonth);
prev_month_el.addEventListener('click', goToPrevMonth);

function goToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  month_el.textContent = months[month] + ' ' + year;
  populateDates();
}

function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  month_el.textContent = months[month] + ' ' + year;
  populateDates();
}

function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function populateDates(e) {
  days_element.innerHTML = '';
  let amount_days = 31;
  let leap_yr = leapYear(year);

  switch (month) {
    case 0:
      amount_days = 31;
      break;
    case 1:
      if (leap_yr) {
        amount_days = 29;
      } else if (month == 1) {
        amount_days = 28;
      }
      break;
    case 2:
      amount_days = 31;
      break;
    case 3:
      amount_days = 30;
      break;
    case 4:
      amount_days = 31;
      break;
    case 5:
      amount_days = 30;
      break;
    case 6:
      amount_days = 31;
      break;
    case 7:
      amount_days = 31;
      break;
    case 8:
      amount_days = 30;
      break;
    case 9:
      amount_days = 31;
      break;
    case 10:
      amount_days = 30;
      break;
    case 11:
      amount_days = 31;
      break;
    default:
  }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement('div');
    day_element.classList.add('day');
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add('selected');
    }

    day_element.addEventListener('click', function() {
      selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      sd.textContent = formatDate(selectedDate);
      sd.dataset.value = selectedDate;

      populateDates();
    });

    days_element.appendChild(day_element);
  }
}

function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  let year = d.getFullYear();

  return day + ' / ' + month + ' / ' + year;
}
