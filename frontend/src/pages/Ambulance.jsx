export const Ambulance = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-12">
              <h2 className="text-center text-3xl sm:text-4xl font-semibold text-blue-500 mb-6">
                24/7 Ambulance Services
              </h2>
              <p className="text-center text-base sm:text-lg text-gray-700 mb-8">
                Our 24/7 ambulance services are available to ensure that you and your loved ones receive prompt, professional emergency transport when needed.
              </p>
  
              {/* Ambulance Service Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                {/* Feature 1 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Emergency Response
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our team is ready to respond to emergency situations quickly and efficiently, available 24/7.
                  </p>
                </div>
  
                {/* Feature 2 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Advanced Equipment
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our ambulances are equipped with state-of-the-art medical equipment to handle critical situations.
                  </p>
                </div>
  
                {/* Feature 3 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Skilled Professionals
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our team of paramedics and medical professionals provide top-notch care during transport.
                  </p>
                </div>
  
                {/* Feature 4 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Nationwide Coverage
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    We provide ambulance services across the country, ensuring you're never too far from help.
                  </p>
                </div>
  
                {/* Feature 5 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Fast Arrival
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our ambulances are strategically placed to ensure the fastest response times in your area.
                  </p>
                </div>
  
                {/* Feature 6 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Call Us Anytime
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Contact us at our 24/7 hotline: <span className="font-semibold">+1 800 987 6543</span> for immediate assistance.
                  </p>
                </div>
              </div>
  
              <div className="mt-12 text-center">
                <p className="text-lg text-gray-800">
                  We're here for you, any time, any day. For emergencies, call our hotline and our team will be dispatched immediately.
                </p>
                <p className="text-lg text-blue-500 font-semibold mt-4">
                  +1 800 987 6543
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  