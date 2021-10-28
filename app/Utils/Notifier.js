export function toast(message, type, time = 2000) {
  // @ts-ignore
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true
  })

  Toast.fire({
    icon: type,
    title: message
  })
}