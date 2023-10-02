export default function Faq({ question, answer }) {
  return (
    <div className="p-4 rounded-xl bg-sky-100">
      <div>
        <p>{question}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  );
}
