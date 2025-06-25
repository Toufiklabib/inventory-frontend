import React, { useState, useEffect, useContext } from 'react'; // <-- useContext ইম্পোর্ট করুন
import toast from 'react-hot-toast';
import { FiSave, FiSearch } from 'react-icons/fi';
import { NotificationContext } from '../Context/NotificationContext/NotificationContext'; 
import api from '../api/api'; 
const UpdateProduct = () => {
    const { addNotification } = useContext(NotificationContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [formData, setFormData] = useState({ name: '', availableStock: '', binNumber: '' });
    const [error, setError] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

  
    useEffect(() => {
        if (productToUpdate) {
            setFormData({
                name: productToUpdate.name,
                availableStock: productToUpdate.availableStock,
                binNumber: productToUpdate.binNumber,
            });
        }
    }, [productToUpdate]);

  
    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setProductToUpdate(null);
        setSearchLoading(true);

        if (!searchTerm) {
            setError('Please enter a Product ID, Name, or BIN to search.');
            setSearchLoading(false);
            return;
        }

        api.get(`/products/search/${searchTerm}`)
            .then(response => {
                if (response.data) {
                    setProductToUpdate(response.data);
                    toast.success('Product found! You can now update it.');
                } else {
                    setError(`Product with "${searchTerm}" not found.`);
                    toast.error('Product not found!');
                }
            })
            .catch(err => {
                console.error("Search Error:", err);
                toast.error("An error occurred during search.");
                setError("Failed to search for the product.");
            })
            .finally(() => {
                setSearchLoading(false);
            });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const id = productToUpdate._id;
        
        api.patch(`/products/${id}`, formData)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    toast.success(`Product "${formData.name}" updated successfully!`);
                    addNotification(`Product updated: ${formData.name}`);
                    setProductToUpdate(null);
                    setSearchTerm('');
                } else {
                    toast.error('Could not update the product. No changes were made.');
                }
            })
            .catch(error => {
                console.error('Update Error:', error);
                toast.error('An error occurred while updating.');
            });
    };

    return (
        <div>
            <header className="bg-blue-600 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white text-center">
                        Search & Update Product
                    </h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Search Section */}
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-8">
                    <form onSubmit={handleSearch} className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by ID, Name, BIN..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-5 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500"
                            disabled={searchLoading}
                        >
                            {searchLoading ? 'Searching...' : <><FiSearch className="mr-2" /> Search</>}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                </div>

                {/* Update Form Section */}
                {productToUpdate && (
                    <div className="bg-slate-800 p-8 rounded-lg shadow-lg animate-fade-in">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Details for: <span className="text-blue-400">{productToUpdate.name}</span></h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="p_id" className="block text-sm font-medium text-slate-300 mb-2">Product ID</label>
                                    <input type="text" name="p_id" id="p_id" value={productToUpdate.p_id} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-slate-400 cursor-not-allowed" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="availableStock" className="block text-sm font-medium text-slate-300 mb-2">Available Stock</label>
                                    <input type="number" name="availableStock" id="availableStock" value={formData.availableStock} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required min="0" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="binNumber" className="block text-sm font-medium text-slate-300 mb-2">BIN Number</label>
                                    <input type="text" name="binNumber" id="binNumber" value={formData.binNumber} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                            <div className="mt-8 text-right">
                                <button type="submit" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                                    <FiSave className="mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UpdateProduct;