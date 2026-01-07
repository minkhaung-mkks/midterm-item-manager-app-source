import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // You must use this ref for the item name input
  const currentId = useRef(0);

  const itemName = useRef(null);
  const itemCategory = useRef(null);
  const itemPrice = useRef(null);
  //TODO: Your code goes here

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  const validItemData = ({ itemName, itemPrice, itemCategory }) => {
    if (itemName == "" || itemName == null) {
      setErrorMsg("Item name must not be empty");
      return false;
    }
    if (itemCategory == "" || itemCategory == null) {
      setErrorMsg("Please select a category");
      return false;
    }
    // I was going to add a price must be greater than 0 error message here but I thought 0 could be used for
    // free / gift items so I left that out, but I will supply the code just in case you want that too.
    // if (itemPrice == 0 ) {
    //   setErrorMsg("Price must not be 0");
    //   return false;
    // }
    if (itemPrice < 0 || itemPrice == null || itemPrice =='') {
      setErrorMsg("Price must not be less than 0");
      return false;
    }
    for (let i = 0; i < items.length; i++) {
      if (itemName.toLowerCase() == items[i].itemName.toLowerCase()) {
        setErrorMsg("Item must not be duplicated");
        return false;
      }
    }
    return true;
  };
  const handleAddItem = () => {
    const newItem = {
      itemName: itemName.current.value.trim(),
      itemCategory: itemCategory.current.value,
      itemPrice: itemPrice.current.value,
      id: currentId.current + 1,
    };
    if (validItemData(newItem)) {
      setItems((prev) => [...prev, newItem]);
      currentId.current++;
      itemName.current.value = null;
      itemCategory.current.value = null;
      itemPrice.current.value = null;
      setErrorMsg("");
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };
  const handleDelete = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1);
    setItems(newItems)
  };
  const svgMap = {
    "Stationary": stationaryLogo,
    "Kitchenware": kitchenwareLogo,
    "Appliance": applianceLogo,
  }
  return (
    <>
      <div id="h1">Item Management</div>
      <form  id="add-item-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleAddItem();
  }}/>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {/*
             * TODO: Your code goes here
             * !!! IMPORTANT !!!
             * - All items must be listed here (above the form row).
             * - Your input form must be implemented as the LAST row in this table.
             */}
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <span>{item.id}</span>
                </td>
                <td>
                  <span>{item.itemName}</span>
                </td>
                <td>
                  <span><img src={svgMap[item.itemCategory]} alt="" /></span>
                </td>
                <td>
                  <span>{item.itemPrice}</span>
                </td>
                <td>
                  <button className="del-btn" type="button" onClick={() => handleDelete(index)}>
                    <img src={deleteLogo} alt="" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <span></span>
              </td>
              <td>
                <input type="text" ref={itemName} className="name-input" form="add-item-form" />
              </td>
              <td>
                <select name="" id="" ref={itemCategory} form="add-item-form">
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input type="number" ref={itemPrice} min="0" step="0.01" form="add-item-form"/>
              </td>
              <td>
                <button className="add-btn"   type="submit" form="add-item-form">
                  Add item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
        {/* You MUST display the errorMsg state here. */}
        {showErrorMessage ? (
          <span id="error-message-text">{errorMsg}</span>
        ) : null}
      </div>
    </>
  );
}

export default ItemManager;
