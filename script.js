document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const body = document.body;

  // Theme persistence
  function setTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
      body.classList.remove('bg-light');
      body.classList.add('bg-dark');
      themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
      themeToggle.classList.remove('btn-outline-light');
      themeToggle.classList.add('btn-outline-dark');
    } else {
      body.classList.remove('bg-dark');
      body.classList.add('bg-light');
      themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
      themeToggle.classList.remove('btn-outline-dark');
      themeToggle.classList.add('btn-outline-light');
    }
    localStorage.setItem('theme', theme);
  }

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-bs-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
    }
  });

  function addTodo(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;
    li.appendChild(span);

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn btn-success btn-sm me-2';
    completeBtn.innerHTML = '<i class="bi bi-check"></i>';
    completeBtn.title = 'Mark as completed';
    completeBtn.onclick = function() {
      li.classList.toggle('completed');
    };
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.title = 'Delete';
    deleteBtn.onclick = function() {
      list.removeChild(li);
    };
    li.appendChild(deleteBtn);

    list.appendChild(li);
  }
});
