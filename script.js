/*
 * Simple JavaScript to power the collapsible sections. It attaches click
 * handlers to each section header and toggles an `.open` class on the parent
 * element. The CSS uses this class to show or hide the section content and
 * rotate the toggle icon.
 */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.system-section');
  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    header.addEventListener('click', () => {
      // Toggle the 'open' class on the section to show/hide details
      section.classList.toggle('open');
    });
  });
});