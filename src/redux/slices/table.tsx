import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type dataKey = {
    key:string,
    time?: boolean,
    address?: boolean,
    longText?: boolean,
    autoIndex?: boolean
}

type DataObject = {
    id: number;
    [key: string]: any; // This allows for additional fields of any type
};

type TimeOptions = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

interface IInitialState{
    title: string;
    timeOptions: TimeOptions[];
    currentTimeOption: string | null;
    timeUpdateFunc?: (e:string)=> void,
    headings: string[];
    dataKeys: dataKey[];
    data: DataObject[];
    actionBtn: boolean;
    actionFunc?: {
        "edit": (id:number)=> void;
        "delete": (id:number)=> void;
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
            state.timeUpdateFunc = payload.timeUpdateFunc;
            state.headings = payload.headings;
            state.dataKeys = payload.dataKeys;
            state.data = payload.data;
            state.actionBtn = payload.actionBtn;
            state.actionFunc = payload.actionFunc;

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



export const { setTable, setTimeOption, deleteListItem} = tableSlice.actions;
export default tableSlice.reducer;