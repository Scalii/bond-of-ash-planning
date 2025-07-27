// board.js – controls the Kanban board behaviour

// Basic dataset for default tasks
const defaultTasks = [
  { id: 'task1', text: 'Inventory System', column: 'todo' },
  { id: 'task2', text: 'Ability System & Skill Tree', column: 'todo' },
  { id: 'task3', text: 'Dragon Companion', column: 'todo' },
  { id: 'task4', text: 'Co‑op Networking', column: 'todo' },
  { id: 'task5', text: 'Missions & Quests', column: 'todo' },
  { id: 'task6', text: 'AI & Enemies', column: 'todo' },
  { id: 'task7', text: 'Save/Load System', column: 'todo' },
  { id: 'task8', text: 'UI & Interaction', column: 'todo' },
  { id: 'task9', text: 'Open World & Streaming', column: 'todo' },
  { id: 'task10', text: 'Audio & VFX', column: 'todo' },
  { id: 'task11', text: 'Vehicles', column: 'todo' },
  { id: 'task12', text: 'Weapon System', column: 'todo' },
  { id: 'task13', text: 'Crafting & Shelters', column: 'todo' },
];

// Helpers for localStorage
function loadTasks() {
  try {
    const stored = JSON.parse(localStorage.getItem('boa-kanban-tasks'));
    return Array.isArray(stored) ? stored : defaultTasks;
  } catch (e) {
    return defaultTasks;
  }
}

function saveTasks(tasks) {
  localStorage.setItem('boa-kanban-tasks', JSON.stringify(tasks));
}

// Create a card element
function createCard(task) {
  const card = document.createElement('div');
  card.classList.add('kanban-card');
  card.textContent = task.text;
  card.setAttribute('draggable', 'true');
  card.dataset.id = task.id;
  return card;
}

// Render tasks into columns
function renderBoard(tasks) {
  // Clear lists
  document.querySelectorAll('.kanban-list').forEach(list => list.innerHTML = '');
  // Append tasks
  tasks.forEach(task => {
    const card = createCard(task);
    const list = document.getElementById(`${task.column}-list`);
    if (list) list.appendChild(card);
  });
}

// Drag & drop logic
function setupDragAndDrop() {
  let dragged = null;

  document.addEventListener('dragstart', e => {
    if (e.target.classList.contains('kanban-card')) {
      dragged = e.target;
      e.target.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    }
  });

  document.addEventListener('dragend', e => {
    if (dragged) {
      dragged.classList.remove('dragging');
      dragged = null;
    }
  });

  document.querySelectorAll('.kanban-list').forEach(list => {
    const column = list.parentElement;
    list.addEventListener('dragenter', e => {
      e.preventDefault();
      column.classList.add('drag-over');
    });
    list.addEventListener('dragover', e => {
      e.preventDefault();
    });
    list.addEventListener('dragleave', e => {
      column.classList.remove('drag-over');
    });
    list.addEventListener('drop', e => {
      e.preventDefault();
      column.classList.remove('drag-over');
      if (dragged) {
        list.appendChild(dragged);
        const tasks = loadTasks();
        const id = dragged.dataset.id;
        const col = list.id.replace('-list', '');
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.column = col;
          saveTasks(tasks);
        }
      }
    });
  });
}

function setupAddTask() {
  const input = document.getElementById('new-task-input');
  const button = document.getElementById('add-task-btn');
  button.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    const tasks = loadTasks();
    const id = `task${Date.now()}`;
    const newTask = { id, text, column: 'todo' };
    tasks.push(newTask);
    saveTasks(tasks);
    renderBoard(tasks);
    input.value = '';
  });
}

// Init function
document.addEventListener('DOMContentLoaded', () => {
  const tasks = loadTasks();
  renderBoard(tasks);
  setupDragAndDrop();
  setupAddTask();
});