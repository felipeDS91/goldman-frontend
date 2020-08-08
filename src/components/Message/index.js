import Swal from 'sweetalert2';

export async function ShowMessage(params) {
  if (params.enableButtonsAfter) {
    setTimeout(() => {
      Swal.enableButtons();
    }, params.enableButtonsAfter);

    return Swal.fire({
      ...params,
      onBeforeOpen: () => {
        Swal.disableButtons();
      },
    });
  }

  return Swal.fire(params);
}

export async function MessageError(message, title = 'Atenção') {
  return Swal.fire({ icon: 'error', title, html: message });
}

export async function ToastSuccess(message) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    icon: 'success',
    title: message,
  });
}

export async function ToastError(message) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    icon: 'error',
    title: message,
  });
}
