import React from "react";
import PropTypes from "prop-types";
import { CarCard } from "./CarCard";

export const CarsList = ({ cars }) => (
    <div className="cars-container">
        {cars.map((car) => (
            <CarCard
                key={car._id}
                image={car.image}
                marque={car.marque}
                modele={car.modele}
                couleur={car.couleur}
                prix={car.prix}
                annee={car.annee}
                owner={car.owner}
            />
        ))}
    </div>
);

CarsList.propTypes = {
    cars: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            marque: PropTypes.string.isRequired,
            modele: PropTypes.string.isRequired,
            couleur: PropTypes.string.isRequired,
            prix: PropTypes.number.isRequired,
            annee: PropTypes.number.isRequired,
        })
    ).isRequired,
};
