import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../config.js';


// Async thunks for API operations
export const fetchGames = createAsyncThunk(
    'games/fetchGames', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/games`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Fetch games error:', err);
        return rejectWithValue(err.message);
    }
});

export const fetchGameById = createAsyncThunk(
    'games/fetchGameById', async (gameId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/games/${gameId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Fetch game error:', err);
        return rejectWithValue(err.message);
    }
});

export const createGame = createAsyncThunk(
    'games/createGame',
    async (gameData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameData),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateGame = createAsyncThunk(
    'games/updateGame',
    async (game) => {
        const response = await fetch(`${API_BASE_URL}/api/games/${game.game_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        });
        return await response.json();
    }
);

export const deleteGame = createAsyncThunk(
    'games/deleteGame',
    async (gameId) => {
        await fetch(`${API_BASE_URL}/api/games/${gameId}`, {
            method: 'DELETE',
        });
        return gameId;
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        status: 'idle',
        currentGame: null,
        error: null,
        sortConfig: {
            key: 'game_id',
            direction: 'asc', // 'asc' | 'desc'
        },
        editingGame: null,
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
        setEditingGame: (state, action) => {
            state.editingGame = action.payload;
        },
        updateFormData: (state, action) => {
            if (state.editingGame) {
                state.editingGame = {
                    ...state.editingGame,
                    ...action.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch games
            .addCase(fetchGames.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.current = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch games';
            })

            .addCase(fetchGameById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGameById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentGame = action.payload;
            })
            .addCase(fetchGameById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch games';
            })

            // Create game
            .addCase(createGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games.push(action.payload);
            })
            .addCase(createGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Update game
            .addCase(updateGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.games.findIndex(
                    (game) => game.game_id === action.payload.game_id
                );
                if (index !== -1) {
                    state.games[index] = action.payload;
                }
                state.editingGame = null;
            })
            .addCase(updateGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update game';
            })

            // Delete game
            .addCase(deleteGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = state.games.filter(
                    (game) => game.game_id !== action.payload
                );
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete game';
            });
    },
});

// Selectors
export const selectAllGames    = state => state.games.games;
export const selectCurrentGame = state => state.games.currentGame;
export const selectGamesStatus = (state) => state.games.status;
export const selectGamesError = (state) => state.games.error;
export const selectSortConfig = (state) => state.games.sortConfig;
export const selectEditingGame = (state) => state.games.editingGame;
export const selectSortedGames = (state) => {
    const games = [...selectAllGames(state)];
    const { key, direction } = selectSortConfig(state);
    return games.sort((a, b) => {
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
export const { setSortConfig, setEditingGame, updateFormData } = gamesSlice.actions;

export default gamesSlice.reducer;