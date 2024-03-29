const express = require("express")

const { OrderModel } = require("../model/Order.model")

const orderRouter = express.Router()


orderRouter.get("/userOrders", async (req, res) => {
    const userId = req.body.userId
    try {
        const data = await OrderModel.find({ userId })
        res.send(data)
    } catch (error) {
        res.send({
            err: "Can't get Orders",
            msg: error.message
        })
    }
})

orderRouter.get("/admin/order", async (req, res) => {
    try {
        const data = await OrderModel.find()
        res.send(data)
    } catch (error) {
        res.send({
            err: "Can't get Orders",
            msg: error.message
        })
    }
})

orderRouter.post("/", async(req, res) => {
    const order = req.body
   // console.log(order)
    try {
       let orders =  await OrderModel.insertMany(order)
      
    res.send({ msg: "Order Placed Successfully"})
    } catch (error) {
        res.send({
            err: "Can't place Orders",
            msg: error.message
        })
    }
})

orderRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body
    try {
        await OrderModel.findByIdAndUpdate(id, updates)
        res.send({ msg: "Order Updated Successfully" })
    } catch (error) {
        res.send({
            err: "Can't update Order",
            msg: error.message
        })
    }
})


module.exports = orderRouter
