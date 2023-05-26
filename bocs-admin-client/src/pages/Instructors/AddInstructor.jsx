import React, { useState } from 'react';
import { useMutation } from 'react-query';

const AddInstructor = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [photo, setPhoto] = useState(null);

  const addInstructorMutation = useMutation((instructorData) => {
    // Simulate API call to post instructor data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Resolve the promise after a delay (simulating success)
        resolve(instructorData);
      }, 1000);
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object to send form data including the photo
    const formData = new FormData();
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('photo', photo);

    // Call the mutation function to post instructor data
    addInstructorMutation.mutate(formData);
  };

  return (
    <div>
      <h1>Add Instructor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {addInstructorMutation.isLoading && <div>Adding instructor...</div>}
      {addInstructorMutation.isSuccess && <div>Instructor added successfully!</div>}
      {addInstructorMutation.isError && (
        <div>Error occurred while adding instructor</div>
      )}
    </div>
  );
};

export default AddInstructor;