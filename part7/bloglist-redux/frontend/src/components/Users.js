import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
//import user from "../../../backend/models/user";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      {users && (
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ name, username, blogs, id }) => {
              return (
                <tr key={id}>
                  <td>
                    <Link to={`/users/${id}`}>{name || username}</Link>
                  </td>
                  <td>{blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Users;
