import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8080/books/id/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-4xl font-semibold text-red-700 my-6 text-center">Delete Book</h1>

      {loading && <Spinner />}

      <div className="flex flex-col items-center border-2 border-red-400 rounded-2xl bg-red-50 shadow-lg p-8 mx-auto">
        <h3 className="text-2xl font-medium text-red-600 text-center mb-4">
          Are you sure you want to delete this book?
        </h3>

        <button
          className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg w-full transition-all duration-300"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>

        <button
          className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-lg w-full mt-4 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          No, Go Back
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
