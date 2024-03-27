import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

const FilteredCoupons = () => {
  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
  const { selectedDate } = useParams();
  const [couponCodes, setCouponCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouponsByDate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendURL}/api/coupons?date=${selectedDate}&used=false`
        );
        setCouponCodes(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCouponsByDate();
  }, [selectedDate]);

  return (
    <div className="">
      <div className="flex flex-wrap">
        {loading ? (
          <div className="h-screen z-50 w-full flex justify-center items-center fixed top-0 left-0 bg-white text-7xl text-black text-center flex-col gap-8">
            <UseAnimations animation={loading2} size={86} />
          </div>
        ) : couponCodes.length === 0 ? (
          <p>No coupons generated on the selected date.</p>
        ) : (
          couponCodes.map((coupon, index) => (
            <>
              <div
                key={index}
                className="bg-[#f6f6f6] w-[32.95vw] gap-2 text-black border border-black flex flex-col p-4"
              >
                <p className="text-red-600">
                  UrbanYog Hair Volumizing Pwder Wax strong hold 10gm
                </p>
                {/* Display the QR code using qrcode.react */}
                <div className="flex flex-row-reverse justify-between items-start">
                  <div className="w-32">
                    <img
                      src={`data:image/png;base64,${coupon.qrCodeImage}`}
                      alt={`QR Code for ${coupon.couponCode}`}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-green-600">
                      For product authentication:
                    </p>
                    <ol className="list-decimal pl-4">
                      <li>
                        Scan the QR for{" "}
                        <span className="text-red-600">Reward</span>
                      </li>
                      <li>OR give us a missed call on 02071531413</li>
                    </ol>
                    <p>#QR Code : {coupon.couponCode}</p>
                  </div>
                  {/* <button><Link to={coupon.link} target="_blank">Coupon Link</Link></button> */}
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default FilteredCoupons;
