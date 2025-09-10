import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { motion } from "framer-motion";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    seller: "",
    contact: "",
  });

  const [photo, setPhoto] = useState(null); // State to store the photo file
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]); // Capture the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Use FormData to handle both text fields and files
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("seller", formData.seller);
      formDataToSend.append("contact", formData.contact);
      if (photo) {
        formDataToSend.append("photo", photo); // Append the photo file
      }

      const response = await axios.post("http://localhost:5000/api/products", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set appropriate content type
        },
      });

      setMessage(response.data.message);
      setFormData({
        title: "",
        description: "",
        price: "",
        seller: "",
        contact: "",
      });
      setPhoto(null); // Reset the photo state
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        style={{
          background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "30px auto",
          textAlign: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "600", marginBottom: "30px" }}>Add a Product</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            textAlign: "left",
          }}
        >
          <label style={{ fontSize: "16px", fontWeight: "500", color: "#444" }}>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "5px",
              }}
            />
          </label>
          <label style={{ fontSize: "16px", fontWeight: "500", color: "#444" }}>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "5px",
              }}
            ></textarea>
          </label>
          <label style={{ fontSize: "16px", fontWeight: "500", color: "#444" }}>
            Price (₹):
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "5px",
              }}
            />
          </label>
          <label style={{ fontSize: "16px", fontWeight: "500", color: "#444" }}>
            Seller Name:
            <input
              type="text"
              name="seller"
              value={formData.seller}
              onChange={handleInputChange}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "5px",
              }}
            />
          </label>
          <label style={{ fontSize: "16px", fontWeight: "500", color: "#444" }}>
            Contact Email:
            <input
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "5px",
              }}
            />
          </label>
          <label style={{ fontSize: "16px", fontWeight: "500", color: "#444" }}>
            Product Photo:
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "5px",
              }}
            />
          </label>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: "#2d87f0",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
              padding: "14px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Add Product
          </motion.button>
        </form>
        {message && (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#28a745",
              marginTop: "20px",
            }}
          >
            {message}
          </p>
        )}
      </motion.div>
    </>
  );
};

export default AddProduct;
