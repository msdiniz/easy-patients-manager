import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiDataSource from '../apiContacts/apiDataSource';

interface ApiDataSourceState {
  apiDataSource: ApiDataSource | null;
}

const initialState: ApiDataSourceState = {
  apiDataSource: null,
};

const apiDataSourceSlice = createSlice({
  name: 'apiDataSource',
  initialState,
  reducers: {
    setApiDataSource(state, action: PayloadAction<ApiDataSource>) {
      state.apiDataSource = action.payload;
    },
    clearApiDataSource(state) {
      state.apiDataSource = null;
    },
  },
});

export const { setApiDataSource, clearApiDataSource } = apiDataSourceSlice.actions;
export default apiDataSourceSlice.reducer;
export type { ApiDataSourceState }; // Export ApiDataSourceState
