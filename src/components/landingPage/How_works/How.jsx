import React from 'react'

const How = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">How VisaFriendly Works in 60 Secs</h2>
            <p className="text-lg  text-center mb-10 max-w-xl">Skip the guesswork. See how finding a visa-friendly job really works.</p>

            {/* Sample Video */}
            <div className="w-full max-w-5xl mb-10">
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <video 
                        className="w-full h-auto"
                        controls
                        poster="/images/video-poster.jpg"
                        preload="metadata"
                    >
                        <source src="/videos/platform-demo.mp4" type="video/mp4" />
                        <source src="/videos/platform-demo.webm" type="video/webm" />
                        Your browser does not support the video.
                    </video>
                    
                    {/* Play button overlay for better UX */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 cursor-pointer">
                        <div className="bg-white rounded-full md:p-3 p-1 shadow-lg">
                            <svg className="md:w-10 w-6 md:h-10 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Button */}
            <button className="bg-[#313DEB] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition">Explore Platform →</button>
        </section>
    )
}

export default How
