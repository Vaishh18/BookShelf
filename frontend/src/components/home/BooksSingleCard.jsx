import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModel';
import StarRatings from 'react-star-ratings';


const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative bg-white border-2 border-blue-300 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
      {/* Publish Year Badge */}
      <h2 className="absolute top-3 right-4 bg-pink-200 text-pink-800 text-sm px-3 py-1 rounded-full font-semibold">
        {book.publishYear}
      </h2>

      {/* Book ID */}
      <h4 className="text-xs text-gray-400 mb-2">Book ID: {book.customId}</h4>



      {/* Book Title */}
      <div className="flex items-center gap-2 mb-3">
        <PiBookOpenTextLight className="text-blue-400 text-2xl" />
        <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2 mb-3">
        <BiUserCircle className="text-blue-400 text-2xl" />
        <h3 className="text-sm text-gray-600">{book.author}</h3>
      </div>

      {/* Genre Section */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-blue-400 text-lg font-medium">Genre:</span>
        <h3 className="text-sm text-gray-600">{book.genre}</h3>
      </div>
      {book.rating !== undefined && (
  <div className="mt-3">
    <StarRatings
      rating={book.rating}
      numberOfStars={5}
      starDimension="20px"
      starSpacing="3px"
      starRatedColor="gold"
    />
  </div>
)}


      {/* Operations */}
      <div className="flex justify-between items-center mt-4">
        {/* Show Details Modal */}
        <BiShow
           className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer transition-transform transform hover:scale-110"
           onClick={(event) => {
             event.stopPropagation(); // Prevent accidental navigation or reload
             console.log("Opening modal...");
             setShowModal(true);}}
        />
        {showModal && (
  <BookModal book={book} onClose={() => setShowModal(false)} />
)}
        {/* Info Link */}
        <Link to={`/books/details/${book.customId}`}>
          <BsInfoCircle className="text-3xl text-green-500 hover:text-green-700 transition-transform transform hover:scale-110" />
        </Link>
        {/* Edit Link */}
        <Link to={`/books/edit/${book.customId}`}>
          <AiOutlineEdit className="text-3xl text-yellow-500 hover:text-yellow-700 transition-transform transform hover:scale-110" />
        </Link>
        {/* Delete Link */}
        <Link to={`/books/delete/${book.customId}`}>
          <MdOutlineDelete className="text-3xl text-red-500 hover:text-red-700 transition-transform transform hover:scale-110" />
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
