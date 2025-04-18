import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const childCount = div.children.length;
      const hasP = div.querySelector('p');
      const hasPicture = div.querySelector('picture');
      
      if (childCount === 1 && hasPicture) {
        div.className = 'cards-card-image';
      } else if (childCount === 2 && hasP) {
        div.className = 'cards-card-pretitle';
      } else if (childCount === 3 && hasP) {
        div.className = 'cards-card-title';
      } else if (childCount === 4 && hasP) {
        div.className = 'cards-card-subtitle';
      } else if (childCount === 5 && hasP) {
        div.className = 'cards-card-bodytext';
      }
    });    
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
  let liElements = document.querySelectorAll('ul li');
  let lastLi = liElements[liElements.length - 1];
  lastLi.className = 'last-card';
  
  const lastCards = document.querySelector('.last-card');
  
  const ctaButtonLink = lastCards.querySelector('div:last-child > p > a');
  ctaButtonLink.className = 'ctaButtonLink'

  
}
