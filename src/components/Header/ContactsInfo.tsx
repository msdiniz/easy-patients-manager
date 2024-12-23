import React from 'react';
import LoadingMessage from './LoadingMessage';

interface ContactsInfoProps {
  loading: boolean;
  totalContacts: number | null;
}

const ContactsInfo: React.FC<ContactsInfoProps> = ({ loading, totalContacts }) => {
  return (
    <>
      {loading ? (
        <p style={{ fontSize: 'small' }}><LoadingMessage /></p>
      ) : (
        totalContacts !== null && (
          <p style={{ fontSize: 'small' }}>Total contacts: {totalContacts}</p>
        )
      )}
    </>
  );
};

export default ContactsInfo;