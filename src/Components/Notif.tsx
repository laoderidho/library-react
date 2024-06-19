import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";


interface Props{
  headerMessage: string
  showToast: boolean
  setShowToast: (showToast: boolean) => void
  toastMessage: string
  toastVariant: string 
}

const Notif: React.FC<Props> = ({headerMessage, showToast, setShowToast, toastMessage, toastVariant}) => {
  return (
       <ToastContainer position="top-end" className="p-3" style={{zIndex: 1150}}>
           <Toast onClose={()=> setShowToast(false)} show={showToast} delay={3000} autohide >
              <Toast.Header>
                <strong className="me-auto">{headerMessage}</strong>
              </Toast.Header>
              <Toast.Body className={`${toastVariant} text-white`}>
                {toastMessage}
              </Toast.Body>
            </Toast>
       </ToastContainer>
  )
}

export default Notif