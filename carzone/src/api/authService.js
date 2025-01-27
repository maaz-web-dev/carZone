import performFetch from './api';

// Login user
export const login = (data) =>
  performFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }, false);

//  register user
export const register = (data) =>
  performFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }, false); 
