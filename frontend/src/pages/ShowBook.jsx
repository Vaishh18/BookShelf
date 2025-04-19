import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ShowBook = () => {
  const { id } = useParams(); // customId
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/books/id/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error("AxiosError:", err);
        setError("Failed to load book details");
      });
  }, [id]);

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!book) return <div className="text-center mt-8 text-gray-600">Loading book details...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition duration-200 shadow-md"
        >
          ←
        </button>

        {/* Book Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-4 text-center">
            {book.title}
          </h2>
          <div className="space-y-3 text-gray-800">
            {/* Book ID */}
            <p><span className="font-semibold text-gray-600">Book ID:</span> {book.customId}</p>

            {/* Book Author */}
            <p><span className="font-semibold text-gray-600">Author:</span> {book.author}</p>

            {/* Book Genre */}
            <p><span className="font-semibold text-gray-600">Genre:</span> {book.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
