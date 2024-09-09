const router = require("express").Router();
const { placeOrder, getOrderDetails, updateOrderStatus, cancelOrder, listUserOrders, listAllOrders } = require("./Order.controller.js");


router.post("/orders", placeOrder);
router.get("/orders/:orderId", getOrderDetails);
router.put("/orders/:orderId/status", updateOrderStatus);
router.put("/orders/:orderId/cancel", cancelOrder);
router.get("/orders/user", listUserOrders);
router.get("/orders", listAllOrders);//admin
module.exports = router;
