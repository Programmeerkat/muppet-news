import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contentstack from "contentstack";

export default function News() {

  const renderOption = {
    // to render Supercharged RTE NodeType content like paragraph, link, table, order list, un-order list and more.
    p: (node, next) => {
      return `<p class='class-id'>${next(node.children)}</p>` // you will need to call next function with node children contents
    },
    h1: (node, next) => {
      return `<h1 class='class-id'>${next(node.children)}</h1>` // you will need to call next function with node children contents
    },
    // to render Supercharged RTE MarkType content like bold, italic, underline, strikethrough, inlineCode, subscript, and superscript
    bold: (node, text) => {
      return `<b>${text(node.children)}</b>`
    },
    // to render block-type embedded items  
    block: {  
      'product': (item, metadata) => {  
        return `<div>  
            <h2 >${item.title}</h2>  
            <img src=${item.product_image.url} alt=${item.product_image.title}/>  
            <p>${item.price}</p>  
            </div>`  
      },
      // to render the default  
      '$default': (item, metadata) => {  
        return `<div>  
            <h2>${item.title}</h2>  
            <p>${item.description}</p>  
            </div>`
      }  
    },
    // to display inline embedded items  
    inline: {  
      '$default': (item, metadata) => {  
        return `<span><b>${item.title}</b> - ${item.description}</span>`
      }  
    },
    // to display embedded items inserted via link  
    link: (item, metadata) => {  
      return `<a href="${metadata.attributes.href}">${metadata.text}</a>`
    },
    // to display assets  
    display: (item, metadata) => {  
      return `<img src=${metadata.attributes.src} alt=${metadata.alt} />`
    }  
  }

  const { id: newsId } = useParams();
  
  const [news, setNews] = useState(null);
  
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    Stack.ContentType("news")
      .Entry(newsId)
      .toJSON()
      .fetch()
      .then(result => {
        setNews(result);

        // Contentstack.Utils.jsonToHTML({ 
        //   entry: result, 
        //   path: [result.body.uid], 
        //   renderOption
        // })

        const authorUID = result.author[0].uid;
        const authorQuery = Stack.ContentType("author").Entry(authorUID);
        authorQuery.fetch()
          .then(author => setAuthor(author.toJSON()))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, [newsId]);

  return (
    <div className="p-4">
      {news !== null && <div>
        <h2>{news.title}</h2>
        <p>Posted on: {news.date}</p>
        <p>By: {author?.title}</p>
        {/* <p>{news.body}</p> */}
        <h2>About the author:</h2>
        {author !== null && <div className='p-4 rounded-xl bg-sky-100'>
          <h3>{author.title}</h3>
          <h3>{author.email}</h3>
          <img src={author.photo?.url} alt=''/>
        </div>}
      </div>}
    </div>
  );
}
