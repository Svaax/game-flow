import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../config.js';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`);

        return await response.json();
    } catch (err) {
        console.error('Fetch users error:', err);
        return rejectWithValue(err.message);
    }
});

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (user) => {
        const response = await fetch(`${API_BASE_URL}/api/users/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        await fetch(`${API_BASE_URL}/api/users/${userId}`, {
            method: 'DELETE',
        });
        return userId;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        sortConfig: {
            key: 'user_id',
            direction: 'asc', // 'asc' | 'desc'
        },
        editingUser: null,
    },
    reducers: {
        setSortConfig: (state, action) => {
            if (state.sortConfig.key === action.payload) {
                state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortConfig.key = action.payload;
                state.sortConfig.direction = 'asc';
            }
        },
        setEditingUser: (state, action) => {
            state.editingUser = action.payload;
        },
        updateFormData: (state, action) => {
            if (state.editingUser) {
                state.editingUser = {
                    ...state.editingUser,
                    ...action.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users';
            })

            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.stausersReducertus = 'succeeded';
                const index = state.users.findIndex(
                    (user) => user.game_id === action.payload.user_id
                );
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                state.editingUser = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update user';
            })

            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = state.users.filter(
                    (user) => user.user_id !== action.payload
                );
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete user';
            });
    },
});

// Selectors
export const selectAllUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectSortConfig = (state) => state.users.sortConfig;
export const selectEditingUser = (state) => state.users.editingUser;

export const selectSortedUsers = (state) => {
    const users = [...selectAllUsers(state)];
    const { key, direction } = selectSortConfig(state);
    return users.sort((a, b) => {
        if (a[key] < b[key]) {
            return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
};

// Actions
export const { setSortConfig, setEditingUser, updateFormData } = usersSlice.actions;

export default usersSlice.reducer;