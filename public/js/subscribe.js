$(document).ready(function() {
  $('#subscribeBtn').on('click', function() {
    $('#subscribeBtn').toggleClass('.subscribed');
    $('#subscribeBtn').html('SUBSCRIBED');
  });
  $('#sendNowBtn').on('click', function() {
    $('#sendNowBtn').html('Sent!');
  });
});
