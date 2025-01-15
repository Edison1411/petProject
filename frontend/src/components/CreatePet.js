import React, { useState } from 'react';
import petsService from '../services/petsService';


function CreatePet() {
  const [petData, setPetData] = useState({
    category: { id: 1, name: 'Dogs' },
    name: '',
    photoUrls: '',
    status: 'available'
  });

  const [createdPets, setCreatedPets] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryIdChange = (e) => {
    setPetData((prev) => ({
      ...prev,
      category: { ...prev.category, id: Number(e.target.value) }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        ...petData,
        photoUrls: petData.photoUrls
          .split(',')
          .map((url) => url.trim())
      };
      const created = await petsService.createPet(newData);
      alert('Pet created successfully!');


      setCreatedPets((prev) => [...prev, created]);

    } catch (error) {
      console.error('Error creating pet:', error);
      alert('Failed to create pet');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Pet</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Category ID:</label>
          <input
            className="form-control"
            value={petData.category.id}
            onChange={handleCategoryIdChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            className="form-control"
            name="name"
            value={petData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photo URLs (comma-separated):</label>
          <input
            className="form-control"
            name="photoUrls"
            value={petData.photoUrls}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-select"
            name="status"
            value={petData.status}
            onChange={handleChange}
          >
            <option value="available">available</option>
            <option value="pending">pending</option>
            <option value="sold">sold</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create Pet
        </button>
      </form>

      <hr />
      <h4>Pets Created in This Session</h4>
      {createdPets.length === 0 ? (
        <div className="alert alert-info">No pets created yet.</div>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-light">
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '30%' }}>Name</th>
              <th style={{ width: '20%' }}>Status</th>
              <th style={{ width: '40%' }}>Photo URLs</th>
            </tr>
          </thead>
          <tbody>
            {createdPets.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.status}</td>
                <td>
                  {pet.photourls && pet.photourls.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CreatePet;
