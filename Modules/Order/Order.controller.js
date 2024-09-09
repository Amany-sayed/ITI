const { Order } = require("../../Models/Order.model.js");
const { Cart } = require("../../Models/Cart.model.js");

//Make an Order
const placeOrder = async (req, res, next) => {
    const { cartId, address, phoneNumbers, paymentMethod } = req.body;
    const userId = req.user._id;

    try {
       
        const cart = await Cart.findById(cartId).populate("products.productId");
        if (!cart) return next(new Error("Cart not found", { cause: 404 }));
        const newOrder = new Order({
            userId,
            cart: cartId,
            address,
            phoneNumbers,
            paymentMethod
        });

        const order = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        next(new Error("Failed to place order", { cause: 400, error }));
    }
};


//This function retrieves the details of a specific order based on the order ID.
const getOrderDetails = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        
        const order = await Order.findById(orderId)
            .populate({
                path: 'cart',
                populate: { path: 'products.productId', populate: { path: 'category subCategory brand' } }
            })
            .populate('userId');

        if (!order) {
            return next(new Error("Order not found", { cause: 404 }));
        }

        res.status(200).json({ message: "Order details retrieved", order });
    } catch (error) {
        next(new Error("Failed to retrieve order details", { cause: 400, error }));
    }
};


//updating the status of an order
const updateOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;
    const { status, reason } = req.body;
    const updatedBy = req.user._id;

    try {
        
        const order = await Order.findById(orderId);
        if (!order) return next(new Error("Order not found", { cause: 404 }));

        order.status = status;
        order.reason = reason || order.reason;
        order.updatedBy = updatedBy;

        const updatedOrder = await order.save();
        res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error) {
        next(new Error("Failed to update order status", { cause: 400, error }));
    }
};

//cancel an order.
const cancelOrder = async (req, res, next) => {
    const { orderId } = req.params;
    const { reason } = req.body;
    const cancelledBy = req.user._id;

    try {
        
        const order = await Order.findById(orderId);
        if (!order) return next(new Error("Order not found", { cause: 404 }));

        if (order.status === "delivered") {
            return next(new Error("Delivered orders cannot be cancelled", { cause: 400 }));
        }

        order.status = "cancelled";
        order.cancelledBy = cancelledBy;
        order.reason = reason;

        const cancelledOrder = await order.save();
        res.status(200).json({ message: "Order cancelled successfully", order: cancelledOrder });
    } catch (error) {
        next(new Error("Failed to cancel order", { cause: 400, error }));
    }
};

//get all orders for a specific user
const listUserOrders = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ userId })
            .populate({
                path: 'cart',
                populate: { path: 'products.productId', populate: { path: 'category subCategory brand' } }
            });

        if (!orders.length) return next(new Error("No orders found", { cause: 404 }));

        res.status(200).json({ message: "User orders retrieved", orders });
    } catch (error) {
        next(new Error("Failed to retrieve orders", { cause: 400, error }));
    }
};

//get all orders >> admin use <<
const listAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'cart',
                populate: { path: 'products.productId', populate: { path: 'category subCategory brand' } }
            })
            .populate('userId updatedBy cancelledBy');

        if (!orders.length) return next(new Error("No orders found", { cause: 404 }));

        res.status(200).json({ message: "All orders retrieved", orders });
    } catch (error) {
        next(new Error("Failed to retrieve orders", { cause: 400, error }));
    }
};
module.exports={
    placeOrder,updateOrderStatus,getOrderDetails,cancelOrder,listUserOrders,listAllOrders
}
