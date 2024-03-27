// CouponCodeGenerator.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import CouponSlip from "./CouponSlip";

const CouponCodeGenerator = () => {
  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [numCoupons, setNumCoupons] = useState(1);
  const [couponCodes, setCouponCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    fetchCoupons();
  }, []); // Fetch coupons when the component mounts

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/coupons`);
      setCouponCodes(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateCouponCodes = async () => {
    try {
      setLoading(true);
      const generatedCouponCodes = [];
      for (let i = 0; i < numCoupons; i++) {
        const { data } = await axios.post(
          `${backendURL}/api/coupons`,
          generateCouponData()
        );
        generatedCouponCodes.push(data);
      }
      setCouponCodes((prevCodes) => [...prevCodes, ...generatedCouponCodes]);
    } catch (error) {
      alert("Error generating coupons");
      console.error("Error generating coupons:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateCouponData = () => {
    const currentDate = new Date(); // Get the current date
    const formattedDate = currentDate.toISOString().split("T")[0];
    const couponCode = generateUniqueCouponCode();
    const link = `https://epitight.in/pages/coupon?couponCode=${couponCode}`;
    return { couponCode, link, used: false, generatedAt: formattedDate };
  };

  const generateUniqueCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 8;

    let couponCode = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }

    return couponCode;
  };

  const handleDeleteData = async () => {
    try {
      await axios.delete(`${backendURL}/api/coupons`);
      alert("All data deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error deleting data. Please try again later.");
    }
  };

  const handleViewCodes = () => {
    if (!selectedDate) {
      alert("Please select a date.");
    } else {
      window.location.href = `/coupons/${selectedDate}`;
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      {loading ? (
        <div className="h-screen z-50 w-full flex justify-center items-center fixed top-0 left-0 bg-white text-7xl text-black text-center flex-col gap-8">
          <UseAnimations animation={loading2} size={86} />
        </div>
      ) : (
        <>
          <h1 className="text-center mt-16">Epitight QR Generator</h1>

          <div className="flex flex-col justify-center items-center gap-16 h-auto py-8 lg:py-16 my-16 bg-gray-100 rounded-3xl">
            {/* Blocks Container */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-16">
              {/* Block 1 */}
              <div className="bg-white text-black rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl font-bold mb-4">Generate Coupons</h2>
                <div className="flex flex-col gap-4 items-center">
                  <label htmlFor="numCoupons" className="text-xl">
                    Number of Coupons
                  </label>
                  <input
                    type="number"
                    id="numCoupons"
                    placeholder="Enter Number"
                    className="text-center w-full p-3 border rounded-full placeholder-pl-4 border-gray-300 text-white placeholder-gray-300 mb-4"
                    value={numCoupons}
                    onChange={(e) => setNumCoupons(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white py-3 px-6 rounded-full"
                    onClick={generateCouponCodes}
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Block 2 */}
              <div className="bg-white text-black rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl font-bold mb-4">View Filtered Codes</h2>
                <div className="flex flex-col gap-4 items-center">
                  <label htmlFor="date" className="text-xl">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate} 
                    onChange={handleDateChange}
                    className="text-center w-full border rounded-full p-3 border-gray-300 text-white placeholder-gray-300 mb-4"
                  />                  
                  <button className="bg-blue-500 text-white py-3 px-6 rounded-full" onClick={handleViewCodes}>
                    View Codes
                  </button>                  
                </div>
              </div>
            </div>

            {/* "See All Codes" button */}
            <div className="mt-2">
              <Link
                className="rounded-full text-white hover:text-white"
                to="/codes"
              >
                <button className="text-white py-3 px-6 rounded-full">
                  See All Codes
                </button>
              </Link>
            </div>           
          </div>

          <div className="mt-8 mb-2">
            <p>Total coupon codes generated till now: {couponCodes.length}</p> 
            <p>
              <b className="text-red">Used</b> coupon codes:{" "}
              {couponCodes.filter((coupon) => coupon.used).length}
            </p>
            <p>
              <b className="text-green">Not Used</b> coupon codes:{" "}
              {couponCodes.filter((coupon) => !coupon.used).length}
            </p>
          </div>

          <button
            className="bg-red hover:bg-red text-white py-2 px-4 rounded my-10"
            onClick={handleDeleteData}
          >
            Delete All Data
          </button>

          <h2 className="text-4xl">
            All Generated coupon codes and their status
          </h2>
          <div className="mt-8 flex flex-wrap">
            {couponCodes.map(
              ({ qrCode, link, couponCode, used, _id }, index) => (
                <div
                  key={index}
                  className="w-full sm:w-fit mr-4 mb-4 p-4 bg-[#f6f6f6] text-black rounded-2xl text-wrap"
                >
                  <p className="text-center mt-2">
                    Coupon {index + 1} : {couponCode}
                  </p>
                  <p
                    className={`text-center mt-2 ${
                      used ? "text-red" : "text-green"
                    }`}
                  >
                    {used ? "Status : Used" : "Status : Not Used"}
                  </p>
                </div>
              )
            )}
          </div>

          {/* <CouponSlip /> */}
        </>
      )}
    </div>
  );
};

export default CouponCodeGenerator;
