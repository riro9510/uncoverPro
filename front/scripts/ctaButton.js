document.querySelector('.ctaModalBtn').addEventListener('click', () => {
  document.querySelector('#modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('#modal').classList.add('hidden');
  document.body.style.overflow = ''; 
});

