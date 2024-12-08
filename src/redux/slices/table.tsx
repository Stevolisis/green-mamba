import { IBlog } from "@/dummy_data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBlogApi } from "./article";

type dataKey = {
    key:string,
    time?: boolean,
    address?: boolean,
    longText?: boolean,
    autoIndex?: boolean
    author?: boolean
}

export type DataObject = {
    id: number;
    [key: string]: any; // This allows for additional fields of any type
};

type TimeOptions = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

interface IInitialState{
    title: string;
    timeOptions: TimeOptions[];
    currentTimeOption: string | null;
    headings: string[];
    dataKeys: dataKey[];
    data: any[];
    actionBtn: boolean;
}

const initialState: IInitialState = {
    title: "",
    timeOptions: [],
    currentTimeOption: null,
    headings: [],
    dataKeys: [],
    data: [],
    actionBtn: false,
}

export const tableSlice = createSlice({
    name:"table",
    initialState:initialState,
    reducers:{
        setTable: (state, { payload }: PayloadAction<IInitialState>):void =>{
            state.title = payload.title;
            state.timeOptions = payload.timeOptions;
            state.currentTimeOption = payload.currentTimeOption;
            state.headings = payload.headings;
            state.dataKeys = payload.dataKeys;
            state.data = payload.data;
            state.actionBtn = payload.actionBtn;
        },
        setTimeOption:(state, { payload }) =>{
            state.currentTimeOption = payload;
        },
        deleteListItem:(state, { payload }) =>{
            const newData = state.data.filter(item => item.id != payload);
            state.data = newData;
        }
    }
});



export const { setTable, setTimeOption, deleteListItem} = tableSlice.actions;
export default tableSlice.reducer;