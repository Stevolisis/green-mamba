import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type dataKey = {
    id: number;
    key:string,
    time: boolean
}

type DataObject = {
    idd: string;
    [key: string]: any; // This allows for additional fields of any type
};

type TimeOptions = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL" | [];

interface IInitialState{
    title: string;
    timeOptions: TimeOptions[];
    currentTimeOption: string | null;
    headings: string[];
    dataKeys: dataKey[];
    data: DataObject[];
    actionBtn: boolean;
    actionFunc?: {
        "edit": ()=> void;
        "delete": ()=> void;
    }
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
            state.actionBtn = payload.actionBtn;

            if(payload.actionBtn){
                state.actionFunc = payload.actionFunc;
            }

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

export default tableSlice.reducer;