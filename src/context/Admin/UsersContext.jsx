import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte Users
const UsersContext = createContext();

// Fournisseur du contexte Users
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://node-intro-a9xe.onrender.com/users'); // URL de ton API
      setUsers(response.data); // Met à jour la liste des utilisateurs
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  // Appeler fetchUsers lors du premier rendu
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://node-intro-a9xe.onrender.com/user/${id}`); // Appel à l'API pour supprimer un utilisateur
      fetchUsers(); // Met à jour la liste des utilisateurs après suppression
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (id, updatedUser) => {
    if (!id) {
      setError('User ID is required');
      return;
    }
    try {
      await axios.put(`https://node-intro-a9xe.onrender.com/user/${id}`, updatedUser);
      fetchUsers(); // Met à jour la liste des utilisateurs après modification
    } catch (err) {
      setError('Failed to update user');
    }
  };
  

  return (
    <UsersContext.Provider value={{ users, loading, error, fetchUsers, deleteUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUsers = () => {
    return useContext(UsersContext);
  };