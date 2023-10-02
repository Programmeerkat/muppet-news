export default function Authorpanel({ name, email, photoUrl }) {
  return (
    <div className="p-2 rounded-xl flex gap-4">
      <div className="flex flex-col gap-1">
        <img
          src={photoUrl}
          alt=""
          className="h-56 w-56 object-cover rounded-xl"
        />
        <h2>{name}</h2>
        <p className="text-s">{email}</p>
      </div>
    </div>
  );
}
