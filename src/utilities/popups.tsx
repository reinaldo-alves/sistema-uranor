import Swal, { SweetAlertIcon } from "sweetalert2";

export const Alert = (message: string, icon: SweetAlertIcon) => Swal.fire({
    icon: icon,
    iconColor: '#002776',
    title: message,
    padding: '20px',
    color: '#002776',
    customClass: {
        popup: 'popup',
        confirmButton: 'confirmButton'
    }
})