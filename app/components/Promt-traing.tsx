"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";

const Prompt: React.FC = () => {
     const router = useRouter();
    
      const handleBackClick = () => {
        router.push("/understanding-the-basics");
      };
    return (
        <section
            className="flex flex-col  min-h-screen px-6 py-8 space-y-4"
            style={{ backgroundColor: "#F8F5EE" }}
        >
            {/* Header */}
            <h1 className="font-bold text-lg text-gray-800 text-left">
                Take Control of Your AI Experience
            </h1>
            {/* AI Safety & Performance Score Card */}
            <div className="w-full max-w-lg mb-6">
                <Image
                    src="/frame.svg"
                    alt="Performance Score"
                    width={750}
                    height={350}
                    className="rounded-lg"
                />
            </div>

            <div className="w-full max-w-4xl mx-auto">
                <Swiper spaceBetween={20} slidesPerView={1.5} breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}>
                    {/* Card 1 */}
                    <SwiperSlide>
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                            {/* Image Placeholder */}
                            <div className="w-full h-48 rounded-lg mb-4">
                                <Image
                                    src="/photo1.svg"
                                    alt="Performance Score"
                                    width={750}
                                    height={350}
                                    className="rounded-lg"
                                />
                            </div>
                            {/* Title */}
                            <h3 className="font-semibold text-gray-800 text-md text-center">
                                Understanding the Basics
                            </h3>
                            {/* Button */}
                            <button   onClick={handleBackClick} className="text-[#41B5AC] font-medium text-sm mt-2 self-start">Start Now</button>
                        </div>
                    </SwiperSlide>


                    {/* Card 2 */}
                    <SwiperSlide>
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                            {/* Image Placeholder */}
                            <div className="w-full h-48  rounded-lg mb-4">
                                <Image
                                    src="/photo2.svg"
                                    alt="Performance Score"
                                    width={750}
                                    height={350}
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="font-semibold text-gray-800 self-start text-md">
                                Practice Your Skills
                            </h3>
                            <button className="text-[#41B5AC] font-medium text-sm mt-2 self-start">Start Now</button>
                        </div>
                    </SwiperSlide>

                    {/* Card 3 */}
                    <SwiperSlide>
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                            {/* Image Placeholder */}
                            <div className="w-full h-48  rounded-lg mb-4">
                                <Image
                                    src="/photo3.svg"
                                    alt="Performance Score"
                                    width={750}
                                    height={350}
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-md self-start">
                                Learn From Examples
                            </h3>
                            <button className="text-[#41B5AC] font-medium text-sm mt-2 self-start">Start Now</button>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>




        </section>
    );
};

export default Prompt;