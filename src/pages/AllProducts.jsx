import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiArchive, FiBox, FiHash, FiMinusCircle, FiSearch, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { NotificationContext } from '../Context/NotificationContext/NotificationContext';

const AllProducts = () => {
    const { addNotification } = useContext(NotificationContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [decreaseAmounts, setDecreaseAmounts] = useState({});


    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
        api.get('/products')
            .then(response => {
                setProducts(response.data);
                const initialAmounts = response.data.reduce((acc, product) => {
                    acc[product._id] = '';
                    return acc;
                }, {});
                setDecreaseAmounts(initialAmounts);
            })
            .catch(() => {
                setError("Could not fetch products.");
                toast.error("Failed to load products.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDecreaseStock = (product) => {
        const decreaseAmount = parseInt(decreaseAmounts[product._id], 10);
        if (!decreaseAmount || decreaseAmount <= 0 || product.availableStock < decreaseAmount) {
            toast.error('Invalid amount or not enough stock.');
            return;
        }
        const newStock = product.availableStock - decreaseAmount;
        const updatedData = { ...product, availableStock: newStock };
        api.patch(`/products/${product._id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Stock updated!');
                    addNotification(`Stock for "${product.name}" decreased by ${decreaseAmount}.`);
                    setProducts(prev => prev.map(p => p._id === product._id ? { ...p, availableStock: newStock } : p));
                    setDecreaseAmounts(prev => ({ ...prev, [product._id]: '' }));
                }
            })
            .catch(() => toast.error('Stock update failed.'));
    };

    const handleInputChange = (productId, value) => {
        const numValue = value === '' ? '' : Math.max(0, parseInt(value, 10));
        setDecreaseAmounts({ ...decreaseAmounts, [productId]: numValue });
    };

    // Handler for search input
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter products by search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.p_id.toString().includes(search) ||
        product.binNumber.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="text-center text-white p-10 text-xl">Loading Products...</div>;
    if (error) return <div className="text-center text-red-500 p-10 text-xl">{error}</div>;

    return (
        <div>
            <header className="bg-blue-600 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">All Products Stock</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Search bar section added */}
                <div className="mb-8">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <FiSearch size={20} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by Name, ID, or BIN..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full pl-12 pr-4 py-3 border border-slate-700 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-800 text-slate-200"
                        />
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-10">
                        <FiArchive size={48} className="mx-auto text-slate-500" />
                        <p className="mt-4 text-xl text-slate-400">No products found.</p>
                        {products.length > 0 && <p className="text-slate-500">Try a different search term.</p>}
                        {products.length === 0 && <Link to="/add-product" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add First Product</Link>}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Now mapping filteredProducts */}
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="bg-slate-800 rounded-lg shadow-lg flex flex-col justify-between">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white truncate uppercase ">{product.name}</h3>
                                    <div className="mt-2 space-y-2 text-sm text-slate-400">
                                        <p><FiTag className="inline mr-2" /><strong>ID:</strong> {product.p_id}</p>
                                        <p><FiBox className="inline mr-2" /><strong>Stock:</strong> <span className="font-semibold text-lg text-white">{product.availableStock}</span></p>
                                        <p><FiHash className="inline mr-2" /><strong>BIN:</strong> {product.binNumber}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-700/50 rounded-b-lg">
                                    <div className="flex space-x-2">
                                        <input type="number" placeholder="Qty" value={decreaseAmounts[product._id] || ''} onChange={(e) => handleInputChange(product._id, e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-1 px-2 text-white" />
                                        <button onClick={() => handleDecreaseStock(product)} className="px-3 py-1 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 flex items-center justify-center disabled:opacity-50" disabled={!decreaseAmounts[product._id] || decreaseAmounts[product._id] <= 0 || product.availableStock < decreaseAmounts[product._id]} title="Decrease Stock">
                                            <FiMinusCircle />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllProducts;