function toggleMenu() {
  const navLinks = document.querySelector('.navbar-links');
  navLinks.classList.toggle('active');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('dark-mode');
  const links = document.querySelectorAll('.navbar-links li a');
  links.forEach(link => link.classList.toggle('dark-mode'));
}




