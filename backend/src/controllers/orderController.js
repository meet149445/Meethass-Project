import Order from "../models/OrderModel.js";

export const createOrder = async (req, res) => {

  try {

    console.log("REQ USER => ", req.user);

    console.log("REQ BODY => ", req.body);

    const { items, totalAmount } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      customerName: req.user.name,
      items,
      totalAmount,
    });

    console.log("ORDER SAVED => ", order);

    const allOrders = await Order.find();

    console.log("ALL ORDERS IN DB => ", allOrders);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    console.log("CREATE ORDER ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    console.log("ALL ORDERS => ", orders);

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};