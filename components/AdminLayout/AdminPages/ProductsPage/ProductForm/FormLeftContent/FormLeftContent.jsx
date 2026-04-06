import { FiTrash2 } from "react-icons/fi";

const FormLeftContent = ({
    form,
    handleChange,
    concerns,
    handleConcernsChange,
    deleteConcerns,
    addConcerns,
    skinType,
    handleSkinTypeChange,
    deleteSkinType,
    addSkinType,
    ingredients,
    handleIngredientChange,
    deleteIngredient,
    addIngredient,
}) => {
    return (
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            <div className="bg-white rounded-[1.5rem] border border-stone-100 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">

                <h2 className="font-semibold text-slate-900 text-sm sm:text-base">
                    Product Information
                </h2>

                {/* NAME */}
                <div>
                    <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Hydra Glow Serum"
                        className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                    />
                </div>

                {/* SHORT DESC */}
                <div>
                    <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
                        Short Description
                    </label>
                    <textarea
                        rows="2"
                        name="shortDescription"
                        value={form.shortDescription}
                        onChange={handleChange}
                        placeholder="Short product summary..."
                        className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                    />
                </div>

                {/* WEIGHT */}
                <div>
                    <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
                        Weight
                    </label>
                    <input
                        type="text"
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        placeholder="e.g., 50ml"
                        className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                    />
                </div>

                {/* BRAND + SKU */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Brand</label>
                        <select
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                        >
                            <option value="">Select Brand</option>
                            <option value="skin-routine">Skin Routine</option>
                            <option value="aminu">Aminu</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">SKU CODE</label>
                        <input
                            type="text"
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            placeholder="Auto-generated or enter SKU"
                            className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                        />
                    </div>
                </div>

                {/* PRICE + OLD PRICE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="1200"
                            className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Old Price (Discount)</label>
                        <input
                            type="number"
                            name="oldPrice"
                            value={form.oldPrice}
                            onChange={handleChange}
                            placeholder="1500"
                            className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                        />
                    </div>
                </div>

                {/* STOCK + CATEGORY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="20"
                            className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="cleanser">Cleanser</option>
                            <option value="serum">Serum</option>
                            <option value="moisturizer">Moisturizer</option>
                            <option value="sunscreen">Sunscreen</option>
                            <option value="toner">Toner</option>
                            <option value="cream">Cream</option>
                        </select>
                    </div>
                </div>

                {/* Dynamic Fields: Skin Type, Concern, Ingredients */}
                {[
                    { label: "Skin Type", items: skinType, onChange: handleSkinTypeChange, add: addSkinType, deleteItem: deleteSkinType },
                    { label: "Concern", items: concerns, onChange: handleConcernsChange, add: addConcerns, deleteItem: deleteConcerns },
                    { label: "Ingredients", items: ingredients, onChange: handleIngredientChange, add: addIngredient, deleteItem: deleteIngredient },
                ].map(({ label, items, onChange, add, deleteItem }, idx) => (
                    <div key={idx}>
                        <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">{label}</label>
                        {items.map((item, i) => (
                            <div key={i} className="flex gap-2 mt-2">
                                <input
                                    value={item}
                                    onChange={(e) => onChange(i, e.target.value)}
                                    className="w-full border border-stone-200 px-3 py-2 rounded text-xs sm:text-sm outline-none"
                                    placeholder={label.slice(0, -1)}
                                />
                                <button type="button" onClick={() => deleteItem(i)} className="text-red-500">
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={add}
                            className="mt-2 bg-slate-900 text-white px-3 py-2 rounded text-xs sm:text-sm"
                        >
                            Add {label.slice(0, -1)}
                        </button>
                    </div>
                ))}

                {/* DESCRIPTION */}
                <div>
                    <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Description</label>
                    <textarea
                        rows="4"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Product description..."
                        className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                    />
                </div>

                {/* ADDITIONAL INFO */}
                <div>
                    <label className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">Additional Info</label>
                    <textarea
                        rows="4"
                        name="additionalInfo"
                        value={form.additionalInfo}
                        onChange={handleChange}
                        placeholder="Shelf life, skin type..."
                        className="mt-1 sm:mt-2 w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                    />
                </div>

            </div>
        </div>
    );
};

export default FormLeftContent;