import React from 'react';
import image from '../src/assets/image.png'
import { CiGlobe } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

function CouponSlip(props) {
  return (
      <div className="w-1/2 gap-4 flex flex-col p-4">
        <div className="w-full">
          <img src={image} alt="" className="w-full h-auto" />
        </div>
        <div className="flex bg-dark text-white p-4 gap-4">
          <div className="w-3/5">
            <h1 className="m-0 text-3xl font-bold">Epitight Dry Shampoo</h1>
            <ul className="list-none ml-4 py-4">
              <li>Scan the QR</li>
              <li>Authenticate the Product</li>
              <li>Claim the Rewards</li>
            </ul>
            <div className="bg-white text-dark p-4 text-center flex items-center flex-col">
              <p className="text-lg font-normal">USE <span className="text-pinktext">#EPITIGHTEVERYDAY</span> TO GET FEATURED</p>
              <hr className="w-2/5" />
              <span className='flex items-center gap-1'><CiGlobe /><FaInstagram />epitight.in</span>
            </div>
          </div>
          <div className="w-2/5 relative bg-white text-dark p-4 flex flex-col items-center">
            <img src={`data:image/png;base64,${props.qrimage}`} alt={`QR Code for ${props.qrcode}`} />
            <div className="">#QR Code:{props.qrcode}</div>
          </div>
        </div>
    </div>
  );
}

export default CouponSlip;
