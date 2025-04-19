import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-2 bg-white shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-200 text-gray-800 text-lg">
            <th className="border border-gray-400 px-4 py-2 rounded-md">No</th>
            <th className="border border-gray-400 px-4 py-2 rounded-md">Title</th>
            <th className="border border-gray-400 px-4 py-2 rounded-md hidden sm:table-cell">Author</th>
            <th className="border border-gray-400 px-4 py-2 rounded-md hidden sm:table-cell">Publish Year</th>
            <th className="border border-gray-400 px-4 py-2 rounded-md">Genre</th>
            <th className="border border-gray-400 px-4 py-2 rounded-md hidden sm:table-cell">Description</th>
            <th className="border border-gray-400 px-4 py-2 rounded-md">Operations</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="h-12 bg-gradient-to-r from-blue-100 to-green-100 hover:bg-blue-300 transition-all duration-300"
            >
              <td className="border border-gray-300 text-center px-2 rounded-md font-semibold">{index + 1}</td>
              <td className="border border-gray-300 text-center px-2 rounded-md">{book.title}</td>
              <td className="border border-gray-300 text-center px-2 rounded-md hidden sm:table-cell">
                {book.author}
              </td>
              <td className="border border-gray-300 text-center px-2 rounded-md hidden sm:table-cell">
                {book.publishYear}
              </td>
              <td className="border border-gray-300 text-center px-2 rounded-md">{book.genre || 'N/A'}</td>
              <td className="border border-gray-300 text-center px-2 rounded-md hidden sm:table-cell">
                {book.description.length > 60
                  ? `${book.description.substring(0, 60)}...`
                  : book.description || 'No description available'}
              </td>
              <td className="border border-gray-300 text-center px-2 rounded-md">
                <div className="flex justify-center gap-x-4 sm:gap-x-6">
                  <Link to={`/books/details/${book.customId}`}>
                    <BsInfoCircle className="text-2xl sm:text-3xl text-green-600 hover:text-green-800 transition-transform transform hover:scale-110" />
                  </Link>
                  <Link to={`/books/edit/${book.customId}`}>
                    <AiOutlineEdit className="text-2xl sm:text-3xl text-yellow-500 hover:text-yellow-700 transition-transform transform hover:scale-110" />
                  </Link>
                  <Link to={`/books/delete/${book.customId}`}>
                    <MdOutlineDelete className="text-2xl sm:text-3xl text-red-500 hover:text-red-700 transition-transform transform hover:scale-110" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
