import React, { useState } from 'react';
import ReactModal from 'react-modal';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <ReactModal
      isOpen={showPopup}
      onRequestClose={handleClosePopup}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        },
        content: {
          width: '80%',
          maxWidth: '800px',
          height: 'auto',
          margin: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          padding: '0',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
      }}
    >
      <div className="popup-header">
        <button className="popup-close" onClick={handleClosePopup}>
          X
        </button>
      </div>
      <h1>NFT Mintado</h1>
    </ReactModal>
  );
};

export default Popup;
