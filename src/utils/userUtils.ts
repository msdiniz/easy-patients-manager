import axios from 'axios';
import { User } from '../models/UserModels'; 

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('/data/users.json');
    return response.data;
  } catch (error) {
    console.error('Error loading users from JSON file:', error);
    return [];
  }
};

export const fetchPhysicians = async (): Promise<User[]> => {
  const users = await fetchUsers();
  return filterPhysicians(users);
};

export const fetchUsersNotPhysicians = async (): Promise<User[]> => {
  const users = await fetchUsers();
  return users.filter(user => !user.roles.includes('Physician'));
};

const filterPhysicians = (users: User[]): User[] => {
  return users.filter(user => user.roles.includes('Physician'));
};
