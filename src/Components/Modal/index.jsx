import { useState, useEffect } from "react";
import { Modal as BootstrapModal } from "react-bootstrap";
import { CloseCircle } from "iconsax-react";
import "./index.css";

const Modal = ({ children, show: propShow, handleClose, ...restProps }) => {
  const [show, setShow] = useState(propShow);

  // Sync internal show state with propShow
  useEffect(() => {
    setShow(propShow);
  }, [propShow]);

  const handleModalClose = () => {
    setShow(false);
    if (handleClose) handleClose(); // Call the handleClose prop if provided
  };

  return (
    <BootstrapModal
      show={show}
      onHide={handleModalClose}
      dialogClassName="custom-modal-dialog"
      {...restProps}
    >
      <BootstrapModal.Header
        closeButton={false}
        className="custom-modal-header"
      >
        <span className="custom-modal-header-close-icon" onClick={handleClose}>
          <CloseCircle size={20} />
        </span>
      </BootstrapModal.Header>
      <BootstrapModal.Body
        className="custom-modal-body flex flex-col gap-5"
        {...restProps}
      >
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
