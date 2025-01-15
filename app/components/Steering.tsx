"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Summary: React.FC = () => {
    const router = useRouter();
    
    const handleBackClick = () => {
      router.push("/prompt-training");
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
                    src="/Group.svg"
                    alt="Performance Score"
                    width={750}
                    height={350}
                    className="rounded-lg"
                />
            </div>

            {/* Feature Cards */}
            <div className="mb-8 w-full max-w-lg">


                <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between items-start w-full max-w-md mb-5">
                    <h3 className="text-[#41B5AC] font-semibold text-lg mb-2">
                        Learn to Write Effective Prompts
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Train yourself to ask AI the right questions for safe and accurate responses.
                    </p>
                    <button onClick={handleBackClick} className="bg-[#41B5AC] text-white text-sm font-medium px-3 py-1 rounded-lg">
                        Start Training
                    </button>
                </div>



                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl shadow-md p-4 flex flex-col">
                        <div className="bg-[#F3F7F5] w-10 h-10 rounded-full flex items-center justify-center mb-5">
                            <img src="/icon1.png" alt="Test AI with Fake Data Icon" className="w-5 h-5" />
                        </div>
                        <h3 className="text-gray-800 font-medium text-xl">Test AI with Fake Data</h3>
                        <p className="text-[#41B5AC] text-sm font-medium mt-2 flex items-center">
                            Begin Testing
                            <Image
                                src="/round.svg"
                                alt="Performance Score"
                                width={30}
                                height={30}
                                className="rounded-lg ml-2"
                            />
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-3xl shadow-md p-4 flex flex-col">
                        <div className="bg-[#F3F7F5] w-10 h-10 rounded-full flex items-center justify-center mb-5">
                            <img src="/icon2.png" alt="Test AI with Fake Data Icon" className="w-5 h-5" />
                        </div>
                        <h3 className="text-gray-800 font-medium text-xl">Need Assistance?</h3>
                        <p className="text-[#41B5AC] text-sm font-medium mt-2 flex items-center">
                            Expert Help
                            <Image
                                src="/round.svg"
                                alt="Performance Score"
                                width={30}
                                height={30}
                                className="rounded-lg ml-2"
                            />

                        </p>
                    </div>
                </div>

            </div>


            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
                <h3 className="text-[#41B5AC] font-semibold text-lg mb-4">
                    Your AI Data Settings
                </h3>
                <div className="grid grid-cols-2 gap-y-4">
                    {/* Option 1 */}
                    <label className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full border-[#41B5AC] border-2 bg-white">
                            <input
                                type="checkbox"
                                className="opacity-0 absolute"
                                defaultChecked
                            />
                            <svg
                                className="w-4 h-4 text-[#41B5AC]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-gray-800 text-sm">AI Interaction</span>
                    </label>

                    {/* Option 2 */}
                    <label className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full border-[#41B5AC] border-2 bg-white">
                            <input
                                type="checkbox"
                                className="opacity-0 absolute"
                                defaultChecked
                            />
                            <svg
                                className="w-4 h-4 text-[#41B5AC]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-gray-800 text-sm">AI Interaction</span>
                    </label>

                    {/* Option 3 */}
                    <label className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full border-[#41B5AC] border-2 bg-white">
                            <input
                                type="checkbox"
                                className="opacity-0 absolute"
                                defaultChecked
                            />
                            <svg
                                className="w-4 h-4 text-[#41B5AC]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-gray-800 text-sm">Data Access</span>
                    </label>

                    {/* Option 4 */}
                    <label className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full border-[#41B5AC] border-2 bg-white">
                            <input
                                type="checkbox"
                                className="opacity-0 absolute"
                                defaultChecked
                            />
                            <svg
                                className="w-4 h-4 text-[#41B5AC]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-gray-800 text-sm">Data Access</span>
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg flex items-center justify-between">
                {/* Left Section */}
                <div>
                    <h3 className="text-[#41B5AC] font-semibold text-lg mb-2">
                        Compliance & Credentials
                    </h3>
                    <p className="text-gray-600 text-sm">We’re Certified</p>
                    <div className="flex items-center mt-4">
                        {/* Placeholder for Icon */}
                        <div className="w-6 h-6 bg-[#F3F7F5] rounded-full flex items-center justify-center mr-2">
                            <img src="/Certificate.svg" alt="Test AI with Fake Data Icon" className="w-5 h-5" />
                        </div>
                        <p className="text-gray-800 text-sm font-medium">HIPPA</p>
                    </div>
                </div>

                {/* Right Section */}
                <button className="bg-[#41B5AC] text-white rounded-lg px-4 py-1.5 text-sm mt-16">
                    Learn More
                </button>
            </div>




        </section>
    );
};

export default Summary;