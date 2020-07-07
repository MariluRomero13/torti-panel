import Swal from 'sweetalert2';

export function confirmMessage(message: any) {
  return Swal.fire({
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3ABB67',
    cancelButtonText: 'Cancelar'
  });
}

export function successMessage(message: any) {
  return Swal.fire({
      position: 'center',
      icon: 'success',
      text: message,
      showConfirmButton: false,
      timer: 1500
  });
}
