import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { SiNike } from "react-icons/si";
import { ImCross } from "react-icons/im";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://digital-menu-02y6.onrender.com/api/items");
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const categories = ["All", "Starter", "Main Course", "Drinks", "Dessert", "Side Dish"];

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.type.toLowerCase() === category.toLowerCase()));
    }
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Items */}
      <ul className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item._id} className="menu-item">
              <h2>{item.name}</h2>
              <p>Rs <strong>{item.price}</strong> </p>
              <p>{item.isAvailable ? <strong>Available <SiNike size={30} color="green" /></strong>  :<strong style={{color:"gray"}}>out of stock <ImCross  size={20} color="red"/></strong>  }</p>
             
              
            </li>
          ))
        ) : (
          <p className="no-items">No items found for this category.</p>
        )}
      </ul>
    </div>
  );
};

export default Menu;
