$(document).ready(function() {
  $('#form_btn').on('click', function() {
    $('#slider').fadeIn('slow');
    if (this.hash !== "") {
     event.preventDefault();

     var hash = this.hash;

     $('html, body').animate({
       scrollTop: $('#up').offset().top
     }, 800, function(){

       window.location.hash = hash;
     });
   }
});

  $('#btn_1').on('click', function() {
    $('#faded_text').fadeIn('slow');
  });
  $('#btn_2').on('click', function() {
    window.location.replace('game.html');
  });

  let error_name = false;
  let error_email = false;
  let error_password = false;
  let error_retype_password = false;
  $("#name").focusout(function() {
    check_fname();
  });
  $("#email").focusout(function() {
    check_email();
  });
  $("#pass").focusout(function() {
    check_password();
  });
  $("#re_pass").focusout(function() {
    check_retype_password();
  });

  function check_name() {
    let pattern = /^[a-zA-Z]*$/;
    let name = $("#name").val();
    if (pattern.test(name) && name !== '') {
      $("name").css("border-bottom", "2px solid #34F458");
    } else {
      $("#name").css("border-bottom", "2px solid #F90A0A");
      error_name = true;
    }
  }

  function check_password() {
    let password_length = $("#pass").val().length;
    if (password_length < 8) {
      $("#pass").css("border-bottom", "2px solid #F90A0A");
      error_password = true;
    } else {
      $("#pass").css("border-bottom", "2px solid #34F458");
    }
  }

  function check_retype_password() {
    let password = $("#pass").val();
    let retype_password = $("#re_pass").val();
    if (password !== retype_password) {
      $("#re_pass").css("border-bottom", "2px solid #F90A0A");
      error_retype_password = true;
    } else {
      $("#re_pass").css("border-bottom", "2px solid #34F458");
    }
  }

  function check_email() {
    let pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let email = $("#email").val();
    if (pattern.test(email) && email !== '') {
      $("#email").css("border-bottom", "2px solid #34F458");
    } else {
      $("#email").css("border-bottom", "2px solid #F90A0A");
      error_email = true;
    }
  }

  $("#form").submit(function() {
    error_name = false;
    error_email = false;
    error_password = false;
    error_retype_password = false;
    check_name();
    check_email();
    check_password();
    check_retype_password();
    if (error_name === false && error_email === false && error_password === false && error_retype_password === false) {
      alert("Registration successfull");
      return true;
    } else {
      alert("Please fill the form correctly");
      return false;
    }
  });
});
