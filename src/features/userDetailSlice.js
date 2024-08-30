import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("createUser",async (data,{ rejectWithValue })=>{
    const response = await fetch(
        "https://66d1606462816af9a4f36af2.mockapi.io/crud",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    try {
            const result = await response.json();
            return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const updateUser = createAsyncThunk("updateUser",async (data,{ rejectWithValue })=>{
    const response = await fetch(
        `https://66d1606462816af9a4f36af2.mockapi.io/crud/${data.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    try {
            const result = await response.json();
            return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const getUsers = createAsyncThunk("getUsers",async (args,{ rejectWithValue })=>{
    const response = await fetch("https://66d1606462816af9a4f36af2.mockapi.io/crud");
    try {
            const result = await response.json();
            return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const deleteUser = createAsyncThunk("deleteUser",async (id,{ rejectWithValue })=>{
    const response = await fetch(`https://66d1606462816af9a4f36af2.mockapi.io/crud/${id}`,{ method:"DELETE" });
    try {
            const result = await response.json();
            return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


const userDetail = createSlice({
    name:"userDetail",
    initialState: {
    users: [],
    loading: false,
    error: null,    
    searchData:[],
    },
    
    reducers : {
        searchUser : (state, action)=>{
            state.searchUser = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
          .addCase(createUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
          })
          .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.users = action.payload; 
          })
          .addCase(updateUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele)=>
             ele.id === action.payload.id ? action.payload : ele   
            );
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.users = action.payload; 
          })
          .addCase(getUsers.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = action.payload; 
          })
          .addCase(deleteUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const {id} = action.payload;
            if(id)
            {
                state.users = state.users.filter((ele) => ele.id!==id);
            }
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.users = action.payload; 
          })
          
      },
});    

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;