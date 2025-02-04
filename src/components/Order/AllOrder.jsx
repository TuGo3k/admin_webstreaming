import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { FaRegEye } from "react-icons/fa6";

export default function AllOrder() {
  const [orders, setOrders] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchPhone, setSearchPhone] = useState('');
  const [isBill, setIsBill] = useState('')

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        "https://erhem.templateapi.xyz/online/api/v1/order"
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Захиалгын өгөгдөл татахад алдаа гарлаа:", error);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        "https://erhem.templateapi.xyz/online/api/v1/lesson"
      );
      setLessons(response.data.data);
    } catch (error) {
      console.error("Хичээлийн өгөгдөл татахад алдаа гарлаа:", error);
    }
  };

  const getLessonNameById = (lessonId) => {
    const lesson = lessons.find((lesson) => lesson._id === lessonId);
    return lesson ? lesson.title : "Хичээл олдсонгүй";
  };

  const getLessonPriceById = (lessonId) => {
    const lesson = lessons.find((lesson) => lesson._id === lessonId);
    return lesson ? lesson.price : "Үнэ олдсонгүй";
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const order = orders.find((order) => order._id === orderId);
      if (!order) return;
      const updatedOrder = { ...order, isPaid: !order.isPaid };

      await axios.put(`https://erhem.templateapi.xyz/online/api/v1/order/checkout/${orderId}`, {
        userId: order.userId,
        lessons: order.lessons
      });

      setOrders((prevOrders) =>
        prevOrders.map((ord) => (ord._id === orderId ? updatedOrder : ord))
      );
    } catch (error) {
      console.error("Захиалгын төлөв шинэчлэхэд алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchLessons();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Хэрэглэгчийн жагсаалт</h1>
      <div className="flex justify-between w-full py-3">
        <input type="text" name="" placeholder="phone number" className="border border-black px-3" onChange={(e) => setSearchPhone(e.target.value)} id="" />
        <select className="py-2 px-6 border bg-gray-500 text-white" name="" id="" onChange={(e) => setIsBill(e.target.value)} >
          <option value={''}>No select</option>
          <option value={'true'}>Төлсөн</option>
          <option value={'false'}>Төлөөгүй</option>
        </select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>№</b> </TableCell>
              <TableCell> <b>Хэрэглэгчийн ID</b> </TableCell>
              <TableCell> <b>Хэрэглэгчийн дугаар</b> </TableCell>
              <TableCell><b>Хичээлийн ID</b></TableCell>
              <TableCell><b>Баталгаажуулах</b></TableCell>
              <TableCell><b>Төлөв</b></TableCell>
              <TableCell><b>Устгах</b></TableCell>
              <TableCell><b>Огноо</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.filter((e) => searchPhone ? e.userPhone.includes(searchPhone) : e)
            .filter((e) => isBill ? e.isPaid.toString() === isBill : e)
            .map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell align='center'>{order.userPhone}</TableCell>
                <TableCell align="center">
                  <FaRegEye
                    size={"24px"}
                    color="blue"
                    className="cursor-pointer"
                    onClick={() => handleViewOrder(order)}
                  />
                </TableCell>
                <TableCell>
                 { order.isPaid ===false ? <Button
                    color={order.isPaid ? "success" : "warning"}
                    variant="contained"
                    onClick={() => updateOrderStatus(order._id)}
                  >
                    {order.isPaid ? "Баталгаажуулах"  : "Баталгаажуулах"}
                  </Button> : null}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color={order.isPaid ? "success" : "warning"}>
                    {order.isPaid ? "төлөгдсөн" : "Хүлээгдэж байна"}
                  </Button>
                </TableCell>
                <TableCell>
                  {order.price}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString("mn-MN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Хичээлийн дэлгэрэнгүй</h2>
          {selectedOrder && (
            <div>  
              <ul>
                {selectedOrder.lessons.map((lesson, index) => (
                  <li key={lesson._id}>
                    <strong>Хичээл {index + 1}:</strong>
                    <p>Нэр: {getLessonNameById(lesson.lesson)}</p>
                    <p>Хичээлийн ID: {lesson.lesson}</p>
                    <p>Lesson ID: {lesson._id}</p>
                    <p>Үнэ: {getLessonPriceById(lesson.lesson)}₮</p>
                  </li>
                ))}
              </ul>
              <p><strong>Утасны дугаар:</strong> {selectedOrder.userPhone}</p>
              <p><strong>Нийт үнэ:</strong> {selectedOrder.price}₮</p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  ); 
}
