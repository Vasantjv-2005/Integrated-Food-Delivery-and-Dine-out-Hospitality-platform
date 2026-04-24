const router = require("express").Router();
const { createPayment } = require("../controllers/paymentController");

router.post("/", createPayment);

module.exports = router;