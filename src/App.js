import React, { useState } from 'react';
import './App.css';
import Popup from './popup';
import { GoChevronLeft } from "react-icons/go";

function App() {
  const [segmentName, setSegmentName] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [addedSchemas, setAddedSchemas] = useState([]);

  const handleSaveSegment = () => {
    setPopupVisible(true);
  };

  const handleSave = async () => {
    try {
      setSelectedSchema('');
      setSegmentName('');
      setAddedSchemas([]);
  
      const dataToSend = {
        "segment name": segmentName,
        "schema": addedSchemas.map(schema => ({ [schema.label.toLowerCase().replace(' ', '_')]: schema.label }))
      };
  
      const response = await fetch('https://webhook.site/0dcd9ecc-44ef-415a-a25c-aa2fbd96028e', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data to the server.');
      }
  
      console.log('Data sent successfully:', dataToSend);
      setAddedSchemas([]); 
      setPopupVisible(false); 
      setSelectedSchema(''); 
      setSegmentName(''); 
    } catch (error) {
      console.error('Error sending data to the server:', error);
      // Handle error appropriately (e.g., show error message to the user)
    }
  };
  

  const handleAddNewSchema = () => {
    if (selectedSchema !== '') {
      setAddedSchemas([...addedSchemas, { label: selectedSchema, value: selectedSchema.toLowerCase().replace(' ', '_') }]);
      setSelectedSchema('');
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  const handleCancel = () => {
    setPopupVisible(false); 
  };

  return (
    <div className="App">
       {popupVisible && <div className="backdrop" onClick={handleCancel}></div>}
      <div className="header">
        <GoChevronLeft className='icon' />
        <p className='text'>View Audience</p>
      </div>
     
      <button style={{marginLeft:20,width:160,height:30,marginTop:30,fontSize:18,backgroundColor:'white'}} onClick={handleSaveSegment}>Save Segment</button>
      <Popup
        segmentName={segmentName}
        setSegmentName={setSegmentName}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        selectedSchema={selectedSchema}
        setSelectedSchema={setSelectedSchema}
        addedSchemas={addedSchemas}
        setAddedSchemas={setAddedSchemas}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDropdownChange={handleDropdownChange}
        handleAddNewSchema={handleAddNewSchema}
      />
    </div>
  );
}

export default App;

