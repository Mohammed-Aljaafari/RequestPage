"use client";

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { Roboto } from 'next/font/google'
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export default function ActivityForm() {
  const [formData, setFormData] = useState({
    OwnerName: '',
    Phone: '',
    activityName: '',
    startDate: '',
    endDate: '',
    time: '',
    location: '',
    prizes: '',
    additionalInfo: ''
  });
  
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // For Phone: Ensure only digits are allowed
    if (name === "Phone" && !/^\d*$/.test(value)) {
      return; // Prevent invalid input
    }

    // For Name: Ensure only letters (Arabic and English) and spaces are allowed
    if ((name === "OwnerName" || name === "activityName") && !/^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]*$/.test(value)) {
      return; // Prevent invalid input
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messages: string[] = [];

    // Validate that end date is not before start date
    if (formData.endDate < formData.startDate) {
      messages.push('End date cannot be before the start date.');
    }

    // Validate phone number length
    if (formData.Phone.length !== 10) {
      messages.push('Phone number must be exactly 10 digits long.');
    }

    // Validate owner name for empty strings
    if (!formData.OwnerName) {
      messages.push('Owner Name cannot be empty.');
    }

    // Validate activity name for empty strings
    if (!formData.activityName) {
      messages.push('Activity Name cannot be empty.');
    }

    // Show all error messages if any
    if (messages.length > 0) {
      setErrorMessages(messages);
      return; // Prevent form submission
    }

    setErrorMessages([]); // Clear error messages if validation passes

    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={roboto.className}>
       <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      
      <Image
        src="/IE.jpeg"
        alt='' // Path to your image in the public directory
        layout="fill"
        objectFit="cover" // Cover the entire container
        quality={100} // Set quality if needed
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          maxWidth: '400px',
          margin: 'auto',
          mt: 5,
          padding: 2,
          backgroundColor: 'whitesmoke', // Set the box background to white
          border: '1px solid #ccc',
          borderColor: 'black',
          borderRadius: 1,
          boxShadow: 1,
          position: 'relative', // Ensure the box appears above the image
          zIndex: 1 // Make sure the box is above the image
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'black' }}>
          Activity Form
        </Typography>

        {errorMessages.length > 0 && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessages.join(' ')} {/* Show all error messages */}
          </Typography>
        )}

        <TextField
          label="Name of the owner"
          name="OwnerName"
          value={formData.OwnerName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Phone"
          name="Phone"
          type="tel" // Use tel input type
          value={formData.Phone}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Name of the Activity"
          name="activityName"
          value={formData.activityName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Starting Date"
          type="date"
          name="startDate"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleChange}
          required
          fullWidth
          inputProps={{ min: today }} // Prevent past dates
        />

        <TextField
          label="Ending Date"
          type="date"
          name="endDate"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleChange}
          required
          fullWidth
          inputProps={{ min: today }} // Prevent past dates
        />

        <TextField
          label="Time"
          type="time"
          name="time"
          InputLabelProps={{ shrink: true }}
          value={formData.time}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Prizes"
          name="prizes"
          value={formData.prizes}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Additional Information"
          name="additionalInfo"
          multiline
          rows={4}
          value={formData.additionalInfo}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
}
