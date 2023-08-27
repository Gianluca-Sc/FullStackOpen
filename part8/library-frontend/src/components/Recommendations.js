import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = () => {
  const user = useQuery(ME);
  const result = useQuery(ALL_BOOKS);

  const favoriteGenre = user.data?.me.favoriteGenre;

  const books = result.data?.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  if (result.loading) return <div>loadin...</div>;

  return (
    <div>
      <h2>recommendetaions</h2>
      <h4>book in your favorite genre {favoriteGenre}</h4>
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
    </div>
  );
};

export default Recommendations;
