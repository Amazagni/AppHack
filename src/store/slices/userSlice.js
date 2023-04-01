import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/people?populate=*");
      return response.data.data[0];
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState: { user: {}, userLoading: false, userError: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userError = action.payload.status;
      state.userLoading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.user = [];
      state.userError = action.payload;
      state.userLoading = true;
    });
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.user = [];
      state.userError = null;
      state.userLoading = true;
    });
  },
});
export const { changeTheme, setDefaultTheme } = slice.actions;
export default slice.reducer;

export const selectUser = (state) => {
  return {
    user: state.user.user,
    loading: state.user.userLoading,
    error: state.user.userError,
  };
};
