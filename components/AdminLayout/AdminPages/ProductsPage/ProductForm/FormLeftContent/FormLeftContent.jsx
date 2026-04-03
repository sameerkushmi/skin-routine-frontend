import { FiTrash2 } from "react-icons/fi"

const FormLeftContent = ({
    form, handleChange, concerns,
    handleConcernsChange, deleteConcerns, addConcerns, skinType,
    handleSkinTypeChange, deleteSkinType, addSkinType, ingredients, handleIngredientChange,
    deleteIngredient, addIngredient
}) => {
    return (
        <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-[2rem] border border-stone-100 p-6 shadow-sm space-y-5">

                <h2 className="font-semibold text-slate-900">
                    Product Information
                </h2>

                {/* NAME */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Hydra Glow Serum"
                        className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                    />
                </div>

                {/* SHORT DESC */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Short Description
                    </label>

                    <textarea
                        rows="2"
                        name="shortDescription"
                        value={form.shortDescription}
                        onChange={handleChange}
                        placeholder="Short product summary..."
                        className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                    />
                </div>



                <div className="md:grid md:grid-cols-2 gap-4">
                    {/* BRAND */}
                    <div>
                        <label className="text-xs font-semibold text-stone-500 uppercase">
                            Brand
                        </label>


                        <select
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                        >
                            <option value="">Select Brand</option>
                            <option value={'skin-routine'}>Skin Routine</option>
                            <option value={'aminu'}>Aminu</option>
                        </select>
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="text-xs font-semibold text-stone-500 uppercase">
                            SKU CODE
                        </label>

                        <input
                            type="text"
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            placeholder="Auto-generated or enter SKU"
                            className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                        />
                    </div>
                </div>

                {/* PRICE / STOCK */}
                <div className="md:grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-stone-500 uppercase">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="1200"
                            className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                        />
                    </div>
                    {/* Old Price */}
                    <div>
                        <label className="text-xs font-semibold text-stone-500 uppercase">
                            Old Price (Discount)
                        </label>

                        <input
                            type="number"
                            name="oldPrice"
                            value={form.oldPrice}
                            onChange={handleChange}
                            placeholder="1500"
                            className="mt-2 w-full border outline-none border-stone-200 rounded-lg px-4 py-3 text-sm"
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 gap-4">
                    {/* STOCK */}
                    <div>
                        <label className="text-xs font-semibold text-stone-500 uppercase">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="20"
                            className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="text-xs font-semibold text-stone-500 uppercase">
                            Category
                        </label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value={'cleanser'}>Cleanser</option>
                            <option value={'serum'}>Serum</option>
                            <option value={'moisturizer'}>Moisturizer</option>
                            <option value={'sunscreen'}>Sunscreen</option>
                            <option value={'toner'}>Toner</option>
                            <option value={'cream'}>Cream</option>
                        </select>
                    </div>
                </div>

                {/* SKIN TYPE */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Skin Type
                    </label>

                    {skinType.map((skin, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={skin}
                                onChange={(e) => handleSkinTypeChange(i, e.target.value)}
                                className="w-full border outline-none border-stone-200 px-4 py-2 rounded"
                                placeholder="Skin Type"
                            />

                            <button
                                type="button"
                                onClick={() => deleteSkinType(i)}
                                className="text-red-500"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                    <div>
                        <button
                            type="button"
                            onClick={addSkinType}
                            className="mt-2 bg-slate-900 text-white px-3 py-2 rounded text-xs"
                        >
                            Add Skin Type
                        </button>
                    </div>
                </div>
                {/* CONCERN */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Concern
                    </label>

                    {concerns.map((concern, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={concern}
                                onChange={(e) => handleConcernsChange(i, e.target.value)}
                                className="w-full border outline-none border-stone-200 px-4 py-2 rounded"
                                placeholder="Concern"
                            />

                            <button
                                type="button"
                                onClick={() => deleteConcerns(i)}
                                className="text-red-500"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                    <div>
                        <button
                            type="button"
                            onClick={addConcerns}
                            className="mt-2 bg-slate-900 text-white px-3 py-2 rounded text-xs"
                        >
                            Add Skin Type
                        </button>
                    </div>
                </div>

                {/* INGREDIENT */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Ingredients
                    </label>

                    {ingredients.map((ing, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={ing}
                                onChange={(e) => handleIngredientChange(i, e.target.value)}
                                className="w-full border outline-none border-stone-200 px-4 py-2 rounded"
                                placeholder="Ingredient"
                            />

                            <button
                                type="button"
                                onClick={() => deleteIngredient(i)}
                                className="text-red-500"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                    <div>
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="mt-2 bg-slate-900 text-white px-3 py-2 rounded text-xs"
                        >
                            Add Ingredient
                        </button>
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Product description..."
                        className="mt-2 w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none"
                    />
                </div>

                {/* Additional Info Field */}
                <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase">
                        Additional Info
                    </label>

                    <textarea
                        rows="4"
                        name="additionalInfo"
                        value={form.additionalInfo}
                        onChange={handleChange}
                        placeholder="Shelf life, skin type..."
                        className="mt-2 w-full outline-none border border-stone-200 rounded-lg px-4 py-3 text-sm"
                    />
                </div>

            </div>

        </div>
    )
}

export default FormLeftContent