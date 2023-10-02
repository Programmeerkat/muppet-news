import Authorpanel from "../components/Authorpanel";

export default function Authorpanelcollection({ authors }) {
  const authorAmount = 3;
  const shuffledAuthors = authors.sort(() => 0.5 - Math.random());
  const selectedAuthors = shuffledAuthors.slice(0, authorAmount);

  return (
    <div className="flex flex-wrap g-4 p-2 rounded-xl bg-sky-100">
      {selectedAuthors.map((author) => (
        <Authorpanel
          key={author.title}
          name={author.title}
          email={author.email}
          photoUrl={author.photo.url}
        />
      ))}
    </div>
  );
}
