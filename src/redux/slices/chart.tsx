import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBlog, IDummyGift } from "../../dummy_data";
import { getChartColumns, getChartRows } from "@/utils/chart-utils";

type chartItem = {
    name: string;
    title: string;
    columns: number[];
    rows: number[];
}

interface IInitialstate{
    charts: chartItem[];
    currentMonth: number;
    currentYear: number;
    months: string[];
    years: number[];
} 

const initialState:IInitialstate = {
    charts : [],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    months :["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    years : Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (v, i) => i + 1990)
}





export const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers:{
        addChart: (state, { payload}):void=>{
            const { name, title, data} = payload as { name: string; title: string; data: IDummyGift[] };
            const getColumn:number[] = getChartColumns(state.currentMonth, state.currentYear);
            const getRows:number[] = getChartRows(state.currentMonth, state.currentYear, data); 
            const newArr = state.charts.filter(chart=> chart.name !== name);
            const newChart = {
                name: name,
                title: title,
                columns: getColumn,
                rows: getRows,
            };
            newArr.push(newChart);
            state.charts = newArr;
        },

    }
});

export const selectChartByName = (state: IInitialstate, name: string): chartItem | null => {
    const chart = state.charts.find(chart => chart.name === name);
    return chart || null;  // Return null if no chart is found
};

export const { addChart } = chartSlice.actions;
export default chartSlice.reducer;