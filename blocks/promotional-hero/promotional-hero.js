import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  // Create the main container for dual heroes
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('promotional-hero-main-container');

  // Process up to two rows for dual hero design
  rows.slice(0, 2).forEach((row, index) => {
    const cols = [...row.children];

    // Create individual hero container
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('promotional-hero-container');
    heroContainer.classList.add(`promotional-hero-${index + 1}`);

    let backgroundImage = null;
    const contentElements = [];
    let ctaElement = null;

    // Separate content types
    cols.forEach((col) => {
      const content = col.cloneNode(true);

      if (content.querySelector('picture')) {
        // This is the background image
        const picture = content.querySelector('picture');
        const img = picture.querySelector('img');
        if (img) {
          backgroundImage = createOptimizedPicture(
            img.src,
            img.alt,
            false,
            [{ width: '800' }],
          );
        }
      } else if (content.querySelector('a')) {
        // This is the CTA
        ctaElement = content;
      } else {
        // This is text content
        contentElements.push(content);
      }
    });

    // Create background image container
    if (backgroundImage) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('promotional-hero-background');
      imageContainer.appendChild(backgroundImage);
      heroContainer.appendChild(imageContainer);
    }

    // Create bottom overlay box
    const overlayBox = document.createElement('div');
    overlayBox.classList.add('promotional-hero-overlay-box');

    // Add content to overlay box
    contentElements.forEach((content) => {
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('promotional-hero-content');
      while (content.firstChild) {
        contentDiv.appendChild(content.firstChild);
      }
      overlayBox.appendChild(contentDiv);
    });

    // Add CTA to overlay box
    if (ctaElement) {
      const ctaDiv = document.createElement('div');
      ctaDiv.classList.add('promotional-hero-cta');
      while (ctaElement.firstChild) {
        ctaDiv.appendChild(ctaElement.firstChild);
      }
      overlayBox.appendChild(ctaDiv);
    }

    heroContainer.appendChild(overlayBox);
    mainContainer.appendChild(heroContainer);
  });

  block.replaceChildren(mainContainer);
}
