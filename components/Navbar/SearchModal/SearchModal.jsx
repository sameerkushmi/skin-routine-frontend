'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { VscClose, VscSearch } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import api from '@/components/utils/Api/api';

const SearchModal = ({ searchOpen, setSearchOpen }) => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const popularSearch = ['cleanser', 'serums', 'moisturizer', 'sunscreen']

    // Lock body scroll
    useEffect(() => {
        if (searchOpen) {
            const scrollY = window.scrollY;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;

            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
        };
    }, [searchOpen]);

    // Fetch live search suggestions as user types
    useEffect(() => {
        if (!inputValue) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const { data } = await api.get('/products/get-all', {
                    params: { search: inputValue, limit: 5 },
                });
                setSuggestions(data.products || []);
            } catch (err) {
                console.log(err);
            }
        };

        // debounce API call
        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [inputValue]);

    const handleSearchSubmit = (value) => {
        setSearchOpen(false);
        setInputValue('');
        setSuggestions([]);

        if (popularSearch.includes(value)) {
            router.push(`/shop?category=${value}`);
        }else{
            router.push(`/shop?search=${encodeURIComponent(value)}`);
        }

    };

    return (
        <AnimatePresence>
            {searchOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed left-0 top-0 w-full h-[100dvh]  bg-stone-900/40 backdrop-blur-md z-50 flex justify-center items-start pt-24 px-4"
                    onClick={() => setSearchOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="bg-white w-full max-w-2xl overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Input */}
                        <div className="relative flex items-center px-6 border-b border-stone-100">
                            <VscSearch className="text-stone-400" size={20} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search for products..."
                                className="w-full h-16 px-4 bg-transparent text-stone-800 placeholder:text-stone-400 focus:outline-none text-lg font-light"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSearchSubmit(inputValue);
                                }}
                            />
                            <button
                                className="p-1 rounded-full bg-stone-50 text-stone-400 hover:text-stone-900 transition-colors"
                                onClick={() => setSearchOpen(false)}
                            >
                                <VscClose size={20} />
                            </button>
                        </div>

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="max-h-64 overflow-y-auto">
                                {suggestions.map((product) => (
                                    <button
                                        key={product._id}
                                        className="w-full text-left px-6 py-3 hover:bg-stone-100 transition-colors"
                                        onClick={() => handleSearchSubmit(product.name)}
                                    >
                                        {product.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Trending / Popular Searches */}
                        <div className="p-6 bg-stone-50/50">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-4">
                                Trending Searches
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {popularSearch.map((item) => (
                                    <button
                                        key={item}
                                        className="px-4 capitalize py-1.5 bg-white border border-stone-200 rounded-full text-sm text-stone-600 hover:border-pink-300 hover:text-pink-500 transition-all duration-300"
                                        onClick={() => handleSearchSubmit(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;