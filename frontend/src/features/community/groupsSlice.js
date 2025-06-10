import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from "../../config.js";

// Fetch all groups
export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/groups`);
            if (!response.ok) throw new Error('Failed to fetch groups');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch single group by ID
export const fetchGroupById = createAsyncThunk(
    'groups/fetchGroupById',
    async (groupId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch posts for a specific group
export const fetchGroupPosts = createAsyncThunk(
    'groups/fetchGroupPosts',
    async (groupId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}/posts`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch comments for a specific post
export const fetchPostComments = createAsyncThunk(
    'groups/fetchPostComments',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create a new group
export const createGroup = createAsyncThunk(
    'groups/createGroup',
    async (groupData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupData),
            });
            if (!response.ok) throw new Error('Failed to create group');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create a new post in a group
export const createPost = createAsyncThunk(
    'groups/createPost',
    async ({ groupId, postData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) throw new Error('Failed to create post');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    groups_list: [],
    current: null,
    posts: [],
    comments: [],
    loading: false,
    error: null,
    postCreating: false,
    postError: null,
};

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.postError = null;
        },
        clearCurrentGroup: (state) => {
            state.current = null;
            state.posts = [];
            state.comments = [];
        },
        clearPosts: (state) => {
            state.posts = [];
        },
        clearComments: (state) => {
            state.comments = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch groups
            .addCase(fetchGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.loading = false;
                state.groups_list = action.payload;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch single group
            .addCase(fetchGroupById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGroupById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(fetchGroupById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch posts
            .addCase(fetchGroupPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGroupPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchGroupPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch comments
            .addCase(fetchPostComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchPostComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create group
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.groups_list.push(action.payload);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create post
            .addCase(createPost.pending, (state) => {
                state.postCreating = true;
                state.postError = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.postCreating = false;
                state.posts.unshift(action.payload); // Add new post to the beginning
            })
            .addCase(createPost.rejected, (state, action) => {
                state.postCreating = false;
                state.postError = action.payload;
            })

    },
});

export const { clearError, clearCurrentGroup, clearPosts, clearComments } = groupsSlice.actions;

// Selectors
export const selectGroupsList = (state) => state.groups.groups_list;
export const selectCurrentGroup = (state) => state.groups.current;
export const selectGroupPosts = (state) => state.groups.posts;
export const selectPostComments = (state) => state.groups.comments;
export const selectGroupsLoading = (state) => state.groups.loading;
export const selectGroupsError = (state) => state.groups.error;
export const selectPostCreating = (state) => state.groups.postCreating;
export const selectPostError = (state) => state.groups.postError;

export default groupsSlice.reducer;