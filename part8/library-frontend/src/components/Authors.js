import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_BORN } from "../queries";
import { useState } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS, {
    skip: props.page === "author",
    onCompleted: (data) => setName(data.allAuthors[0].name),
  });

  const [updateBorn] = useMutation(UPDATE_BORN, {
    variables: { name, born },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) return <div>loading...</div>;

  const authors = result.data?.allAuthors || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBorn({ variables: { name, born: +born } });
    setName("");
    setBorn("");
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
          <div>
            <label htmlFor="born">born</label>
            <input
              type="text"
              name="born"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
