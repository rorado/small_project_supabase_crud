import { useEffect, useState } from "react";

import "./App.css";
import { supabase } from "./createClient";

// icons
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

function App() {
  const [users, setUsers] = useState([]);
  const [updateUserID, setUpdateUserID] = useState();
  const [userV, setUserV] = useState({
    name: "",
    age: "",
    state: "Add",
  });

  async function user() {
    const { data, error } = await supabase.from("users_r").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }
    setUsers(data);
  }

  async function addUser() {
    await supabase.from("users_r").insert({ name: userV.name, age: userV.age });
  }

  async function desplayValueupdateUser(id, name, age) {
    setUserV((prev) => {
      return {
        ...prev,
        name: name,
        age: age,
        state: "Update",
      };
    });
    setUpdateUserID(id);
  }
  async function updateUser() {
    await supabase
      .from("users_r")
      .update({ name: userV.name, age: userV.age })
      .eq("id", updateUserID);
  }

  async function deletUser(id) {
    await supabase.from("users_r").delete().eq("id", id);
  }

  function deleteValue() {
    userV.name = "";
    userV.age = "";
  }

  function handleChangeName(e) {
    setUserV((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  }
  function handleChangeAge(e) {
    setUserV((prev) => {
      return {
        ...prev,
        age: e.target.value,
      };
    });
  }

  useEffect(() => {
    user();
  });

  async function submitValue(e) {
    e.preventDefault();
    if (userV.state == "Add") {
      await addUser();
    }
    if (userV.state == "Update") {
      await updateUser();
    }

    deleteValue();

    setUserV((prev) => {
      return {
        ...prev,
        state: "Add",
      };
    });
  }

  return (
    <>
      <h1 className="title">Table</h1>

      <form onSubmit={submitValue}>
        <input
          type="text"
          placeholder="Name"
          onChange={handleChangeName}
          name="name"
          value={userV.name}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={handleChangeAge}
          name="age"
          value={userV.age}
        />
        <input type="submit" value={userV.state} />
      </form>

      <table className="table_data">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>{" "}
              <td className="icons">
                <div>
                  <span
                    onClick={() => {
                      deletUser(user.id);
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </span>
                  <span
                    onClick={() => {
                      desplayValueupdateUser(user.id, user.name, user.age);
                    }}
                  >
                    <FaPenToSquare />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
