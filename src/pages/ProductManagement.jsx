import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { productApi } from '../services/api';
import { toast } from 'react-toastify';

const ProductManagement = () => {
    const { products, loading, error } = useContext(ShopContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        image: [''],
        available: true
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.image];
        newImages[index] = value;
        setFormData(prev => ({
            ...prev,
            image: newImages
        }));
    };

    const addImageField = () => {
        setFormData(prev => ({
            ...prev,
            image: [...prev.image, '']
        }));
    };

    const removeImageField = (index) => {
        const newImages = formData.image.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            image: newImages
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productApi.updateProduct(editingProduct._id, formData);
                toast.success('Product updated successfully');
            } else {
                await productApi.createProduct(formData);
                toast.success('Product created successfully');
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                subCategory: '',
                image: [''],
                available: true
            });
        } catch (error) {
            toast.error(error.message || 'Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            subCategory: product.subCategory,
            image: product.image,
            available: product.available
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productApi.deleteProduct(id);
                toast.success('Product deleted successfully');
            } catch (error) {
                toast.error(error.message || 'Failed to delete product');
            }
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setFormData({
                            name: '',
                            description: '',
                            price: '',
                            category: '',
                            subCategory: '',
                            image: [''],
                            available: true
                        });
                        setIsModalOpen(true);
                    }}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Add New Product
                </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="px-4 py-2 border">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="px-4 py-2 border">{product.name}</td>
                                <td className="px-4 py-2 border">₹{product.price}</td>
                                <td className="px-4 py-2 border">{product.category}</td>
                                <td className="px-4 py-2 border">
                                    <span className={`px-2 py-1 rounded ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Sub Category</label>
                                <input
                                    type="text"
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Images</label>
                                {formData.image.map((image, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={image}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            className="flex-1 border rounded px-3 py-2"
                                            placeholder="Image URL"
                                            required
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImageField(index)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addImageField}
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                >
                                    Add Image
                                </button>
                            </div>
                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleInputChange}
                                    />
                                    Available
                                </label>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                >
                                    {editingProduct ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement; 