'use strict';
var dbConn = require('../dbconfig/db.config');
//Employee object create
var Order = function(order) {
    this.orders_id = order.orders_id;
    this.user_id = order.user_id;
    this.name = order.name;
    this.address = order.address;
    this.district = order.district;
    this.state = order.state;
    this.phone = order.phone;
    this.email = order.email;
    this.total = order.total;
    this.created_at = order.created_at;
    this.updated_at = order.updated_at;
    this.landmark = order.landmark;
    this.razorpay_payment_id = order.razorpay_payment_id;
    this.razorpay_order_id = order.razorpay_order_id;
    this.razorpay_signature = order.razorpay_signature;
    this.status = order.status;
};
Order.create = function(newOrder, result) {
    dbConn.query("INSERT INTO orders2 set ?", newOrder, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Order.findById = function(id, result) {
    dbConn.query("Select * from orders2 where order_id = ? ", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Order.findAll = function(result) {
    dbConn.query("Select * from orders2", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('orders2 : ', res);
            result(null, res);
        }
    });
};
Order.update = function(id, order, result) {
    dbConn.query("UPDATE orders2 SET user_id=?,total_amount=?,payment_status=?,date_ordered=?,product_id=? WHERE order_id = ?", [order.user_id, order.total_amount, order.payment_status, order.date_ordered, order.product_id, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Order.delete = function(id, result) {
    dbConn.query("DELETE FROM orders2 WHERE orders_id = ?", [id], function(err, res) {
        console.log(id);
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Order;