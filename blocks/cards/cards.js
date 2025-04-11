import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('cards-list');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cards-card');

    // Move instrumentation
    moveInstrumentation(row, li);

    const rowDivs = [...row.children];
    rowDivs.forEach((col, i) => {
      const div = document.createElement('div');

      // Detect image column
      if (col.querySelector('picture')) {
        div.className = 'cards-card-image';
        const img = col.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        div.append(optimizedPic);
      } else {
        div.className = 'cards-card-body';
        const paras = col.querySelectorAll('p');
        paras.forEach((p, index) => {
          if (index === 0) p.classList.add('card-title');
          else if (index === 1) p.classList.add('card-subtitle');
          else if (p.querySelector('a')) {
            p.classList.add('card-link');
            const links = p.querySelectorAll('a');
            links.forEach((a, i) => a.classList.add(`card-link${i + 1}`));
          } else {
            p.classList.add('card-description');
          }
          div.append(p);
        });
      }

      li.append(div);
    });

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
