import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Item } from '@server/types/item';
import { FormItem } from '../components/ItemForm';

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

export const fetchItems = createAsyncThunk('fetchItems', async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/items`);
  const items: Item[] = await response.json();
  return items;
});

export const createItem = createAsyncThunk(
  'createItem',
  async (item: FormItem) => {
    await fetch(`${process.env.REACT_APP_BASE_API_URL}/items`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  }
);

export const updateItem = createAsyncThunk(
  'updateItem',
  async (item: FormItem) => {
    await fetch(`${process.env.REACT_APP_BASE_API_URL}/items/${item.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  }
);

export const deleteItem = createAsyncThunk(
  'deleteItem',
  async (itemId: number) => {
    await fetch(`${process.env.REACT_APP_BASE_API_URL}/items/${itemId}`, {
      method: 'DELETE',
    });
  }
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {} = itemSlice.actions;

export default itemSlice.reducer;
