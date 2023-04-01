import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchquests = createAsyncThunk(
  "quests/fetchquests",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/quests?populate=*");
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

const slice = createSlice({
  name: "quests",
  initialState: {
    quests: [],
    questsLoading: false,
    questsError: null,
    activeQuest: {},
  },
  reducers: {
    setActiveQuest: (state, action) => {
      state.activeQuest = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchquests.fulfilled, (state, action) => {
      state.quests = action.payload;
      state.questsError = action.payload.status;
      state.questsLoading = false;
    });
    builder.addCase(fetchquests.rejected, (state, action) => {
      state.quests = [];
      state.questsError = action.payload;
      state.questsLoading = true;
    });
    builder.addCase(fetchquests.pending, (state, action) => {
      state.quests = [];
      state.questsError = null;
      state.questsLoading = true;
    });
  },
});
export const { setActiveQuest } = slice.actions;
export default slice.reducer;

export const selectquests = (state) => {
  return {
    quests: state.quests.quests,
    loading: state.quests.questsLoading,
    error: state.quests.questsError,
  };
};

export const selectActiveQuest = (state) => {
  return state.quests.activeQuest;
};
