import { useEffect, useRef } from "react";

const useTextAreaAutosizer = (value: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 5 + "px"; // +5 to avoid scrollbar
    }
  }, [value]);

  return { textAreaRef };
};

export { useTextAreaAutosizer };
