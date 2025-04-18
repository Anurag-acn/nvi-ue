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
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      if(div.children.length === 2 && div.querySelector('p')) div.className = 'cards-card-pretitle';
      if (div.children.length === 3 && div.querySelector('p')) div.className = 'cards-card-title';
      if (div.children.length === 4 && div.querySelector('p')) div.className = 'cards-card-subtitle';
      if (div.children.length === 5 && div.querySelector('p')) div.className = 'cards-card-bodytext';
      // else
      //  div.className = 'cards-card-body'

    
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
