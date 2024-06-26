const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const { createCanvas } = require("canvas");
const QRCode = require("qrcode");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 8000 || 5000;

app.use(cors());
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Coupon = mongoose.model("Coupon", {
  couponCode: String,
  link: String,
  used: Boolean,
  qrCodeImage: String,
  generatedAt: { type: Date }
});





app.get('/api/coupons', async (req, res) => {
  try {
    const { date, used } = req.query;
    let coupons;
    if (date) {      
      const startDate = new Date(date); // Start of the selected date
      const endDate = new Date(new Date(date).setHours(23, 59, 59)); // End of the selected date
      coupons = await Coupon.find({
        generatedAt: { $gte: startDate, $lte: endDate },
        used: used === 'true'
      });
    } else {   
      coupons = await Coupon.find();
    }
    res.json(coupons);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const sharp = require('sharp');

app.post("/api/coupons", async (req, res) => {
  try {
    const { couponCode, link, generatedAt } = req.body;

    // Generate QR code with a higher error correction level
    const qrCodeBuffer = await QRCode.toBuffer(link, { errorCorrectionLevel: "Q" });

    // Resize the QR code image using sharp
    const resizedQrCodeBuffer = await sharp(qrCodeBuffer)
      .resize(200, 200)
      .toBuffer();

    // Convert the resized buffer to a Base64-encoded string
    const qrCodeBase64 = resizedQrCodeBuffer.toString("base64");

    const newCoupon = new Coupon({
      couponCode,
      link,
      used: false,
      qrCodeImage: qrCodeBase64,
      generatedAt: generatedAt
    });
    await newCoupon.save();
    res.json(newCoupon);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/markCouponUsed", async (req, res) => {
  res.send("<h1>Hi</h1>");
});

app.post("/api/markCouponUsed", async (req, res) => {
  try {
    const { couponCode } = req.body;

    const coupon = await Coupon.findOne({ couponCode });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (coupon.used) {
      return res.status(400).json({ message: "Coupon already used" });
    }

    // Mark the coupon as used
    coupon.used = true;
    await coupon.save();

    res.json({ status: "success", message: "Coupon marked as used" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/api/coupons/:couponCode", async (req, res) => {
  try {
    const { couponCode } = req.params;
    const { used } = req.body;

    const coupon = await Coupon.findOneAndUpdate(
      { couponCode },
      { used },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Return the updated coupon
    res.json(coupon);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/validate-coupon/:couponCode", async (req, res) => {
  try {
    const { couponCode } = req.params;

    const coupon = await Coupon.findOne({ couponCode });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Return the coupon status
    res.json({ status: coupon.used ? "used" : "unused" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/api/coupons", async (req, res) => {
  try {
    await Coupon.deleteMany({}); 
    res.status(204).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
