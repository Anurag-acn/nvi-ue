export default function decorate(block) {
    const counts = {
      image: 0,
      cta: 0,
      text: 0,
      other: 0,
    };
  
    const ctaElements = [];
  
    [...block.children].forEach((div) => {
      if (div.querySelector('picture')) {
        counts.image += 1;
        div.classList.add(`hero-image-${counts.image}`);
      } else if (div.querySelector('a.button')) {
        counts.cta += 1;
        div.classList.add(`hero-cta-${counts.cta}`);
        ctaElements.push(div); // collect the CTA element
      } else if (div.querySelector('p')) {
        counts.text += 1;
        div.classList.add(`hero-text-${counts.text}`);
      } else {
        counts.other += 1;
        div.classList.add(`hero-section-${counts.other}`);
      }
    });
  
    // If there are any CTA elements, wrap them in a container
    if (ctaElements.length > 0) {
      const ctaContainer = document.createElement('div');
      ctaContainer.classList.add('hero-cta-container');
  
      ctaElements.forEach((cta) => {
        ctaContainer.appendChild(cta);
      });
  
      // Append the container to the block
      block.appendChild(ctaContainer);
    }
  }
  