import { createSlice } from "@reduxjs/toolkit";

type chartItem = {
    name: string;
    title: string;
    columns: number[];
    rows: number[];
    date: number;
}

interface IInitialstate{
    charts: chartItem[];
    currentMonth: number;
    currentYear: number;
    months: string[];
    years: number[];
} 
const initialState:IInitialstate = {
    charts : [
        { 
            name: "dashboard", 
            title:"Finance Report", 
            columns:[
                1,2,3,4
            ], 
            rows:[
                12,8,44,20
            ], 
            date:1723905599
        }
    ],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    months :[
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ],
    years : Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (v, i) => i + 1990)
}

export const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers:{
        addChart: (state,{payload}):void=>{
            state.charts = [...state.charts, payload];
        },

    }
});

export const selectChartByName = (state: IInitialstate, name: string): chartItem | null => {
    const chart = state.charts.find(chart => chart.name === name);
    return chart || null;  // Return null if no chart is found
};

export const { addChart } = chartSlice.actions;
export default chartSlice.reducer;