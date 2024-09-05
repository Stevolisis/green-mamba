

export function getWeekOfMonth(date:any) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // 1st day of the month
  const dayOfMonth = date.getDate(); // Get the day of the month
  
  // Get the day of the week for the 1st day (0 is Sunday, 6 is Saturday)
  const firstDayWeekDay = firstDayOfMonth.getDay(); 
  
  // Calculate the week number by dividing the difference in days by 7 and rounding up
  return Math.ceil((dayOfMonth + firstDayWeekDay) / 7);
}


export function setChartColumns(){
  
}