import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(updateVote(id));
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5000));
  };
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((anecdote) =>
          new RegExp(state.filter, "gi").test(anecdote.content)
        );
  });

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

export default AnecdoteList;
