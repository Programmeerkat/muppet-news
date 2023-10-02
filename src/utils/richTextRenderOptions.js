const richTextRenderOptions = {
  p: (node, next) => {
    return `<p>${next(node.children)}</p>`;
  },
  h1: (node, next) => {
    return `<h1>${next(node.children)}</h1>`;
  },
  h2: (node, next) => {
    return `<h2>${next(node.children)}</h2>`;
  },
  h3: (node, next) => {
    return `<h3>${next(node.children)}</h3>`;
  },
  bold: (text) => {
    return `<b>${text}</b>`;
  },
  italic: (text) => {
    return `<i>${text}</i>`;
  },
  // to render block-type embedded items
  block: {
    product: (entry, metadata) => {
      return `<div>
        <h2 >${entry.title}</h2>
        <img src=${entry.product_image.url} alt=${entry.product_image.title}/>
        <p>${entry.price}</p>
      </div>`;
    },
    // to render the default
    $default: (entry, metadata) => {
      return `<div>
                 <h2>${entry.title}</h2>
                 <p>${entry.description}</p>  
             </div>`;
    },
  },
  // to display inline embedded items
  inline: {
    $default: (entry) => {
      return `<span><b>${entry.title}</b> - ${entry.description}</span>`;
    },
  },
  // to display embedded items inserted via link
  link: (entry, metadata) => {
    return `<a class='text-sky-500' href="${metadata.attributes.href}">${metadata.text}</a>`;
  },
  // to display assets
  display: (asset, metadata) => {
    return `<img src=${
      asset.url || metadata.attributes.src || metadata.attributes["asset-link"]
    } alt=${metadata.alt}/>`;
  },
};

export default richTextRenderOptions;
