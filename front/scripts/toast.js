async function showToast(message, duration = 3000) {
  return new Promise(resolve => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
      resolve(); 
    }, duration);
  });
}

export {showToast}
