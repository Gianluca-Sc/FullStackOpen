import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });

  const genresQuery = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genresQuery.data) {
      const genresSet = new Set();
      const booksGenres = genresQuery.data?.allBooks;

      booksGenres.forEach((book) => {
        book.genres.forEach((g) => genresSet.add(g));
      });

      setGenres([...genresSet]);
    }
  }, [genresQuery]);

  useEffect(() => {
    if (result) result.refetch();
  }, [filter, result]);

  if (result.loading) return <div>loading...</div>;
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g, i) => (
          <button key={i} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
