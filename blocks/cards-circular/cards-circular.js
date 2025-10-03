import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-circular-item-image';
      } else if (div.children.length === 1 && div.querySelector('a')) {
        div.className = 'cards-circular-item-link';
      } else {
        div.className = 'cards-circular-item-body';
      }
    });
    ul.append(li);
  });

  // Optimize images and make them circular
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }]));
  });

  block.replaceChildren(ul);
}
