export const Hotline = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-12">
              <h2 className="text-center text-3xl sm:text-4xl font-semibold text-blue-500 mb-6">
                24/7 Hotlines
              </h2>
              <p className="text-center text-base sm:text-lg text-gray-700 mb-8">
                For immediate assistance, contact our hotlines at any time. Our staff is available to help you with emergencies, inquiries, or scheduling an appointment.
              </p>
  
              {/* Hotline Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                {/* Hotline 1 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Emergency Hotline
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    +1 800 123 4567
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Available 24/7 for emergencies.
                  </p>
                </div>
  
                {/* Hotline 2 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Ambulance Hotline
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    +1 800 987 6543
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Get immediate ambulance assistance.
                  </p>
                </div>
  
                {/* Hotline 3 */}
                <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    General Inquiries
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    +1 800 555 7890
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Contact us for non-emergency services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  