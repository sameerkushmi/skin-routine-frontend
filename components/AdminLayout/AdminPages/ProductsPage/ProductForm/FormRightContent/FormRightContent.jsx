import { FiTrash2, FiUpload } from "react-icons/fi";

const FormRightContent = ({
    form,
    setForm,
    handleImage,
    imagePreview,
    usage,
    handleUsageChange,
    deleteUsage,
    addUsage,
    handleChange,
}) => {
    return (
        <div className="space-y-4 sm:space-y-6">

            {/* IMAGE */}
            <div className="bg-white rounded-[1.5rem] border border-stone-100 p-4 sm:p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900 text-sm sm:text-base mb-3">
                    Product Image
                </h2>

                <label className="border-2 border-dashed border-stone-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition">
                    {imagePreview.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 mt-2 sm:mt-4">
                            {imagePreview.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className="w-full h-20 sm:h-24 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <FiUpload className="text-2xl text-stone-400 mb-2" />
                            <p className="text-xs text-stone-500">
                                Click to upload image
                            </p>
                        </>
                    )}
                    <input type="file" multiple className="hidden" onChange={handleImage} />
                </label>
            </div>

            {/* USAGE */}
            <div className="bg-white rounded-[1.5rem] border border-stone-100 p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="font-semibold text-slate-900 text-sm sm:text-base">Product Usage</h2>

                {usage.map((u, i) => (
                    <div
                        key={i}
                        className="border border-stone-200 rounded-xl p-3 sm:p-4 relative space-y-2"
                    >
                        <button
                            type="button"
                            onClick={() => deleteUsage(i)}
                            className="absolute top-2 right-2 text-red-500"
                        >
                            <FiTrash2 className="text-lg" />
                        </button>

                        <input
                            placeholder="Step Title"
                            value={u.step}
                            onChange={(e) => handleUsageChange(i, "step", e.target.value)}
                            className="w-full border border-stone-200 rounded px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm outline-none"
                        />
                        <textarea
                            placeholder="Instruction"
                            value={u.instruction}
                            onChange={(e) => handleUsageChange(i, "instruction", e.target.value)}
                            className="w-full border border-stone-200 rounded px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm outline-none"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addUsage}
                    className="bg-slate-900 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-xs sm:text-sm"
                >
                    Add Step
                </button>
            </div>

            {/* STATUS */}
            <div className="bg-white rounded-[1.5rem] border border-stone-100 p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="font-semibold text-slate-900 text-sm sm:text-base">Product Status</h2>

                <select
                    name="isActive"
                    value={form.isActive}
                    onChange={handleChange}
                    className="w-full border border-stone-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none"
                >
                    <option value={true}>Active</option>
                    <option value={false}>Draft</option>
                </select>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-slate-700">Featured Product</span>
                    <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    />
                </div>
            </div>

        </div>
    );
};

export default FormRightContent;