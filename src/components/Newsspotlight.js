import { Link } from "react-router-dom";

export default function Newsspotlight({
  title,
  author,
  date,
  summary,
  linkUrl,
  featuredImageUrl,
}) {
  return (
    <div className="p-2 rounded-xl bg-sky-100">
      <Link to={linkUrl} className="flex flex-col gap-4">
        <img
          src={featuredImageUrl}
          alt=""
          className="h-56 w-full object-cover rounded-xl"
        />
        <div className="flex flex-col gap-1">
          <h2>{title}</h2>
          <p>By: {author}</p>
          <p>Posted on: {date}</p>
          <p>{summary}</p>
        </div>
      </Link>
    </div>
  );
}
