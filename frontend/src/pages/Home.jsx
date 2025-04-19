import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const genres = ['All', 'Fiction', 'Sci-Fi', 'Action', 'Thriller', 'Comedy'];

  const filteredBooks =
    selectedGenre === 'All'
      ? books
      : books.filter((book) => book.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-green-200 to-yellow-100 p-4 sm:p-6">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
        <button
          className="bg-blue-300 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto"
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto"
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      {/* Centered Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Whimsical Book Library
      </h1>

      {/* Genre Filter + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <Link to="/books/create">
          <MdOutlineAddBox className="text-blue-800 text-4xl sm:text-5xl hover:text-blue-600" />
        </Link>
      </div>

      {/* Data Rendering */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : showType === 'table' ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Home;
