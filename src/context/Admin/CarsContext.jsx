import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte Cars
const CarsContext = createContext();

// Fournisseur du contexte Cars
export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure Axios pour inclure le token dans les en-têtes
  const getToken = () => localStorage.getItem('token'); // Récupère le token du localStorage

  const apiClient = axios.create({
    baseURL: 'https://node-intro-a9xe.onrender.com',
    headers: {
      Authorization: `Bearer ${getToken()}`, // Ajoute le token dans l'en-tête Authorization
    },
  });

  // Récupérer les voitures
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/cars');
      setCars(response.data); // Met à jour la liste des voitures
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cars');
      setLoading(false);
    }
  };

  // Appeler fetchCars lors du premier rendu
  useEffect(() => {
    fetchCars();
  }, []);

  // Fonction pour supprimer une voiture
  const deleteCar = async (id) => {
    try {
      await apiClient.delete(`/car/${id}`); // Appel à l'API pour supprimer une voiture
      if (response.status === 200) {
        fetchCars(); // Rafraîchit la liste des voitures après la suppression
        setError(`Failed to update car: ${response.statusText}`);
      }
    } catch (err) {
      setError('Failed to delete car');
    }
  };

  // Fonction pour mettre à jour une voiture
const updateCar = async (id, updatedCar) => {
    if (!id) {
      setError('Car ID is required');
      return;
    }
    console.log("Received body:", updatedCar);
  
    try {
      // Appel PUT à l'API pour mettre à jour la voiture
      const response = await apiClient.put(`/car/${id}`, updatedCar);
      
      if (response.status === 200) {
        fetchCars(); // Rafraîchit la liste des voitures après la mise à jour
      } else {
        setError(`Failed to update car: ${response.statusText}`);
      }
    } catch (err) {
      // Gestion des erreurs d'appel API
      if (err.response) {
        // Erreur côté serveur avec une réponse
        setError(`Failed to update car: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        // Erreur réseau ou absence de réponse
        setError('Failed to update car: No response from server');
      } else {
        // Autres erreurs (e.g., configuration Axios)
        setError(`Failed to update car: ${err.message}`);
      }
    }
  };
  

  return (
    <CarsContext.Provider value={{ cars, loading, error, fetchCars, deleteCar, updateCar }}>
      {children}
    </CarsContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useCars = () => {
  return useContext(CarsContext);
};
