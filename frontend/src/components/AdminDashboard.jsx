import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../App.css"; // Import CSS file

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", type: "", price: 0, isAvailable: true });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items/");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  

  const handleAddOrUpdateItem = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (editItem) {
        // Update item
        await axios.put(`http://localhost:5000/api/items/update/${editItem._id}`, newItem, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add new item
        const response = await axios.post("http://localhost:5000/api/items/add", newItem, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems([...items, response.data.item]);
      }
      closeModal();
      fetchItems();
    } catch (error) {
      navigate('/admin/login', { replace: true });
 
      console.error("Error saving item:", error);
    }
  };
  

  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/items/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      navigate('/admin/login', { replace: true });

      console.error("Error deleting item:", error);
    }
  };
  

  const openModal = (item = null) => {
    setEditItem(item);
    setNewItem(item || { name: "", type: "", price: 0, isAvailable: true });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="admin-dashboard">
      <h1 style={{marginBottom:"15px"}}>Admin Dashboard</h1>

      <div className="items-container">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <h3>{item.name}</h3>
            <p>Type: {item.type}</p>
            <p>Price: ${item.price}</p>
            <p className={item.isAvailable ? "available" : "not-available"}>
              {item.isAvailable ? "Available" : "Out of Stock"}
            </p>
            <button className="edit-btn" onClick={() => openModal(item)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="add-btn" onClick={() => openModal()}>+</button>

      {/* Modal for Adding/Editing Items */}
      {isModalOpen && (
         <div className="modal">
         <div className="modal-content">
           {/* Close Button (Cross Icon) */}
           <button className="close-btn" onClick={closeModal}>&times;</button>
       
           <h2>{editItem ? "Edit Item" : "Add New Item"}</h2>
       
           <div className="form-group">
             <label>Name</label>
             <input
               type="text"
               placeholder="Enter item name"
               value={newItem.name}
               onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
             />
           </div>
       
           <div className="form-group">
             <label>Type</label>
             <select
               value={newItem.type}
               onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
             >
               <option value="">Select Type</option>
               <option value="Starter">Starter</option>
               <option value="Main Course">Main Course</option>
               <option value="Drinks">Drinks</option>
               <option value="Dessert">Dessert</option>
               <option value="Side Dish">Side Dish</option>
             </select>
           </div>
       
           <div className="form-group">
             <label>Price</label>
             <input
               type="number"
               placeholder="Enter price"
               value={newItem.price}
               onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
             />
           </div>
       
           {/* Properly Aligned Checkbox */}
           <div className="form-group checkbox-group">
             <label className="checkbox-label">
               <input
                 type="checkbox"
                 checked={newItem.isAvailable}
                 onChange={(e) => setNewItem({ ...newItem, isAvailable: e.target.checked })}
               />
               Available
             </label>
           </div>
       
           <div className="modal-actions">
             <button className="save-btn" onClick={handleAddOrUpdateItem}>
               {editItem ? "Update Item" : "Add Item"}
             </button>
           </div>
         </div>
       </div>
       
      )}
    </div>
  );
};

export default AdminDashboard;
