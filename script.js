document.getElementById('menu-toggle').addEventListener('click', function() {
  var list = document.getElementById('nav-list');
  if (list.classList.contains('show')) {
    list.classList.remove('show');
  } else {
    list.classList.add('show');
  }
});
