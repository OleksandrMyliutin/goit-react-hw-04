import React from 'react';
import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Preview"
      className={s.modalContent}
      overlayClassName={s.modalOverlay}
      style={{ 
        overlay: { backgroundColor: 'rgba(0,0,0,0.7)' } 
      }}
    >
      <button className={s.closeButton} onClick={onClose}>
        &times;
      </button>
      <div className={s.imageWrapper}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Large preview"
            className={s.image}
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
