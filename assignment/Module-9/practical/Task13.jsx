import React from "react";

const UserList = () => {
  const users = [
    { id: 1, name: "Tushar" },
    { id: 2, name: "kriti" },
    { id: 3, name: "Dhairya" },
    { id: 4, name: "Barkha" }
  ];

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;