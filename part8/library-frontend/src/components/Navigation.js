import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ token, logout }) => {
  return (
    <nav>
      <ul>
        <button>
          <Link to={"/authors"}>authors</Link>
        </button>
        <button>
          <Link to={"/"}>books</Link>
        </button>
        {token && (
          <>
            <button>
              {" "}
              <Link to={"/add"}>add</Link>{" "}
            </button>

            <button>
              <Link to={"/recommend"}>recommend</Link>
            </button>
            <button>
              <Link to={"/"} onClick={logout}>
                logout
              </Link>
            </button>
          </>
        )}
        {!token && (
          <button>
            <Link to={"/login"}>login</Link>
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
