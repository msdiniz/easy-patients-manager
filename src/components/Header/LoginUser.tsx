import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../store/authUserSlice';
import { toast } from 'react-toastify';
import users from '../../../data/staff/users.json';
import { authenticateUser } from '../../utils/authUtils';


const LoginUser: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleLoginClick = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
    if (selectedUser) {
      try {
        const user = await authenticateUser(selectedUser, password);
        dispatch(setAuthUser({ userName: user.fullName, roles: user.roles }));
        toast.success(`Logged in as ${user.fullName}`);
        onCancel();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleLoginClick}>
      <label htmlFor="username">Username</label>
      <select
        id="username"
        value={selectedUser || ''}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.fullName} value={user.emails[0]}>{user.fullName}</option>
        ))}
      </select>
      <input
        type="hidden"
        name="username"
        value={selectedUser || ''}
        readOnly
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <button type="submit" disabled={!selectedUser || !password}>Login</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default LoginUser;