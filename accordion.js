// accordion.js – toggles accordion items in Systems page
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // toggle this item
      const isActive = item.classList.contains('active');
      // close all items
      items.forEach(i => i.classList.remove('active'));
      // if not previously active, open it
      if (!isActive) item.classList.add('active');
    });
  });
});