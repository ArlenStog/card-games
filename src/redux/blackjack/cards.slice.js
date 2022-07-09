import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api/base'

export const cardsAll = createAsyncThunk(
  'cards/all',
  async (props, { rejectWithValue } ) => {
    try {
      const response = await api.get(props);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  },
);

const initialState = {
  success: "",
  deck_id: "",
  shuffled: "",
  remaining: 0,
  error: null
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(cardsAll.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.deck_id = action.payload.deck_id;
      state.shuffled = action.payload.shuffled;
      state.remaining = action.payload.remaining;
    });
    builder.addCase(cardsAll.rejected, (state, action) => {
      state.success = action.payload.success;
      state.error = action.payload;
    });

  },
});

export const cardReducer = cardSlice.reducer;