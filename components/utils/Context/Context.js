import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api/api";
import toast from "react-hot-toast";

// 1. Create the context
const MyContext = createContext();

// 2. Create a provider component
export const MyProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    const [checkoutItems, setCheckoutItems] = useState([]);

    // user functions
    const fetchUser = async () => {
        try {
            const { data } = await api.get("/users/get-me")
            setUser(data)
        } catch (error) {
            console.log('line no.57 : fetch user error : ', error.response.data.message)
        }
    }

    // wishlist functions
    const fetchWishlist = async () => {
        try {
            const { data } = await api.get("/wishlists");
            setWishList(data.wishlist.products || []);
        } catch (error) {
            console.log("fetch wishlist error:", error);
        }
    };

    const addToWishlist = async (productId) => {
        if (!user) return toast.error("Please login first")

        try {
            const { data } = await api.post(`/wishlists/add`, { productId })
            toast.success(data.message || "Added to wishlist")
            fetchWishlist()
        } catch (error) {
            console.log("add to wishlist error:", error)
            toast.error(error.response?.data?.message || "Add To Wishlist Failed")
        }
    }

    const handleRemove = async (productId) => {
        try {
            const { data } = await api.delete(`/wishlists/${productId}`);
            toast.success(data.message || "Item removed");
            fetchWishlist()
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not remove item");
        }
    };

    const toggleWishlist = async (productId) => {
        if (wishList.find((item) => item._id === productId)) {
            handleRemove(productId);
        } else {
            addToWishlist(productId);
        }
    };

    const clearWishlist = async () => {
        try {
            const { data } = await api.delete('/wishlists/clear/all')
            toast.success(data.message || "Cleared Wishlist")
            fetchWishlist()
        } catch (error) {
            console.log("clear wishlist error:", error)
            toast.error("Failed to clear wishlist");
        }
    }

    // carts funtions
    const fetchCart = async () => {
        try {
            const { data } = await api.get('/carts/get-all');

            const formattedCart = data.cart.items.map((item) => ({
                _id: item.product._id,
                slug: item.product.slug,
                name: item.product.name,
                price: item.product.price,
                image: item.product.images?.[0]?.url,
                quantity: item.quantity,
            }));

            setCart(formattedCart);

        } catch (error) {
            console.log('fetch cart error:', error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) return toast.error("Please login first")

        try {
            const { data } = await api.post('/carts/add', { productId, quantity })
            toast.success(data.message)
            fetchCart()
        } catch (error) {
            console.log('line no.70 : add to cart error : ', error)
            toast.error('Failed to add product !')
        }
    }

    const removeFromCart = async (productId) => {
        try {
            const { data } = await api.delete(`/carts/remove/${productId}`)
            toast.success(data.message)
            fetchCart()
        } catch (error) {
            console.log('line no.71 : remove from cart error : ', error)
            toast.error('Failed to remove product !')
        }
    }

    const updateCart = async (productId, quantity) => {
        try {
            const { data } = await api.put('/carts/update', { productId, quantity })
            toast.success(data.message)
            fetchCart()
        } catch (error) {
            console.log('line no.72 : update cart error : ', error)
            toast.error('Failed to update product !')
        }
    }

    const clearCart = async () => {
        try {
            const { data } = await api.delete('/carts/clear');
            toast.success(data.message);
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    // logout
    const logout = async () => {
        try {
            const { data } = await api.post('/auth/logout')
            setUser(null)
            toast.success(data.message)
        } catch (error) {
            console.log("line no.76 - logout error :", error)
            toast.error('Log Out Failed !')
        }
    }

    useEffect(() => {

        const initUser = async () => {
            try {
                await fetchUser();
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initUser();
    }, []);

    // ✅ Use const
    const option = {
        user,
        logout,
        loading,
        setLoading,
        wishList,
        setWishList,
        fetchUser,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        addToWishlist,
        handleRemove,
        fetchWishlist,
        toggleWishlist,
        clearWishlist,
        checkoutItems,
        setCheckoutItems,
        fetchCart
    };

    return <MyContext.Provider value={option}>{children}</MyContext.Provider>;
};

// 3. Custom hook for easier consumption
export const useMyContext = () => useContext(MyContext);