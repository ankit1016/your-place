
import {createSlice} from "@reduxjs/toolkit"
import { Action } from "@remix-run/router"

const initialState={
    spinner:false,
    error:null
}
const ThemeSlice=createSlice({
    name:"spinner",
    initialState,
    reducers:{

        setError(state,action){
         state.error=action.payload
        },
        setSpinner(state,action){
            state.spinner=action.payload
        }
    }
})


export const ThemeActions=ThemeSlice.actions

export default ThemeSlice