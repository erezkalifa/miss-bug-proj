import { useEffect, useState } from "react";
import { userService } from "../services/user.service.js";

export function UserIndex() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fullname: "",
    username: "",
    password: "",
    score: 0,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const users = await userService.query();
      setUsers(users);
    } catch (err) {
      console.error("Cannot load users", err);
    }
  }

  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Cannot remove user", err);
    }
  }

  async function onSaveUser() {
    try {
      const savedUser = await userService.save(newUser);
      setUsers((prev) => [...prev, savedUser]);
      setNewUser({ fullname: "", username: "", password: "", score: 0 });
    } catch (err) {
      console.error("Cannot save user", err);
    }
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="user-index">
      <h2>Add new user</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveUser();
        }}
      >
        <input
          name="fullname"
          value={newUser.fullname}
          onChange={handleChange}
          placeholder="Full name"
        />
        <input
          name="username"
          value={newUser.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
        <input
          name="score"
          value={newUser.score}
          onChange={handleChange}
          placeholder="Score"
          type="number"
        />
        <button>Save</button>
      </form>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.fullname} ({user.username}) - Score: {user.score}
            <button onClick={() => onRemoveUser(user._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
