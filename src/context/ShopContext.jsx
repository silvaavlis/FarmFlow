import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { productApi } from "../services/api";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = 'http://localhost:5000';
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [showBestsellers, setShowBestsellers] = useState(false);
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productApi.getAllProducts();
                if (response.success) {
                    setProducts(response.products);
                }
            } catch (error) {
                setError(error.message);
                toast.error('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (itemId, quantity = 1) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += quantity;
        }
        else{
            cartData[itemId] = quantity;
        }
        
        setCartItem(cartData);
        toast.success('Item Added to Cart');
    }

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(quantity => {
            if (quantity > 0) {
                totalCount += quantity;
            }
        });
        return totalCount;
    }

    const updateQuantity = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItem(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const itemId in cartItems){
            let itemInfo = products.find((product)=>product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    }

    const getCartItems = () => {
        const items = [];
        for(const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product && cartItems[itemId] > 0) {
                items.push({
                    _id: itemId,
                    name: product.name,
                    price: product.price,
                    image: product.image[0],
                    quantity: cartItems[itemId]
                });
            }
        }
        return items;
    }

    // Filter functions
    const getFilteredProducts = () => {
        let filtered = [...products];

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Type filter
        if (selectedType !== 'all') {
            filtered = filtered.filter(product => product.subCategory === selectedType);
        }

        // Price range filter
        filtered = filtered.filter(product => 
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        // Bestseller filter
        if (showBestsellers) {
            filtered = filtered.filter(product => product.bestseller);
        }

        // Search filter
        if (search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sorting
        switch (sortBy) {
            case 'price-low-high':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return filtered;
    };

    // Get unique categories for filter dropdown
    const getCategories = () => {
        const categories = products.map(product => product.category);
        return ['all', ...new Set(categories)];
    };

    // Get unique types for filter dropdown
    const getTypes = () => {
        const types = products.map(product => product.subCategory);
        return ['all', ...new Set(types)];
    };

    // Get price range for filter
    const getPriceRange = () => {
        const prices = products.map(product => product.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    };

    const contextValue = {
        currency,
        delivery_fee,
        backendUrl,
        token,
        setToken,
        navigate,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItem,
        products,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        selectedType,
        setSelectedType,
        priceRange,
        setPriceRange,
        showBestsellers,
        setShowBestsellers,
        sortBy,
        setSortBy,
        getFilteredProducts,
        getCategories,
        getTypes,
        getPriceRange,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        getCartItems
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

