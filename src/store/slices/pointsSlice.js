import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchPoints = createAsyncThunk(
  "points/fetchPoints",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/points?populate=*");

      return response.data.data;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

const slice = createSlice({
  name: "points",
  initialState: { points: [], pointsLoading: false, pointsError: null },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPoints.fulfilled, (state, action) => {
      state.points = action.payload;
      state.pointsError = action.payload.status;
      state.pointsLoading = false;
    });
    builder.addCase(fetchPoints.rejected, (state, action) => {
      state.points = [];
      state.pointsError = action.payload;
      state.pointsLoading = true;
    });
    builder.addCase(fetchPoints.pending, (state, action) => {
      state.points = [];
      state.pointsError = null;
      state.pointsLoading = true;
    });
  },
});
export const { changeTheme, setDefaultTheme } = slice.actions;
export default slice.reducer;

export const selectPoints = (state) => {
  let discovered = state.points.point;

  return {
    points: state.points.points,
    loading: state.points.pointsLoading,
    error: state.points.pointsError,
  };
};
