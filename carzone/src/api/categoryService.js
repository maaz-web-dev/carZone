import performFetch from './api';

// Get all categories
export const getAllCategories = () => performFetch('/categories');

// Create a new category
export const createCategory = (data) => performFetch('/categories', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Update an existing category
export const updateCategory = (id, data) => performFetch(`/categories/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

// Delete a category
export const deleteCategory = (id) => performFetch(`/categories/${id}`, {
  method: 'DELETE',
});
