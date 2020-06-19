$('#searchInput').hide()
$('#searchToggle').on('click', function () {
  console.log('works');
})

$('.menu-opener').on('click', function () {
  $('.menu').toggleClass('is-opened')
})

const testData = {
  name: 'alex',
  email: 'alex5000@alex.com'
}
function templateApply (selector, data) {
  const el = $(selector)
  let textTemplate = el.text()
  for (const property in data) {
    const search = '{{' + property + '}}'
    const replaceWith = data[property];
    textTemplate = textTemplate.split(search).join(replaceWith);
  }
  el.text(textTemplate)
}

$('.subscriber').on('submit', function (event) {
  $('[data-error]').text('')
  event.preventDefault();
  const _this = this
  const method = $(this).attr('method')
  const action = $(this).attr('action')
  let data = {}
  $('input', this).each(function (index) {
    data[$(this).attr('name')] = $(this).val()
  })
  $.ajax({
      url: action,
      type: method,
      data: data
  })
  .done(function (data) {
    $('input', _this).val('')
    templateApply ('#hidden-thanks p', data)
    $.fancybox.open({
      src: '#hidden-thanks',
      modal: false
    })
  })
  .fail( function (err) {
    const errors = err.responseJSON.errors
    for(const property in errors) {
      $('[data-error="' + property + '"]', _this).text((errors[property].message))
    }
  })
})
