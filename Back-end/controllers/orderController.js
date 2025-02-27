import OrderSchema from "../models/orderModel.js";

//create order

export const createOrder = async (req, res) => {
  const {
    status,
    productID,
    orderNB,
    address,
    userID,
    updateDate,
    totalPrice,
  } = req.body;
  try {
    const newOrder = new OrderSchema({
      status,
      productID,
      orderNB,
      address,
      userID,
      updateDate,
      totalPrice,
    });
    await newOrder.save();
    res
      .status(200)
      .json({ message: "order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "could not place order !", error: err });
  }
};

//get order by id

export const getOneOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const fetchedOrder = await OrderSchema.findById({ _id: id });
    if (fetchedOrder) {
      res.status(200).json({ message: "order found !", order: fetchedOrder });
    } else {
      res.status(404).json({ message: "no such order !" });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not fetch order", error: err });
  }
};

//get all orders

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderSchema.find();
    res
      .status(200)
      .json({ message: "orders fetched successfully !", orders: allOrders });
  } catch (err) {
    res.status(500).json({ message: "problem fetching ordersss", error: err });
  }
};
export const updateOrder = async (req, res) => {
    const id = req.params.id;
    console.log("Updating order with ID:", id);
  
    try {
      const {
        status,
        productID,
        orderNB,
        address,
        userID,
        updateDate,
        totalPrice,
      } = req.body;
  
      const updatedResult = await OrderSchema.findByIdAndUpdate(
        { _id: id },
        {
          status,
          
          productID,
          orderNB,
          address,
          userID,
          updateDate,
          totalPrice,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedResult) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      console.log(updatedResult);
      res.status(200).json({
        message: "Order updated successfully!",
        order: updatedResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };
  
  
  //delete order
  
  export const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
      await OrderSchema.deleteOne({ _id: id });
      res.status(200).json({ message: "order deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: " could not delete user" });
    }
  };