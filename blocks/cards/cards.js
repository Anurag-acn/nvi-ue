import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    debugger
    [...li.children].forEach((div) => {
      const length = div.children.length;
      const hasP = div.querySelector('p');
      const hasPicture = div.querySelector('picture');
    
      const classMap = {
        1: () => hasPicture && 'cards-card-image',
        2: () => hasP && 'cards-card-pretitle',
        3: () => hasP && 'cards-card-title',
        4: () => hasP && 'cards-card-subtitle',
        5: () => hasP && 'cards-card-bodytext',
      };
    
      const className = classMap[length]?.();
      if (className) div.className = className;
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
