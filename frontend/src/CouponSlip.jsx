import React from 'react';

function CouponSlip() {
  return (
    <div className="inline-flex">
      <div className="w-1/2 gap-4 flex flex-col p-4">
        <div className="w-full">
          <img src="image.png" alt="" className="w-full h-auto" />
        </div>
        <div className="flex bg-gray-800 text-white p-4 gap-4">
          <div className="w-3/5">
            <h1 className="m-0 p-0">Epitight Dry Shampoo</h1>
            <ul className="list-none">
              <li>Scan the QR</li>
              <li>Authenticate the Product</li>
              <li>Claim the Rewards</li>
            </ul>
            <div className="bg-white text-gray-800 p-4">
              <p className="text-lg font-semibold">USE <span className="text-pink-500">#EPITIGHTEVERYDAY</span> TO GET FEATURED</p>
              <hr className="w-2/5" />
              <span>epitight.in</span>
            </div>
          </div>
          <div className="w-2/5 relative bg-white text-gray-800 p-4">
            <img src="" alt="" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">#QR Code:</div>
          </div>
        </div>
      </div>

      <div className="w-1/2 gap-4 flex flex-col p-4">
        <div className="w-full">
          <img src="image.png" alt="" className="w-full h-auto" />
        </div>
        <div className="flex bg-gray-800 text-white p-4 gap-4">
          <div className="w-3/5">
            <h1 className="m-0 p-0">Epitight Dry Shampoo</h1>
            <ul className="list-none">
              <li>Scan the QR</li>
              <li>Authenticate the Product</li>
              <li>Claim the Rewards</li>
            </ul>
            <div className="bg-white text-gray-800 p-4">
              <p className="text-lg font-semibold">USE <span className="text-pink-500">#EPITIGHTEVERYDAY</span> TO GET FEATURED</p>
              <hr className="w-2/5" />
              <span>epitight.in</span>
            </div>
          </div>
          <div className="w-2/5 relative bg-white text-gray-800 p-4">
            <img src="" alt="" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">#QR Code:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponSlip;
