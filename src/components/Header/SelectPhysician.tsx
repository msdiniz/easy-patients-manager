import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthClient, clearAuthClient } from '../../store/authSlice';
import { Tokens } from '../../types/types';
import { toast } from 'react-toastify';
import users from '../../../data/staff/users.json';
import { authenticateUser } from '../../utils/authUtils';

interface SelectPhysicianProps {
  onPhysicianSelected: () => void;
}

const SelectPhysician: React.FC<SelectPhysicianProps> = ({ onPhysicianSelected }) => {
  const [selectedPhysician, setSelectedPhysician] = useState<string | null>(null);
  const [isManaging, setIsManaging] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message event:', event);
      const data = event.data;
      console.log('Event data:', data);
      if (data.source && data.source.startsWith('react-devtools')) return; // Ignore messages from React DevTools
      if (data && typeof data === 'object') {
        const hasRequiredFields = 'access_token' in data && 'scope' in data && 'token_type' in data && 'expiry_date' in data;
        console.log('Has required fields:', hasRequiredFields);
        if (hasRequiredFields) {
          const tokens = data as Tokens;
          console.log('Received tokens:', tokens);

          // Fetch user info to get the user's name
          fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          })
            .then((response) => response.json())
            .then((userInfo) => {
              const userName = userInfo.name;
              console.log('Fetched user info:', userInfo);
              console.log('Dispatching setAuthClient with tokens and userName');
              dispatch(setAuthClient({ tokens, userName }));
              console.log('Dispatched setAuthClient with tokens and userName');
            })
            .catch((error) => {
              console.error('Error fetching user info:', error);
              toast.error('Error fetching user info');
            });
        } else {
          console.error('Invalid tokens received:', data);
          toast.error('Invalid tokens received');
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  const handleManageClick = async () => {
    if (selectedPhysician) {
      try {
        const user = await authenticateUser(selectedPhysician, ''); // Assuming password is not needed for this action
        dispatch(setAuthClient({ userName: user.fullName, tokens: {} }));
        toast.success(`Managing ${user.fullName}`);
        setIsManaging(true);
        onPhysicianSelected(); // Notify parent component
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleDeselectClick = () => {
    dispatch(clearAuthClient());
    setSelectedPhysician(null);
    setIsManaging(false);
    toast.success('Deselected physician');
  };

  return (
    <div>
      <select
        value={selectedPhysician || ''}
        onChange={(e) => setSelectedPhysician(e.target.value)}
        disabled={isManaging}
      >
        <option value="" disabled>Select a physician</option>
        {users.filter(user => user.roles.includes('Physician')).map((user) => (
          <option key={user.fullName} value={user.emails[0]}>{user.fullName}</option>
        ))}
      </select>
      {!isManaging ? (
        <button onClick={handleManageClick} disabled={!selectedPhysician}>Manage this physician</button>
      ) : (
        <button onClick={handleDeselectClick}>Deselect physician</button>
      )}
    </div>
  );
};

export default SelectPhysician;
