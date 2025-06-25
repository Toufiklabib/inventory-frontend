import React, { useState, useContext } from 'react'; 
import toast from 'react-hot-toast';
import { FiSearch, FiTrash2 } from 'react-icons/fi';
import { NotificationContext } from '../Context/NotificationContext/NotificationContext'; 

import api from '../api/api';
const DeleteProduct = () => {
    const { addNotification } = useContext(NotificationContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [productToDelete, setProductToDelete] = useState(null);
    const [error, setError] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

    // প্রোডাক্ট সার্চ করার ফাংশন
    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setProductToDelete(null);
        setSearchLoading(true);

        if (!searchTerm) {
            setError('Please enter a Product ID, Name, or BIN to search.');
            setSearchLoading(false);
            return;
        }

        api.get(`/products/search/${searchTerm}`)
            .then(response => {
                if (response.data) {
                    setProductToDelete(response.data);
                    toast.success('Product found. You can now delete it.');
                } else {
                    setError(`Product with "${searchTerm}" not found.`);
                    toast.error('Product not found!');
                }
            })
            .catch(err => {
                console.error("Search Error:", err);
                toast.error("An error occurred during search.");
            })
            .finally(() => {
                setSearchLoading(false);
            });
    };
    
    // প্রোডাক্ট ডিলিট করার ফাংশন
    const handleDelete = () => {
        if (!productToDelete) return;

        // ডিলিট করার আগে ব্যবহারকারীকে সতর্ক করা
        if (window.confirm(`Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`)) {
            const id = productToDelete._id;

            // axios দিয়ে DELETE রিকোয়েস্ট পাঠানো
            api.delete(`/products/${id}`)
                .then(response => {
                    // সফলভাবে ডিলিট হয়েছে কিনা তা রেসপন্স থেকে চেক করা
                    if (response.data.deletedCount > 0) {
                        toast.success('Product deleted successfully!');
                        addNotification(`Product deleted: ${productToDelete.name}`);
                        
                        // UI থেকে প্রোডাক্টটি সরানোর জন্য স্টেট রিসেট করা
                        setProductToDelete(null);
                        setSearchTerm('');
                    } else {
                        toast.error('Could not delete the product. It might have been already deleted.');
                    }
                })
                .catch(error => {
                    console.error('Delete Error:', error);
                    toast.error('An error occurred while deleting.');
                });
        }
    };

    return (
        <div>
            <header className="bg-red-600 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white text-center">
                        Search & Delete Product
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
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-5 py-2 border border-transparent font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-slate-500"
                            disabled={searchLoading}
                        >
                             {searchLoading ? 'Searching...' : <><FiSearch className="mr-2" /> Search</>}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                </div>

                {/* Product Details & Delete Button Section */}
                {productToDelete && (
                    <div className="bg-slate-800 p-8 rounded-lg shadow-lg animate-fade-in">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Product to be Deleted</h2>
                        <div className="space-y-4 text-slate-300 border-b border-slate-700 pb-6 mb-6">
                            <p><strong>Name:</strong> <span className="text-white">{productToDelete.name}</span></p>
                            <p><strong>Product ID:</strong> <span className="text-white">{productToDelete.p_id}</span></p>
                            <p><strong>Available Stock:</strong> <span className="text-white">{productToDelete.availableStock}</span></p>
                            <p><strong>BIN Number:</strong> <span className="text-white">{productToDelete.binNumber}</span></p>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={handleDelete}
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                            >
                                <FiTrash2 className="mr-2" />
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DeleteProduct;
