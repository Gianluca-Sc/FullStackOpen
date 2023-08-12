import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import { createAnecdote } from "../request";
import NotificationContext from "../NotificationContext";
const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onError: () => {
          notificationDispatch({
            type: "ADD",
            payload: "too short anecdote, must have length 5 or more",
          });
          setTimeout(() => {
            notificationDispatch({ type: "REMOVE" });
          }, 5000);
        },
      }
    );
    notificationDispatch({ type: "ADD", payload: "Anecdote added" });
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
