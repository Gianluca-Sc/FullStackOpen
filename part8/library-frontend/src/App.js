import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import { LoginForm } from "./components/LoginForm";
import Navigation from "./components/Navigation";
import { Route, Routes, useNavigate } from "react-router-dom";
import Recommendations from "./components/Recommendations";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const Notification = ({ notification }) => {
  return <div>{notification.msg}</div>;
};

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [notification, setNotification] = useState({ msg: "", error: false });
  const [token, setToken] = useState(null);

  const client = useApolloClient();
  const navigate = useNavigate();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const notify = (msg, error) => {
    setNotification({ msg, error });
    setTimeout(() => {
      setNotification({
        msg: "",
        error: false,
      });
    }, 3500);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };

  return (
    <div>
      <Navigation token={token} logout={logout} />
      {notification.msg && <Notification notification={notification} />}
      <Routes>
        <Route path="/" element={<Books notification={notification} />} />
        <Route
          path="/authors"
          element={<Authors notification={notification} />}
        />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} notify={notify} />}
        />
        <Route path="/add" element={<NewBook notify={notify} />} />
        <Route path="/recommend" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
