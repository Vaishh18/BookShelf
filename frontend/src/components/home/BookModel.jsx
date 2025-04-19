import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gradient-to-r from-blue-200 via-green-200 to-yellow-100 bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full bg-gradient-to-b from-white to-blue-100 rounded-2xl shadow-2xl p-6 flex flex-col relative animate-fadeIn"
      >
        {/* Close Button */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300"
          onClick={onClose}
        />

        {/* Publish Year Tag */}
        <h2 className="w-fit px-4 py-1 mb-2 bg-yellow-300 text-gray-700 rounded-lg text-sm font-semibold">
          {book.publishYear}
        </h2>

        {/* Book ID */}
        <h4 className="text-gray-400 text-sm truncate mb-4">Book ID: {book.customId}</h4>

        {/* Book Title */}
        <div className="flex items-center gap-2 mb-2">
          <PiBookOpenTextLight className="text-blue-400 text-2xl" />
          <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4">
          <BiUserCircle className="text-blue-400 text-2xl" />
          <h3 className="text-lg text-gray-600">{book.author}</h3>
        </div>

        {/* Book Description */}
        <p className="text-gray-700 mb-2 font-medium">
          Genre: <span className="text-blue-700 font-semibold">{book.genre || 'Not Specified'}</span>
        </p>
        <p className="text-gray-700">
          {book.description ||
            'This is where the book description or any additional details you want to display will be shown.'}
        </p>
        <p className="text-gray-700 mb-2 font-medium">
  Rating: <span className="text-orange-700 font-semibold">{book.rating || 'Not Rated'}</span>
</p>

      </div>
    </div>
  );
};

export default BookModal;
