// accordion.js – toggles accordion items in Systems page
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // toggle only this item
      item.classList.toggle('active');
    });
  });
});