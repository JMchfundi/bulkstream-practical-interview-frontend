import swal from "sweetalert";

export default {
  success(msg = 'Success!') {
    swal({
      icon: 'success',
      title: msg, timer: 1500,
      buttons: false,
    });
  },

  error(msg = 'Something went wrong.') {
    swal({
      icon: 'error',
      title: msg, timer: 1500,
      buttons: false,
    });
  },

  info(msg = 'Heads up!') {
    swal({
      icon: 'info',
      title: msg, timer: 1500,
      buttons: false,
    });
  },

  warning(msg = 'Careful now.') {
    swal({
      icon: 'warning',
      title: msg, timer: 1500,
      buttons: false,
    });
  }
};
