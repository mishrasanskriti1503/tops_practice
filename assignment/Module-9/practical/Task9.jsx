import React, { Component } from "react";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log("Component Mounted...");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data,
          loading: false
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ loading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component Updated...");

    // Optional che: check su change thayu
    if (prevState.users !== this.state.users) {
      console.log("Users data updated...");
    }
  }

  componentWillUnmount() {
    console.log("Component Unmounted...");
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h3>User List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default UserList;