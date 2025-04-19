import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StarRatings from 'react-star-ratings';


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch book data to populate fields on load
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/books/id/${id}`)
      .then((response) => {
        const { title, author, publishYear, genre, description,rating} = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setGenre(genre);
        setDescription(description);
        setRating(rating || 0);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      });
  }, [id]);

  // Handle form submission to update the book
  const handleEditBook = () => {
    const data = { title, author, publishYear,rating, genre, description };
    setLoading(true);
    axios
      .put(`http://localhost:8080/books/id/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred!', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-blue-100">
      <div className="p-6 max-w-3xl w-full">
        <BackButton />
        <h1 className="text-4xl font-semibold text-sky-700 my-6 text-center">Edit Book</h1>

        {loading && <Spinner />}

        <div className="flex flex-col border-2 border-sky-400 rounded-2xl bg-blue-50 shadow-lg p-8">
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author's name"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder="Enter publish year"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              <option value="Fiction">Fiction</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Action">Action</option>
              <option value="Thriller">Thriller</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>

          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter book description"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              rows="4"
            ></textarea>
          </div>

          <div className='my-4'>
            <label className="text-lg font-medium text-gray-600 mb-2 block">Rating</label>
            {rating !== null && (
  <StarRatings
    rating={rating}
    changeRating={(newRating)=>setRating(newRating)}
    numberOfStars={5}
    starDimension="30px"
    starSpacing="5px"
    starRatedColor='gold'
    starHoverColor='gold'
  />
)}

          </div>

          <button
            className="p-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-lg w-full transition-all duration-300 mt-4"
            onClick={handleEditBook}
          >
            Save Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
