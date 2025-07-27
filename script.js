// Toggle system sections open/closed
 document.addEventListener('DOMContentLoaded', () => {
   const systemSections = document.querySelectorAll('.system-section');
   systemSections.forEach(section => {
     const header = section.querySelector('.section-header');
     header.addEventListener('click', () => {
       section.classList.toggle('open');
     });
   });

   // Kanban drag-and-drop
   const tasks = document.querySelectorAll('.kanban-task');
   const columns = document.querySelectorAll('.kanban-column');

   tasks.forEach(task => {
     task.addEventListener('dragstart', dragStart);
   });

   columns.forEach(col => {
     col.addEventListener('dragover', dragOver);
     col.addEventListener('drop', dropTask);
   });

   function dragStart(e) {
     e.dataTransfer.setData('text/plain', e.target.id);
     // add class to highlight dragging if desired
   }

   function dragOver(e) {
     e.preventDefault();
   }

   function dropTask(e) {
     e.preventDefault();
     const id = e.dataTransfer.getData('text/plain');
     const task = document.getElementById(id);
     if (task) {
       this.appendChild(task);
     }
   }
 });
