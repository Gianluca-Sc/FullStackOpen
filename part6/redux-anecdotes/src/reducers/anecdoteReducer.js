import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const { id } = action.payload;
      const newState = state.map((anecdote) => {
        return anecdote.id === id ? action.payload : anecdote;
      });

      return [...newState];
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdotes, setAnecdotes, addVote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdotesService.update(anecdote);
    dispatch(addVote(changedAnecdote));
  };
};
export default anecdotesSlice.reducer;
