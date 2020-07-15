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


export function warningMessage(info: string) {
  return Swal.fire({
    position: 'center',
    icon: 'warning',
    text: info,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3ABB67'
  });
}

export function errorMessage(info: string) {
  return Swal.fire({
    position: 'center',
    icon: 'error',
    text: info,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#FF0742'
  });
}

export function confirmDialog(info: string, cancel: string, confirm: string) {
  return Swal.fire({
    position: 'center',
    icon: 'warning',
    text: info,
    showCancelButton: true,
    cancelButtonText: cancel,
    cancelButtonColor: '#FF0742',
    showConfirmButton: true,
    confirmButtonText: confirm,
    confirmButtonColor: '#3ABB67'
  });
}

export function timeMessage(text: string, time) {
  let timerInterval;
  return Swal.fire({
    html: text,
    timer: time,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => { }, 100);
    },
    onClose: () => {
      clearInterval(timerInterval);
    }
  });
}
