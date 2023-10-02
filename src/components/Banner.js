export default function Banner({ label, dialog, color }) {
  return (
    <div
      className="w-full h-10 flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <p className="font-bold">
        {label}: {dialog}
      </p>
    </div>
  );
}
