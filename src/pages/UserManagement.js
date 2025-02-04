import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const roles = ["Admin", "Moderator", "Streamer", "Viewer"];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Viewer");

  const addUser = () => {
    setUsers([...users, { id: Date.now(), username, role, banned: false }]);
    setUsername("");
  };

  const toggleBan = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, banned: !user.banned } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Select onValueChange={setRole} defaultValue={role}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
        <Button onClick={addUser}>Add User</Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="flex justify-between items-center p-4">
            <div>
              <p className="text-lg font-medium">{user.username}</p>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
              <p className={`text-sm ${user.banned ? "text-red-500" : "text-green-500"}`}>
                {user.banned ? "Banned" : "Active"}
              </p>
            </div>
            <Button variant="outline" onClick={() => toggleBan(user.id)}>
              {user.banned ? "Unban" : "Ban"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
