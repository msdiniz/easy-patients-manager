import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ApiDataSource from '../../apiContacts/apiDataSource';
import { Tokens } from '../../types/types';
import { toast } from 'react-toastify';

const GoogleContacts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const tokens = useSelector((state: RootState) => state.auth.tokens) as Tokens;

  const apiDataSource = useMemo(() => {
    return tokens ? new ApiDataSource({
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token!,
      scope: tokens.scope!,
      token_type: tokens.token_type!,
      expiry_date: tokens.expiry_date!
    }) : null;
  }, [tokens]);

  useEffect(() => {
    if (apiDataSource) {
      setLoading(true);
      apiDataSource.fetchContacts().then((contacts) => {
        console.log(`Total number of patients: ${contacts.length}`);
        setTotalContacts(contacts.length);
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
        toast.error('Error fetching contacts');
      });
    }
  }, [apiDataSource]);

  return (
    <div>
      {loading ? (
        <p style={{ fontSize: 'small' }}>Fetching contacts...</p>
      ) : (
        totalContacts !== null && (
          <p style={{ fontSize: 'small' }}>Total contacts: {totalContacts}</p>
        )
      )}
    </div>
  );
};

export default GoogleContacts;