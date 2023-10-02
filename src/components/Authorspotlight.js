export default function Authorspotlight({ name, email, photoUrl, bio }) {
  return (
    <div className="p-2 rounded-xl bg-sky-100 flex gap-4">
      <div className="flex flex-col gap-1">
        <h2>{name}</h2>
        <p className="text-s">{email}</p>
        <div dangerouslySetInnerHTML={{ __html: bio }} />
      </div>
      <img
        src={photoUrl}
        alt=""
        className="h-56 w-56 object-cover rounded-xl"
      />
    </div>
  );
}
