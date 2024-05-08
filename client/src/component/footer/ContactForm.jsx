import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Close modal after form submission
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}
    
    >
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="message"
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" 
      
      sx={{
        width: "150px",
        height: "45px",
        backgroundColor: "#476C92",
        color: "white",
        fontWeight: "bold",
        borderRadius: "30px",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "white",
          color: "#476C92",
          borderColor: "#476C92",
          boxShadow: "none",
          border: "1px solid",
        },
      }}
      >Submit</Button>
    </form>
  );
}

export default ContactForm;
