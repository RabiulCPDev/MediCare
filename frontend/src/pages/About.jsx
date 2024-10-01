export const About = () => {
  return (
    <div className="w-full h-fit bg-gradient-to-r from-blue-100 via-slate-200 to-blue-100">
      <div className="flex justify-between">
        <div className="m-4 p-2 justify-center w-2/3">
          <h1 className="text-4xl font-semibold text-gray-800">About Medicare</h1>
            <div >
            <p className="text-justify mt-4 font-serif leading-relaxed tracking-wide text-lg ">
            Welcome to <b>Medicare</b>, where your health and well-being are our top
            priorities. Founded with a mission to promote a <b>Healthy Life</b>, we are
            committed to providing exceptional medical care and services to all
            of our patients. Our team of experienced healthcare professionals is
            dedicated to ensuring that you receive personalized and
            compassionate care, using the latest advancements in medical
            technology and treatment. <br />
             At <b>Medicare</b>, we believe in a holistic
            approach to healthcare. Our motto, <b>Healthy Life</b>, reflects our
            dedication to not only treating illnesses but also supporting our
            patients in achieving long-term wellness. Whether you're here for
            preventive care, treatment of chronic conditions, or emergency
            services, our goal is to partner with you on your journey to a
            healthier life. <br /> 
            Our state-of-the-art facilities, combined with a
            patient-centric approach, make <b>Medicare</b> a trusted name in
            healthcare. From routine check-ups to specialized treatments, we
            strive to offer comprehensive services under one roof, ensuring that
            you have access to the best care possible.  <br/> 
            At <b>Medicare</b>, we don’t
            just care for patients; we build relationships for life.
          </p>
            </div>
        </div>
        <div className=" flex justify-center items-center m-2 p-2">
          <img
            className=" h-96 rounded-lg shadow"
            src="https://firebasestorage.googleapis.com/v0/b/hospital-management-a0f47.appspot.com/o/Hospital%2FHospital2.jpeg?alt=media&token=c58f0345-f9d5-4532-ab64-88cc394dcb1a"
            alt="not found"
          />
        </div>
      </div>
    </div>
  );
};

// className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
