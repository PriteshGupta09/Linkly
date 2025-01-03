import {toast } from 'react-toastify';

const ToastSucess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
}

export default ToastSucess
