import React from "react";
import PropTypes from "prop-types";
import "../css/cars.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const CarCard = ({ image, marque, modele, couleur, prix, annee, owner }) => {
    const [carOwner, setCarOwner] = useState([]);

    if(owner !== undefined) {
        useEffect(() => {
            axios.get(`https://node-intro-a9xe.onrender.com/user/${owner}`)
                .then((res) => setCarOwner(res.data))
                .catch((err) => console.error("Error fetching user:", err));
        }, [owner]);
    }

    return (
        <div className="car-card">
            <img src={image} alt={marque} />
            <ul>
            <li><strong>Marque:</strong> {marque}</li>
            <li><strong>Modèle:</strong> {modele}</li>
            <li><strong>Couleur:</strong> {couleur}</li>
            <li><strong>Année:</strong> {annee}</li>
            <li><strong>Prix:</strong> {prix} €</li>
            {carOwner && carOwner.name ? (
                <>
                    <li><strong>Propriétaire:</strong> {carOwner.name}</li>
                    <li><strong>Email:</strong> {carOwner.email || "Email non disponible"}</li>
                </>
            ) : (
                <li><strong>Propriétaire:</strong> Inconnu</li>
            )}
        </ul>
        </div>
    );
};

CarCard.propTypes = {
    image: PropTypes.string.isRequired,
    marque: PropTypes.string.isRequired,
    owner: PropTypes.string,
};