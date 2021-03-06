const inputLastSaturday = document.getElementById("input-last-saturday");
const lastFullWeekend = (year, month) => {
  const date = new Date(year, month);
  const weekday = date.getDay(); //gets first day of the month
  const lastSaturday = date.setDate(date.getDate() - weekday - 1); //backtracks to the last Sunday -1 (so, saturday)
  return date.getDate(); //returns day number
};
const lastSaturday = lastFullWeekend(new Date().getFullYear(), 11);
inputLastSaturday.innerHTML = `${lastSaturday}th`;
