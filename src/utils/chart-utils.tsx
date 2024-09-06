
function getWeekOfMonthFromTimestamp(timestamp:number) {
  // Convert Unix timestamp (which is in seconds) to milliseconds and create a Date object
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday

  // Get the day of the month for the given timestamp date
  const currentDate = date.getDate();

  // Calculate the week of the month
  const weekOfMonth = Math.ceil((firstDayOfWeek + currentDate) / 7);

  return weekOfMonth;
}


export function getChartColumns(month:number, year:number):number[]{
  const firstDayOfMonth:Date = new Date(year, month, 1);
	const lastDayOfMonth:Date = new Date(year, month + 1, 0); 
  
	const firstDayOfWeek:number = firstDayOfMonth.getDay();
	const lastDayOfMonthDate:number = lastDayOfMonth.getDate();
	
	const totalDays:number = firstDayOfWeek + lastDayOfMonthDate; 
	const totalWeeks:number = Math.ceil(totalDays / 7);

  const column = [];
  let index:number = 1;

  while(index < totalWeeks + 1){
    column.push(index);
    index ++;
  }
  
  return column;
}


type WithCreatedAt = { createdAt: number; amount?: number };

export function getChartRows<T extends WithCreatedAt>(month:number, year:number, data:T[]):number[] {
  const number_of_weeks:number[] = getChartColumns(month, year);

  const rowArr:number[] = new Array(number_of_weeks.length + 1).fill(0);

  data.map((item,i) => {
    const week: number = getWeekOfMonthFromTimestamp(item.createdAt);
    if (item.amount !== undefined) {
      rowArr[week] = rowArr[week] + item.amount;
    }else{
      rowArr[week] = rowArr[week] + 1;
    }
  });
  rowArr.shift();
  
  return rowArr;
}