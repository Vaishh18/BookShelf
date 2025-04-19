import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StarRatings from 'react-star-ratings';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [genre, setGenre] = useState('Fiction'); // Default genre selection
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating with 0
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear, genre, description, rating }; // Include rating here
    setLoading(true);
    axios
      .post('http://localhost:8080/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-blue-100">
      <div className="p-6 max-w-3xl w-full">
        <BackButton />
        <h1 className="text-4xl font-semibold text-sky-700 my-6 text-center">Create New Book</h1>
        {loading && <Spinner />}
        <div className="flex flex-col border-2 border-sky-400 rounded-2xl bg-blue-50 shadow-lg p-8">
          
          {/* Title Input */}
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800"
            />
          </div>

          {/* Author Input */}
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author's name"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800"
            />
          </div>

          {/* Publish Year Input */}
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder="Enter publish year"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800"
            />
          </div>

          {/* Genre Selection */}
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800"
            >
              <option value="Fiction">Fiction</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Action">Action</option>
              <option value="Thriller">Thriller</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>

          {/* Description Textarea */}
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter book description"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800"
              rows="4"
            ></textarea>
          </div>

          {/* Rating */}
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Rating</label>
            <div className="flex items-center"></div>
            <StarRatings
             rating={rating}
             changeRating={(newRating) => setRating(newRating)}  
             numberOfStars={5}
             name="rating"
             starDimension="20px"
             starSpacing="5px"
             starHoverColor='gold'
             starRatedColor='gold'
            />
            </div>
          </div>

          {/* Save Button */}
          <button
            className="mt-4 p-4 bg-sky-500 hover:bg-sky-600 font-semibold text-white rounded-lg text-lg w-full transition-all duration-300"
            onClick={handleSaveBook}
          >
            Save Book
          </button>
        </div>
      </div>
   
  );
};

export default CreateBooks;
