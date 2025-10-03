export default function decorate(block) {
  const rows = [...block.children];
  const row = rows[0];

  if (!row) return;

  // Get cells and add classes to preserve UE instrumentation
  const cells = [...row.children];
  const [titleCell, descriptionCell, privacyCell] = cells;

  // Wrap row in container
  const container = document.createElement('div');
  container.className = 'newsletter-container';

  // Transform title cell
  if (titleCell) {
    titleCell.className = 'newsletter-title';
    const h2 = document.createElement('h2');
    h2.innerHTML = titleCell.innerHTML;
    titleCell.textContent = '';
    titleCell.appendChild(h2);
  }

  // Transform description cell
  if (descriptionCell) {
    descriptionCell.className = 'newsletter-description';
  }

  // Create form wrapper
  const formWrapper = document.createElement('div');
  formWrapper.className = 'newsletter-form-wrapper';

  // Create form
  const form = document.createElement('form');
  form.className = 'newsletter-form';

  // Create input wrapper
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'newsletter-input-wrapper';

  // Create email input
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.className = 'newsletter-input';
  emailInput.placeholder = 'Enter your email';
  emailInput.required = true;
  emailInput.setAttribute('aria-label', 'Email address');

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'newsletter-button';
  submitButton.textContent = 'Sign Up';

  inputWrapper.appendChild(emailInput);
  inputWrapper.appendChild(submitButton);
  form.appendChild(inputWrapper);
  formWrapper.appendChild(form);

  // Add expand/collapse behavior
  emailInput.addEventListener('focus', () => {
    inputWrapper.classList.add('expanded');
  });

  emailInput.addEventListener('blur', () => {
    if (!emailInput.value) {
      inputWrapper.classList.remove('expanded');
    }
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    // Add your newsletter signup logic here
    // TODO: Implement newsletter signup API call
    if (email) {
      emailInput.value = '';
      inputWrapper.classList.remove('expanded');
    }
  });

  // Transform privacy cell
  if (privacyCell) {
    privacyCell.className = 'newsletter-privacy';
  }

  // Insert form between description and privacy
  if (descriptionCell && privacyCell) {
    row.insertBefore(formWrapper, privacyCell);
  } else if (descriptionCell) {
    row.appendChild(formWrapper);
  }

  // Wrap row in container while preserving it
  row.classList.add('newsletter-row');
  block.insertBefore(container, row);
  container.appendChild(row);
}
