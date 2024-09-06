import { RootState, store } from "@/redux/store";


export function getWeekOfMonth(date:any) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // 1st day of the month
  const dayOfMonth = date.getDate(); // Get the day of the month
  
  // Get the day of the week for the 1st day (0 is Sunday, 6 is Saturday)
  const firstDayWeekDay = firstDayOfMonth.getDay(); 
  
  // Calculate the week number by dividing the difference in days by 7 and rounding up
  return Math.ceil((dayOfMonth + firstDayWeekDay) / 7);
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


type WithCreatedAt = { createdAt: number };
export function getChartRows<T extends WithCreatedAt>(month:number, year:number, data:T[]):number[] {
  const number_of_weeks:number[] = getChartColumns(month, year);

  const rowArr:number[] = new Array(number_of_weeks.length).fill(4);

  data.map((item, i) => {

  })

  return rowArr;
}