export default function decorate(block) {
  const rows = [...block.children];

  // Extract content from table cells
  const [titleCell, descriptionCell, privacyCell] = rows[0]?.children || [];

  // Create newsletter container
  const container = document.createElement('div');
  container.className = 'newsletter-container';

  // Create title
  if (titleCell) {
    const title = document.createElement('h2');
    title.className = 'newsletter-title';
    title.textContent = titleCell.textContent;
    container.appendChild(title);
  }

  // Create description
  if (descriptionCell) {
    const description = document.createElement('p');
    description.className = 'newsletter-description';
    description.textContent = descriptionCell.textContent;
    container.appendChild(description);
  }

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

  container.appendChild(form);

  // Create privacy policy text
  if (privacyCell) {
    const privacy = document.createElement('p');
    privacy.className = 'newsletter-privacy';
    privacy.innerHTML = privacyCell.innerHTML;
    container.appendChild(privacy);
  }

  // Replace block content
  block.textContent = '';
  block.appendChild(container);
}
