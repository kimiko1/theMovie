import React, { useState } from "react";
import { useUsers } from "../../context/Admin/UsersContext.jsx";

const UserDashboard = () => {
  const { users, loading, error, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState(null);

  // Fonction pour gérer l'édition d'un utilisateur
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const handleDelete = (id) => {
    deleteUser(id);
  };

  // Fonction pour sauvegarder l'édition de l'utilisateur
  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...editingUser,
      name: e.target.name.value,
      email: e.target.email.value,
    };
    updateUser(editingUser._id, updatedUser);
    setEditingUser(null); // Fermer le formulaire d'édition
  };

  // Chargement des utilisateurs ou erreur
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Users Dashboard</h2>

      {/* Affichage de la liste des utilisateurs */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulaire d'édition d'utilisateur */}
      {editingUser && (
        <form onSubmit={handleSave}>
          <h3>Edit User</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={editingUser.name}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={editingUser.email}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
