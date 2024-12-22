import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiDataSourceState {
  apiDataSource: any | null;
}

const initialState: ApiDataSourceState = {
  apiDataSource: null,
};

const apiDataSourceSlice = createSlice({
  name: 'apiDataSource',
  initialState,
  reducers: {
    setApiDataSource(state, action: PayloadAction<any>) {
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