import performFetch from './api';

// Get all cars with pagination and sorting
export const getAllCars = async (page = 1, limit = 10, sort = 'createdAt') => {
  const response = await performFetch(`/cars?page=${page}&limit=${limit}&sort=${sort}`);
  return response || []; 
};

// Get car count
export const getCarCount = async () => {
  const response = await performFetch('/cars/count');
  return response || 0;
};

// Create a new car
export const createCar = (data) => 
  performFetch('/cars', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Update an existing car
export const updateCar = (id, data) => 
  performFetch(`/cars/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// Delete a car
export const deleteCar = (id) => 
  performFetch(`/cars/${id}`, {
    method: 'DELETE',
  });
