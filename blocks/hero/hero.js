export default function decorate(block) {
  const counts = {
    image: 0,
    cta: 0,
    text: 0,
    other: 0,
  };

  let imageDiv;

  [...block.children].forEach((div) => {
    if (div.querySelector('picture')) {
      counts.image += 1;
      div.classList.add(`hero-image-${counts.image}`);
      imageDiv = div;
    }
  });

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-content-wrapper');

  const wrapperDiv = imageDiv?.nextElementSibling;
  const firstInnerDiv = wrapperDiv?.querySelector('div');
  const contentElements = firstInnerDiv ? [...firstInnerDiv.children] : [];
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('hero-cta-container');

  contentElements.forEach((el) => {
    if (el.querySelector('a.button')) {
      counts.cta += 1;
      const ctaDiv = document.createElement('div');
      ctaDiv.classList.add(`hero-cta-${counts.cta}`);
      ctaDiv.appendChild(el);
      ctaContainer.appendChild(ctaDiv);
    } else {
      counts.text += 1;
      const textDiv = document.createElement('div');
      textDiv.classList.add(`hero-text-${counts.text}`);
      textDiv.appendChild(el);
      contentWrapper.appendChild(textDiv);
    }
  });

  if (ctaContainer.children.length > 0) {
    contentWrapper.appendChild(ctaContainer);
  }

  imageDiv?.nextElementSibling?.remove();

  block.appendChild(contentWrapper);
}
