const richTextRenderOptions = {
  // to render Supercharged RTE NodeType content like paragraph, link, table, order list, un-order list and more.
  p: (node, next) => {
    return `<p class='class-id'>${next(node.children)}</p>`; // you will need to call next function with node children contents
  },
  h1: (node, next) => {
    return `<h1 class='class-id'>${next(node.children)}</h1>`; // you will need to call next function with node children contents
  },
  // to render Supercharged RTE MarkType content like bold, italic, underline, strikethrough, inlineCode, subscript, and superscript
  bold: (node, text) => {
    return `<b>${text(node.children)}</b>`;
  },
  // to render block-type embedded items
  block: {
    product: (item, metadata) => {
      return `<div>  
            <h2 >${item.title}</h2>  
            <img src=${item.product_image.url} alt=${item.product_image.title}/>  
            <p>${item.price}</p>  
            </div>`;
    },
    // to render the default
    $default: (item, metadata) => {
      return `<div>  
            <h2>${item.title}</h2>  
            <p>${item.description}</p>  
            </div>`;
    },
  },
  // to display inline embedded items
  inline: {
    $default: (item, metadata) => {
      return `<span><b>${item.title}</b> - ${item.description}</span>`;
    },
  },
  // to display embedded items inserted via link
  link: (item, metadata) => {
    return `<a href="${metadata.attributes.href}">${metadata.text}</a>`;
  },
  // to display assets
  display: (item, metadata) => {
    return `<img src=${metadata.attributes.src} alt=${metadata.alt} />`;
  },
};

export default richTextRenderOptions;
