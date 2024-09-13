import { IBlog } from "@/dummy_data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataObject } from "./table";

interface IInitialState{
    articles: IBlog[];
    article: IBlog | DataObject |null;
};

const initialState:IInitialState = {
    articles: [],
    article: null
}

export const articleSlice = createSlice({
    name: "article",
    initialState: initialState,
    reducers: {
        setArticles: (state, { payload }: PayloadAction<IBlog[]>) =>{
            state.articles = payload;
        },
        setArticle: (state, { payload }: PayloadAction<{data: DataObject[], id: number}>) =>{
            const article = payload.data.find(item => item.id === payload.id);
            state.article = article || null;
        },
    }
});

export const { setArticles, setArticle } = articleSlice.actions;
export default articleSlice.reducer;