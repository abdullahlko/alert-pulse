import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = ({hasTimetable}) => {
  return (
   <div className="min-h-screen flex flex-col">
       <Header variant="home" hasTimetable={hasTimetable} />

      <main className="flex-1 p-5">
        <p className="text-gray-600">
          Home page....
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
