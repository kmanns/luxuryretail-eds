import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  // Create the main container
  const container = document.createElement('div');
  container.classList.add('promotional-hero-container');

  rows.forEach((row, index) => {
    const section = document.createElement('div');
    section.classList.add('promotional-hero-section');
    section.classList.add(`promotional-hero-section-${index + 1}`);

    const cols = [...row.children];

    cols.forEach((col) => {
      const content = col.cloneNode(true);

      // Process images
      const pictures = content.querySelectorAll('picture');
      pictures.forEach((picture) => {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(
            img.src,
            img.alt,
            false,
            [{ width: '800' }],
          );
          picture.replaceWith(optimizedPicture);
        }
      });

      // Identify content type and add appropriate classes
      if (content.querySelector('picture')) {
        content.classList.add('promotional-hero-image');
      } else if (content.querySelector('h1, h2, h3, h4, h5, h6')) {
        content.classList.add('promotional-hero-content');

        // Wrap text content in overlay
        const overlay = document.createElement('div');
        overlay.classList.add('promotional-hero-overlay');

        // Move all content to overlay
        while (content.firstChild) {
          overlay.appendChild(content.firstChild);
        }

        content.appendChild(overlay);
      } else if (content.querySelector('a')) {
        content.classList.add('promotional-hero-cta');
      } else {
        content.classList.add('promotional-hero-text');
      }

      section.appendChild(content);
    });

    container.appendChild(section);
  });

  block.replaceChildren(container);
}
