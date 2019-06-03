window.onload = function() {

  $('#loginform').click(function() {
    $('.login').fadeToggle('slow');
    $(this).toggleClass('clicked');
  });

  $('input[type="submit"]').mousedown(function() {
    $(this).css('background', '#6dd7fd');
  });
  $('input[type="submit"]').mouseup(function() {
    $(this).css('background', '#0093cb');
  });

  $('input[type="submit"]').click(function(){
    $('.login').fadeToggle('slow');
  })

}
