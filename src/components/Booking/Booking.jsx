import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ultil/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews,title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let today = new Date().toJSON();
  today = today.slice(0,10);
  console.log(today);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName:title,
    fullName: "",
    guestSize: 1,
    bookAt: "",
  });
  const handleChange = (e) => {
    setBooking((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const serviceFree = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFree);

  const handleClick =async (e) => {
    e.preventDefault();
    console.log(booking);
    let token = localStorage.getItem('token');
    try {
      if(!user || user ===undefined || user ===null) {
        return alert('please sign in')
      }
      const res = await fetch(`${BASE_URL}/booking`,{
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        },
        credentials:'include',
        body: JSON.stringify(booking)
      })
      const result = await res.json();
      if(!res.ok) return alert(result.message)
      navigate("/thank-you");
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price}</h3> <span>/per person</span>
        <span className="d-flex algin-items-center gap-1">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>

      {/* booking form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__form-infor" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} min={today}/>
            <input
              type="number"
              placeholder="GuestSize"
              id="guestSize"
              min="1"
              max="10"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="ri-close-line"></i>1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFree}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
