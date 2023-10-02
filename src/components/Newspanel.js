import { Link } from "react-router-dom";

export default function Newspanel({
  title,
  author,
  date,
  summary,
  linkUrl,
  featuredImageUrl,
}) {
  return (
    <div className="p-2 rounded-xl bg-sky-100">
      <Link to={linkUrl} className="flex gap-4">
        <img
          src={featuredImageUrl}
          alt=""
          className="h-40 w-56 object-cover rounded-xl"
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
