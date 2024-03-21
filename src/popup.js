import React from 'react';
import './App.css';
import { FiMinus } from "react-icons/fi";
import { GoChevronLeft } from "react-icons/go";

const Popup = ({ segmentName, setSegmentName, popupVisible, setPopupVisible, selectedSchema, setSelectedSchema, addedSchemas, setAddedSchemas, handleCancel, handleDropdownChange, handleAddNewSchema, handleSave }) => {

  
  const availableSchemas = [
    { label: "First Name", value: "First Name" },
    { label: "Last Name", value: "Last Name" },
    { label: "Gender", value: "Gender" },
    { label: "Age", value: "Age" },
    { label: "Account Name", value: "Account Name" },
    { label: "City", value: "City" },
    { label: "State", value: "State" }
  ].filter(schema => !addedSchemas.some(addedSchema => addedSchema.label === schema.label));

  return (
    popupVisible && (
      <div className="popup-Container">
        <div className="header">
        <GoChevronLeft className='icon' />
        <p className='text'>Saving Segment</p>
      </div>
        <h4 style={{padding:10}}>Enter the Name of the Segment</h4>
        <input style={{margin:5,padding:8}}  type="text" placeholder='Name of Segment' value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
        <label style={{padding:10,fontSize:"13px"}}>To save your segment, you need to add the schemas to build query</label>
        <div class="user-status-container">
  <div class="user-status">
    <span class="green-dot"></span>
    <span class="user-label">-User Traits</span>
  </div>
  <div class="user-status">
    <span class="red-dot"></span>
    <span class="user-label">-Group Traits</span>
  </div>
</div>
        <div className='contentht'>
          <div className="addedSchemas">
            {addedSchemas.map((schema, index) => (
              <div className="schemaItem" key={index}>
                <div className="redDot"></div>
                <select style={{ width: '85%', height: '30px', marginLeft: '5px' }}>
                  <option>{schema.label}</option>
                </select>
                <div className="menuIcon">
                  <FiMinus style={{ fontSize: 30 }} />
                </div>
              </div>
            ))}
          </div>
         <div className="schemaItem" >
          <div className="greyDot"></div> 
          <select style={{ width: '85%', height: '30px', marginLeft: '5px' }} id="schemaDropdown" value={selectedSchema} onChange={handleDropdownChange}>
            <option value="">Select Schema</option>
            {availableSchemas.map((schema, index) => (
              <option key={index} value={schema.value}>{schema.label}</option>
            ))}
          </select>
          <div className="menuIcon">
                  <FiMinus style={{ fontSize: 30 }} />
                </div>
          </div>
          <button className='btnnewscheme' onClick={handleAddNewSchema}>+ Add new schema</button>
        </div>

        <div className="footerContainer">
          <button className='btn1' onClick={handleSave}>Save the Segment</button>
          <button className='btn2' style={{ marginLeft: 5 }} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    )
  );
}

export default Popup;

