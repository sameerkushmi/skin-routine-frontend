"use client";

import { useState, useEffect } from "react";
import Header from "./Header/Header";
import FormLeftContent from "./FormLeftContent/FormLeftContent";
import FormRightContent from "./FormRightContent/FormRightContent";


export default function ProductForm({
    initialData = null,
    onSubmit,
    loading,
    mode = "add",
}) {

    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [usage, setUsage] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [skinType, setSkinType] = useState([])
    const [concerns, setConcerns] = useState([])

    const [form, setForm] = useState({
        name: "",
        brand: "",
        slug: "",
        shortDescription: "",
        description: "",
        category: "",
        price: "",
        oldPrice: "",
        stock: "",
        sku: "",
        featured: false,
        isActive: true,
        additionalInfo: "",
    });

    // ProductForm
    const resetForm = () => {
        setForm({
            name: "",
            brand: "",
            slug: "",
            shortDescription: "",
            description: "",
            category: "",
            price: "",
            oldPrice: "",
            stock: "",
            sku: "",
            featured: false,
            isActive: true,
            additionalInfo: "",
        });
        setImages([]);
        setImagePreview([]);
        setUsage([]);
        setIngredients([]);
        setSkinType([])
        setConcerns([])
    };

    // PREFILL DATA (EDIT MODE)
    useEffect(() => {
        if (initialData) {
            // AFTER ✅
            const { usage, skinType, concerns, ingredients, images, reviews, ...rest } = initialData;
            setForm(rest);  // only plain fields go into form state

            setUsage(usage || []);
            setSkinType(skinType || []);
            setIngredients(ingredients || []);
            setConcerns(concerns || []);

            if (initialData.images) {
                setImagePreview(initialData.images.map((img) => img.url));
            }
        }
    }, [initialData]);

    // handle change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // handle image
    const handleImage = (e) => {
        const files = Array.from(e.target.files);

        setImages(files);
        const preview = files.map((file) => URL.createObjectURL(file));
        setImagePreview(preview);
    };

    //  usage functions
    const addUsage = () => {
        setUsage([...usage, { step: "", instruction: "" }]);
    };

    const handleUsageChange = (index, field, value) => {
        const updated = [...usage];
        updated[index][field] = value;
        setUsage(updated);
    };

    const deleteUsage = (index) => {
        setUsage(usage.filter((_, i) => i !== index));
    };

    // ingrdient functions
    const addIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleIngredientChange = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
    };

    const deleteIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };
    // ingrdient functions
    const addSkinType = () => {
        setSkinType([...skinType, ""]);
    };

    const handleSkinTypeChange = (index, value) => {
        const updated = [...skinType];
        updated[index] = value;
        setSkinType(updated);
    };

    const deleteSkinType = (index) => {
        setSkinType(skinType.filter((_, i) => i !== index));
    };

    const addConcerns = () => {
        setConcerns([...concerns, ""]);
    };

    const handleConcernsChange = (index, value) => {
        const updated = [...concerns];
        updated[index] = value;
        setConcerns(updated);
    };

    const deleteConcerns = (index) => {
        setConcerns(concerns.filter((_, i) => i !== index));
    };

    // Handle submit form
    const handleSubmit = () => {
        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        images.forEach((img) => {
            formData.append("images", img);
        });

        formData.append("usage", JSON.stringify(usage));
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("skinType", JSON.stringify(skinType));
        formData.append("concerns", JSON.stringify(concerns));

        onSubmit(formData, resetForm);
    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <Header mode={mode} loading={loading} handleSubmit={handleSubmit} />

            {/* FORM */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT */}
                <FormLeftContent
                    form={form}
                    handleChange={handleChange}
                    skinType={skinType}
                    handleSkinTypeChange={handleSkinTypeChange}
                    deleteSkinType={deleteSkinType}
                    addSkinType={addSkinType}
                    ingredients={ingredients}
                    handleIngredientChange={handleIngredientChange}
                    deleteIngredient={deleteIngredient}
                    addIngredient={addIngredient}
                    concerns={concerns}
                    handleConcernsChange={handleConcernsChange}
                    deleteConcerns={deleteConcerns}
                    addConcerns={addConcerns}
                />

                {/* RIGHT */}
                <FormRightContent
                    form={form}
                    setForm={setForm}
                    handleImage={handleImage}
                    imagePreview={imagePreview}
                    usage={usage}
                    handleUsageChange={handleUsageChange}
                    deleteUsage={deleteUsage}
                    addUsage={addUsage}
                    handleChange={handleChange}
                />

            </div>

        </div>
    );
}