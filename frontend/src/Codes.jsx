// Codes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import CouponSlip from "./CouponSlip";

const Codes = () => {
  const [couponCodes, setCouponCodes] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`/api/coupons`);
      setCouponCodes(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
    }
  };

  return (
    <div className=''>
      <div className='flex flex-wrap'>
      {couponCodes.map((coupon, index) => (
        <>
        {/* <div key={index} className='bg-[#f6f6f6] w-[32.95vw] gap-2 text-black border border-black flex flex-col p-4'>
        <p className='text-red-600'>UrbanYog Hair Volumizing Pwder Wax strong hold 10gm</p>
          <div className='flex flex-row-reverse justify-between items-start'>
            <div className='w-32'>
          <img src={`data:image/png;base64,${coupon.qrCodeImage}`} alt={`QR Code for ${coupon.couponCode}`} className='w-full h-auto' />
          </div>
          <div>
        <p className='text-green-600'>For product authentication:</p>
        <ol className='list-decimal pl-4'>
            <li>Scan the QR for <span className='text-red-600'>Reward</span></li>
            <li>OR give us a missed call on 02071531413</li>
        </ol>
          <p>#QR Code : {coupon.couponCode}</p>
          </div>
        </div>
        </div> */}
        <CouponSlip qrimage={coupon.qrCodeImage} qrcode={coupon.couponCode} />
        </>
      ))}
      </div>
    </div>
  );
};

export default Codes;
