import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';
import ContactForm from './ContactForm';

const ContactModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}
      style={{color: '#476C92', textTransform: 'capitalize', fontWeight: 'bold'}}>Contact Us</Button>
     
      <Modal open={open} onClose={handleClose}>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          backgroundColor: 'white', 
          borderRadius: '10px',
          width: '65%',
          }}>
          <ContactForm onClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}

export default ContactModal;
