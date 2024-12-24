import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthClient } from '../../store/authSlice';
import { toast } from 'react-toastify';
import users from '../../../data/staff/users.json';
import { authenticateUser } from '../../utils/authUtils';

const LoginUser: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    if (selectedUser) {
      try {
        const user = await authenticateUser(selectedUser, password);
        dispatch(setAuthClient({ userName: user.fullName, tokens: {} }));
        toast.success(`Logged in as ${user.fullName}`);
        onCancel();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <select
        value={selectedUser || ''}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.fullName} value={user.emails[0]}>{user.fullName}</option>
        ))}
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLoginClick} disabled={!selectedUser || !password}>Login</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default LoginUser;