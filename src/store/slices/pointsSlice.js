import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { calcCrow } from "../../utils/maths";

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
  initialState: {
    points: [],
    pointsLoading: false,
    pointsError: null,
    activePoint: {},
    location: {},
  },
  reducers: {
    setActivePoint: (state, action) => {
      state.activePoint = action.payload;
    },
    setLocation: (state, action) => {
      //long to lat XDD
      if (state.points.length === 0) return;
      let closest = state.points
        .map((point) => {
          let pointLat = point.attributes.Long;
          let pointLong = point.attributes.Lat;
          return {
            ...point,
            dist: calcCrow(
              action.payload.coords.latitude,
              action.payload.coords.longitude,
              pointLat,
              pointLong
            ),
          };
        })
        .sort((a, b) => a?.dist - b?.dist)[0];
      if (closest.dist < 1) state.activePoint = { ...closest, isClose: true };

      state.location = action.payload;
    },
  },

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
export const { setActivePoint, setLocation } = slice.actions;
export default slice.reducer;

export const selectPoints = (state) => {
  return {
    points: state.points.points,
    loading: state.points.pointsLoading,
    error: state.points.pointsError,
  };
};

export const selectActivePoint = (state) => {
  return state.points.activePoint;
};
