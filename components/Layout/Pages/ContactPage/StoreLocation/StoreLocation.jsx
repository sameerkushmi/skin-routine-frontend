"use client";

const StoreLocation = () => {
    const address =
        process.env.NEXT_PUBLIC_ADDRESS ||
        "123 Main Street, City, Country";

    const storeHours =
        "Mon - Fri: 9 AM – 6 PM | Sat: 10 AM – 4 PM";

    const googleMapEmbed =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8315712866333!2d85.3346251!3d27.6916001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19af6be0642b%3A0x6e8066afd391ec40!2sPoonam%20Beauty%20Academy%20(Campus)!5e0!3m2!1sen!2snp!4v1774933865236!5m2!1sen!2snp";

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-[#FCFBF9]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

                {/* LEFT */}
                <div className="flex flex-col gap-4 md:gap-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-800">
                        Visit Our Store / Office
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-stone-500 leading-relaxed">
                        Visit us for personalized skincare guidance and experience our products firsthand.
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-stone-700">
                            Address
                        </p>
                        <p className="text-sm text-stone-500 leading-relaxed">
                            {address}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-stone-700">
                            Store Hours
                        </p>
                        <p className="text-sm text-stone-500 leading-relaxed">
                            {storeHours}
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full h-[260px] sm:h-[320px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg">
                    <iframe
                        src={googleMapEmbed}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        className="border-0"
                        title="Store Location Map"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default StoreLocation;