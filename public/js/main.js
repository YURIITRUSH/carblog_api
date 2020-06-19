var postForm = $('#newPostForm')
var alerts = $('.alerts')

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#image-preview').css({
        "height" : "200px",
        'width' : '200px',
        'backgroundSize' : 'cover',
        'backgroundImage' : 'url('+e.target.result+')'
      });
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#image").change(function() {
  readURL(this);
});

const elsToTruncate = document.querySelectorAll('.small-post--title')
for (var i = 0; i < elsToTruncate.length; i++){
  let options = {
  };
  new Dotdotdot( elsToTruncate[i], options );
}

postForm.on('submit', function (event) {
  event.preventDefault()
  var data = new FormData( this )
  var path = postForm.attr('action')
  var method = postForm.attr('method')
  $('input, textarea', postForm).each(function () {
    $(this).parent().find('label').removeClass('text-danger')
    $(this).removeClass('is-invalid')
    $(this).next().find('span').text('')
  })
  $.ajax({
    url: path,
    type: method,
    data: data,
    processData: false,
    contentType: false,
  })
    .done( function( data ) {
      var alert  = $('<div class="alert alert-success" role="alert">'+
      'A simple success alert—check it out!'+
      '</div>')
      $(':input', postForm)
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
      alert.appendTo(alerts)
      setTimeout(function () {
        alert.remove()
      }, 8000)
      setTimeout(function () {
        window.location.href = '/manager'
      }, 1000)
    })
    .fail(function (err) {
      const errors = err.responseJSON.errors;
      for (const property in errors) {
        $('[name="'+property+'"]').parent().find('label').addClass('text-danger')
        $('[name="'+property+'"]').addClass('is-invalid')
        $('[name="'+property+'"]').next().find('span').text(errors[property].message)
      }
    })
})

$('[data-delete]').on('click', function () {
  var id = $(this).data('delete')
  var _this = this
  $.ajax({
      url: '/'+path+'/'+id+'.json',
      type: 'DELETE',
      success: function(result) {
          var alert = $('<div class="alert alert-warning" role="alert">'+
            'A simple warning alert—check it out!'+
          '</div>')
          alert.appendTo(alerts)
          setTimeout( function () {
            alert.remove()
          }, 8000)
          $(_this).parent().parent().remove()
      }
  });
})
