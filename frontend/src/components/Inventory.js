import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import petsService from '../services/petsService';

/**
 * Muestra las mascotas separadas por status (available, pending, sold).
 * Cada mascota tiene botones "Update" y "Buy".
 */
function Inventory() {
  const navigate = useNavigate();

  const [availablePets, setAvailablePets] = useState([]);
  const [pendingPets, setPendingPets] = useState([]);
  const [soldPets, setSoldPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const avail = await petsService.findPetsByStatus('available');
        const pend = await petsService.findPetsByStatus('pending');
        const sold = await petsService.findPetsByStatus('sold');

        setAvailablePets(avail);
        setPendingPets(pend);
        setSoldPets(sold);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  // Redirige a UpdatePet con ?petId=xxx
  const handleUpdate = (petId) => {
    navigate(`/update-pet?petId=${petId}`);
  };

  // Redirige a OrderForm con ?petId=xxx
  const handleBuy = (petId) => {
    navigate(`/order-form?petId=${petId}`);
  };

  // Renderiza una tabla Bootstrap de un array de mascotas
  const renderPetsTable = (petsArray) => {
    if (petsArray.length === 0) {
      return <div className="alert alert-info">No pets in this status.</div>;
    }
    return (
      <table className="table table-bordered table-striped mb-4">
        <thead className="table-light">
          <tr>
            <th style={{ width: '10%' }}>ID</th>
            <th style={{ width: '30%' }}>Name</th>
            <th style={{ width: '20%' }}>Status</th>
            <th style={{ width: '40%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {petsArray.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.name}</td>
              <td>{pet.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleUpdate(pet.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleBuy(pet.id)}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Inventory (Grouped by Status)</h2>

      <h4>Available Pets</h4>
      {renderPetsTable(availablePets)}

      <h4>Pending Pets</h4>
      {renderPetsTable(pendingPets)}

      <h4>Sold Pets</h4>
      {renderPetsTable(soldPets)}
    </div>
  );
}

export default Inventory;
