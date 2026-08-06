const themeButton = document.getElementById('themeButton');
const actionButton = document.getElementById('actionButton');
const page = document.documentElement;

themeButton.addEventListener('click', () => {
  page.classList.toggle('dark');
  themeButton.textContent = page.classList.contains('dark') ? 'Switch to light theme' : 'Toggle theme';
});

actionButton.addEventListener('click', () => {
  const card = actionButton.closest('.card');
  const paragraph = card.querySelector('p');
  paragraph.textContent = 'Nice! You clicked the button and updated the text.';
});
