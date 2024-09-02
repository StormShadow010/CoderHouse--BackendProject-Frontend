import { useEffect, useState } from "react";
import { productPost, usersGet } from "../../controllers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    photo: "",
    category: "",
    price: parseFloat(0.0),
    stock: parseInt(0),
    supplier_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API endpoint for creating new product
    const response = await productPost(`/`, formData);
    if (response.statusCode === 201) {
      Swal.fire({
        title: "Success",
        text: "Product created successfully!",
        icon: "success",
        confirmButtonText: "Go to products",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate(`/products/adminProducts`);
        }
      });
    }
  };

  const handleSessionUser = async () => {
    try {
      let responseUser = await usersGet(`/`);
      setUserSession(responseUser.response);
    } catch (error) {
      console.error("Failed to fetch user session:", error);
    }
  };

  useEffect(() => {
    handleSessionUser();
  }, []);

  useEffect(() => {
    if (userSession) {
      setFormData((prevData) => ({
        ...prevData,
        supplier_id: userSession._id.toString(),
      }));
    }
  }, [userSession]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#144272]">
      <div className="flex flex-col space-y-10 w-[90%]">
        <h3 className="text-center text-4xl text-white font-medium">
          New Product
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 text-white">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 text-white">
            <input
              type="text"
              placeholder="Photo (URL)"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300">
            <label className="text-white" htmlFor="category">
              Choose a category:
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="border-none outline-none"
            >
              <option value="">--Please choose an option--</option>
              <option value="NINTENDO">NINTENDO</option>
              <option value="XBOX">XBOX</option>
              <option value="PLAYSTATION">PLAYSTATION</option>
            </select>
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 text-white">
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              max="100"
              step="0.01" // Permite decimales
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 text-white">
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="1"
              max="100"
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 flex justify-center items-center mx-auto"
          >
            Create a new Product
          </button>
        </form>
      </div>
    </div>
  );
};
