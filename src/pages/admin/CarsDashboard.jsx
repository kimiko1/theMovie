import React, { useState } from "react";
import { useCars } from "../../context/Admin/CarsContext.jsx";

const CarsDashboard = () => {
  const { cars, loading, error, updateCar, deleteCar } = useCars();
  const [editingCar, setEditingCar] = useState(null);

  // Fonction pour gérer l'édition d'une voiture
  const handleEdit = (car) => {
    setEditingCar({ ...car }); // Clone l'objet pour éviter les mutations directes
  };

  // Fonction pour gérer la suppression d'une voiture
  const handleDelete = (id) => {
    deleteCar(id);
  };

  // Fonction pour gérer les changements dans le formulaire d'édition
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCar((prev) => ({ ...prev, [name]: value }));
  };

  // Fonction pour sauvegarder l'édition de la voiture
  const handleSave = (e) => {
    e.preventDefault();
    const updatedCar = {
      marque: e.target.marque.value,
      modele: e.target.modele.value,
      couleur: e.target.couleur.value,
      annee: e.target.annee.value,
      prix: e.target.prix.value,
    };
    updateCar(editingCar._id, updatedCar); // Appel au contexte avec l'ID correct
    setEditingCar(null); // Fermer le formulaire d'édition
  };
  

  // Chargement des utilisateurs ou erreur
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Cars Dashboard</h2>

      {/* Affichage de la liste des voitures */}
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modele</th>
            <th>Couleur</th>
            <th>Année</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.marque}</td>
              <td>{car.modele}</td>
              <td>{car.couleur}</td>
              <td>{car.annee}</td>
              <td>{car.prix}</td>
              <td>
                <button onClick={() => handleEdit(car)}>Edit</button>
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulaire d'édition d'une voiture */}
      {editingCar && (
        <form onSubmit={handleSave}>
          <h3>Edit Car</h3>
          <div>
            <label>Marque:</label>
            <input
              type="text"
              name="marque"
              value={editingCar.marque}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Modele :</label>
            <input
              type="text"
              name="modele"
              value={editingCar.modele}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Couleur :</label>
            <input
              type="text"
              name="couleur"
              value={editingCar.couleur}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Annee :</label>
            <input
              type="text"
              name="annee"
              value={editingCar.annee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Prix :</label>
            <input
              type="text"
              name="prix"
              value={editingCar.prix}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default CarsDashboard;
