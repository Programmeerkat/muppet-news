export default function Footer({ information }) {
  return (
    <header className="w-full h-20 bg-sky-500 flex justify-center">
      <div className="max-w-3xl h-full flex items-center">
        <p className="">{information}</p>
      </div>
    </header>
  );
}
