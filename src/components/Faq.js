import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Faq({ question, answer }) {
  const [opened, setOpened] = useState(false);

  const onClickHandler = () => setOpened((frev) => setOpened(!frev));

  return (
    <div className="p-4 rounded-xl bg-sky-100 flex flex-col">
      <button className="w-full flex gap-4" onClick={onClickHandler}>
        <p className="flex-1 text-left">{question}</p>
        <FaChevronDown
          className={`h-6 w-6 ${
            opened ? "" : "rotate-180"
          } transition-transform`}
        />
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: answer }}
        className={` flex flex-col gap-1 overflow-hidden ${
          opened ? "h-auto opacity-100 pt-4" : "h-0 opacity-0 "
        } transition-all transition-[height] transition-height duration-500 ease-in-out`}
      />
    </div>
  );
}
