import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import petsService from '../services/petsService';


function UpdatePet() {
  const location = useLocation();
  const [petData, setPetData] = useState({
    id: null,
    name: '',
    status: 'available',
    photoUrls: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const petId = params.get('petId'); 
    if (!petId) {
      setLoading(false);
      return; 
    }

    const fetchPet = async () => {
      try {
        const pet = await petsService.getPetById(petId);
        const photoUrlsString = pet.photourls ? pet.photourls.join(', ') : '';
        setPetData({
          id: pet.id,
          name: pet.name,
          status: pet.status,
          photoUrls: photoUrlsString
        });
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await petsService.updatePet({
        id: petData.id,
        name: petData.name,
        status: petData.status,
        photoUrls: petData.photoUrls.split(',').map((url) => url.trim())
      });
      alert('Pet updated successfully!');
    } catch (error) {
      console.error('Error updating pet:', error);
      alert('Failed to update pet');
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading pet data...</div>;
  }
  if (!petData.id) {
    return <div className="container mt-4">No pet selected or not found.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Update Pet (No ID Shown)</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label className="form-label">Photo URLs (comma-separated):</label>
          <input
            className="form-control"
            name="photoUrls"
            value={petData.photoUrls}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Pet
        </button>
      </form>
    </div>
  );
}

export default UpdatePet;
