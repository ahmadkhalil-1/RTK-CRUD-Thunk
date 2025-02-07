import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch('https://67a4f55bc0ac39787a1d0ae0.mockapi.io/crud', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
    }
});

export const readUser = createAsyncThunk('readUser', async (_, { rejectWithValue }) => {
    const response = await fetch('https://67a4f55bc0ac39787a1d0ae0.mockapi.io/crud');
    try {
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
    }
});

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://67a4f55bc0ac39787a1d0ae0.mockapi.io/crud/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
    }
});

export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://67a4f55bc0ac39787a1d0ae0.mockapi.io/crud/${data.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
    }
});

export const userDetailSlice = createSlice({
    name: 'userDetails',
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: []
    },

    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder.addCase(readUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(readUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(readUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                console.log(id, 'op')
                if (id) {
                    state.users = state.users.filter((user) => user.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                console.log(id, 'op');

                if (id) {
                    state.users = state.users.map((user) =>
                        user.id == id ? action.payload : user
                    );
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default userDetailSlice.reducer;
export const { searchUser } = userDetailSlice.actions;
