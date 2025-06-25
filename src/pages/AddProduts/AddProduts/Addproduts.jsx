import React, { useState, useContext } from 'react'; 
import toast from 'react-hot-toast';
import { FiPlusCircle } from 'react-icons/fi';
import { NotificationContext } from '../../../Context/NotificationContext/NotificationContext'; 
import api from "../../../api/api";

const AddProduct = () => {

  const { addNotification } = useContext(NotificationContext);

  const [productData, setProductData] = useState({
    name: '',
    p_id: '',
    availableStock: '',
    binNumber: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/products', productData)
      .then(response => {
     
        if (response.data.insertedId) {
          toast.success(`Product "${productData.name}" added successfully!`);
          addNotification(`New product added: ${productData.name}`);
          setProductData({
            name: '',
            p_id: '',
            availableStock: '',
            binNumber: '',
          });
        } else {
          toast.error('Failed to add the product.');
        }
      })
      .catch(error => {
        console.error('Error adding product:', error);
        toast.error('An error occurred. Please try again.');
      });
  };

  return (
    <div>
      {/* Page Header */}
      <header className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white text-center">
            Add New Product
          </h1>
        </div>
      </header>

      {/* Form Section */}
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                <input type="text" name="name" id="name" value={productData.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              {/* Product ID */}
              <div>
                <label htmlFor="p_id" className="block text-sm font-medium text-slate-300 mb-2">Product ID</label>
                <input type="text" name="p_id" id="p_id" value={productData.p_id} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              {/* Available Stock */}
              <div>
                <label htmlFor="availableStock" className="block text-sm font-medium text-slate-300 mb-2">Available Stock</label>
                <input type="number" name="availableStock" id="availableStock" value={productData.availableStock} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required min="0" />
              </div>

              {/* BIN Number */}
              <div className="md:col-span-2">
                <label htmlFor="binNumber" className="block text-sm font-medium text-slate-300 mb-2">BIN Number</label>
                <input type="text" name="binNumber" id="binNumber" value={productData.binNumber} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-right">
              <button type="submit" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500">
                <FiPlusCircle className="mr-2" />
                Add Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;