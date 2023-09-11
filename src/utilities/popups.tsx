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

export const Confirm = (message: string, icon: SweetAlertIcon, action: () => void) => Swal.fire({
    icon: icon,
    iconColor: '#002776',
    title: message,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: 'Continue',
    padding: '20px',
    color: '#002776',
    customClass: {
        popup: 'popup',
        confirmButton: 'confirmButton',
        cancelButton: 'cancelButton'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      action()
    }
  })