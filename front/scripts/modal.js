class ModalForm {
  constructor() {
    this.modal = document.getElementById('modal');
    this.modalBody = document.getElementById('modal-body');
    this.modalTitle = document.getElementById('modal-title');
    this.modalActions = document.querySelector('.modal-actions');
    this.closeBtn = document.querySelector('.close-btn');
    
    this.sections = [];
    this.currentSectionIndex = 0;
    this.formData = {};
    this.jsonData = null;
  }
  
  init(jsonData) {
    this.jsonData = jsonData;
    this.sections = jsonData.sections;
    this.setupNavigation();
    this.renderCurrentSection();
  }
  
  setupNavigation() {
    this.modalActions.innerHTML = '';
    
    this.closeBtn.addEventListener('click', () => this.close());
    
    if (this.currentSectionIndex > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'nav-btn prev-btn';
      prevBtn.textContent = 'Anterior';
      prevBtn.addEventListener('click', () => this.prevSection());
      this.modalActions.appendChild(prevBtn);
    }
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-btn next-btn';
    nextBtn.textContent = this.isLastSection() ? 'Enviar' : 'Siguiente';
    nextBtn.addEventListener('click', () => this.isLastSection() ? this.submitForm() : this.nextSection());
    this.modalActions.appendChild(nextBtn);
  }
  
  renderCurrentSection() {
    if (!this.sections.length) return;
    
    const section = this.sections[this.currentSectionIndex];
    this.modalTitle.textContent = section.sectionName;
    this.modalBody.innerHTML = '';
    
    section.fields.forEach(field => {
      const component = this.createComponent(field);
      this.modalBody.appendChild(component);
    });
    
    this.setupNavigation();
  }
  
  createComponent(field) {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = field.question;
    if (field.required) {
      label.innerHTML += ' <span style="color:red">*</span>';
    }
    group.appendChild(label);
    
    let component;
    switch(field.type) {
  case 'input':
    component = this.createInputComponent(field);
    break;
  case 'select':
    component = this.createSelectComponent(field);
    break;
  case 'multiselect-chips':
    component = this.createChipsComponent(field);
    break;
  case 'textarea': 
    component = this.createTextareaComponent(field);
    break;
  case 'daterange': 
    component = this.createDateRangeComponent(field);
    break;
  default:
    component = document.createElement('div');
    component.textContent = 'Unsupported component type';
}
    
    group.appendChild(component);
    return group;
  }
  
  createInputComponent(field) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = field.placeholder || '';
    input.required = field.required || false;
    
    if (field.validation) {
      input.pattern = field.validation.regex;
      input.title = field.validation.errorMessage;
    }
    
    input.addEventListener('change', (e) => {
      this.formData[field.question] = e.target.value;
    });
    
    return input;
  }
  
  createSelectComponent(field) {
    const select = document.createElement('select');
    select.required = field.required || false;
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = field.placeholder || 'Selecciona una opción';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    select.appendChild(defaultOption);
    
    field.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
    
    select.addEventListener('change', (e) => {
      this.formData[field.question] = e.target.value;
    });
    
    return select;
  }
  
  createChipsComponent(field) {
    const container = document.createElement('div');
    
    if (field.allowCustom) {
      const customInput = document.createElement('input');
      customInput.type = 'text';
      customInput.placeholder = field.placeholder || 'Escribe y presiona Enter';
      customInput.className = 'custom-chip-input';
      
      customInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
          this.addChip(container, e.target.value.trim(), field, true);
          e.target.value = '';
          
          const customChips = container.querySelectorAll('.chip.custom').length;
          if (customChips >= field.maxCustomOptions) {
            customInput.style.display = 'none';
          }
        }
      });
      
      container.appendChild(customInput);
    }
    
    
    const chipsContainer = document.createElement('div');
    chipsContainer.className = 'chips-container';
    container.appendChild(chipsContainer);
    
    field.options.forEach(option => {
      const optionEl = document.createElement('div');
      optionEl.textContent = option;
      optionEl.style.cursor = 'pointer';
      optionEl.style.padding = '0.5rem';
      optionEl.style.margin = '0.25rem';
      optionEl.style.borderRadius = '4px';
      optionEl.style.backgroundColor = '#f0f0f0';
      
      optionEl.addEventListener('click', () => {
        this.toggleChip(chipsContainer, option, field);
      });
      
      container.appendChild(optionEl);
    });
    
    return container;
  }
  
  createTextareaComponent(field) {
  const textarea = document.createElement('textarea');
  textarea.placeholder = field.placeholder || '';
  textarea.required = field.required || false;
  textarea.maxLength = field.maxLength || null;
  
   textarea.addEventListener('input', (e) => {
    const remaining = field.maxLength - e.target.value.length;
    if (remaining < 50) { 
      const counter = document.getElementById(`${field.question}-counter`) || 
                     document.createElement('div');
      counter.id = `${field.question}-counter`;
      counter.textContent = `${remaining} caracteres restantes`;
      counter.style.fontSize = '0.8em';
      counter.style.color = remaining < 10 ? 'red' : '#666';
      if (!textarea.nextElementSibling || !textarea.nextElementSibling.id.includes('counter')) {
        textarea.parentNode.appendChild(counter);
      }
    }
  });
  
  return textarea;
}

createDateRangeComponent(field) {
  const container = document.createElement('div');
  container.className = 'date-range-container';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = field.placeholder;
  input.required = field.required;
  
  if (field.validation) {
    input.pattern = field.validation.regex;
    input.title = field.validation.errorMessage;
  }
  
  input.addEventListener('change', (e) => {
    this.formData[field.question] = e.target.value;
  });
  
  container.appendChild(input);
  return container;
}
  toggleChip(container, value, field) {
    const existingChip = container.querySelector(`.chip[data-value="${value}"]`);
    
    if (existingChip) {
      container.removeChild(existingChip);
    } else {
      const currentChips = container.querySelectorAll('.chip').length;
      if (field.maxSelections && currentChips >= field.maxSelections) {
        alert(`Solo puedes seleccionar ${field.maxSelections} elementos`);
        return;
      }
      
      this.addChip(container, value, field, false);
    }
    
    this.updateChipsFormData(container, field);
  }
  
  addChip(container, value, field, isCustom) {
    const chip = document.createElement('div');
    chip.className = `chip ${isCustom ? 'custom' : ''}`;
    chip.dataset.value = value;
    
    const chipText = document.createElement('span');
    chipText.textContent = value;
    chip.appendChild(chipText);
    
    const removeBtn = document.createElement('span');
    removeBtn.className = 'chip-remove';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      container.removeChild(chip);
      this.updateChipsFormData(container, field);
      if (isCustom) {
        const customInput = container.parentElement.querySelector('.custom-chip-input');
        if (customInput) {
          customInput.style.display = 'block';
        }
      }
    });
    
    chip.appendChild(removeBtn);
    container.appendChild(chip);
  }
  
updateChipsFormData(container, field) {
  const chips = container.querySelectorAll('.chip');
  const values = Array.from(chips).map(chip => chip.dataset.value);
  this.formData[field.question] = values;
  
  // Actualizar visualmente si no cumple con el mínimo
  if (field.minSelections && values.length < field.minSelections) {
    container.style.border = '1px solid #ff4444';
  } else {
    container.style.border = '1px solid #ccc';
  }
}
  
  prevSection() {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.renderCurrentSection();
    }
  }
  
  nextSection() {
    if (this.validateCurrentSection()) {
      if (this.currentSectionIndex < this.sections.length - 1) {
        this.currentSectionIndex++;
        this.renderCurrentSection();
      }
    }
  }
  
  isLastSection() {
    return this.currentSectionIndex === this.sections.length - 1;
  }
  
validateCurrentSection() {
  const currentSection = this.sections[this.currentSectionIndex];
  let isValid = true;

  currentSection.fields.forEach(field => {
    if (field.required && !this.formData[field.question]) {
      isValid = false;
      alert(`El campo "${field.question}" es requerido`);
    }
    if (field.type === 'multiselect-chips') {
      const currentSelections = this.formData[field.question]?.length || 0;
      
      if (field.minSelections && currentSelections < field.minSelections) {
        isValid = false;
        alert(`Debes seleccionar al menos ${field.minSelections} habilidades`);
      }
      
      if (field.maxSelections && currentSelections > field.maxSelections) {
        isValid = false;
        alert(`Solo puedes seleccionar máximo ${field.maxSelections} habilidades`);
      }
      
    }
    if (field.type === 'daterange' && this.formData[field.question]) {
        const dateRegex = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(this.formData[field.question])) {
          isValid = false;
          alert(`Formato de fecha inválido. Usa MM/YYYY - MM/YYYY`);
        }
      }
  });

  return isValid;
}
  
  open() {
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  
  submitForm() {
    if (this.validateCurrentSection()) {
      console.log('Formulario completo enviado:', this.formData);
      alert('Formulario enviado con éxito!');
      this.close();
    }
  }
}

const modalForm = new ModalForm();

document.querySelector('.ctaModalBtn').addEventListener('click', () => {
  fetch('mock.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      modalForm.init(data);
      modalForm.open();
    })
    .catch(error => {
      console.error('Error al cargar el JSON:', error);
      alert('Error al cargar el formulario');
    });
});