import React from "react";
import { BiCheck, BiCopy } from "react-icons/bi";


import useClipboard from "../hook/useCopy";
import { highlighter } from "../utils/shiki";

interface CodeHighlighterProps {
  code: string;
  language: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  language,
}) => {
  const html = highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
  });
  const { ref, copied, onCopy } = useClipboard({ duration: 2000 });
  return (
    <div className="relative group">
      <div
        className="dark:selection:bg-[#2d2e3f] selection:bg-[#d5e0f7]"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="transition-opacity duration-200 ease-in-out absolute text-xs font-medium dark:text-[#d5d5ebef] text-[#3c3c438f] top-2 right-2 inter group-hover:opacity-0">
        {language}
      </div>
      <div className="absolute flex items-center justify-center top-2 right-2 dark:text-[#d5d5ebef] text-[#3c3c438f]">
        {copied ? (
          <div className="border dark:border-[#d5d5ebef] border-[#3c3c438f] border-r-[0px] dark:bg-[#32324e] bg-[#f9f9f9] flex justify-center items-center rounded-s-md w-[90px] h-5 sm:h-10 md:h-8">
            Copied
          </div>
        ) : null}
        <button
          className={`sm:text-xl text-base border dark:border-[#d5d5ebef] border-[#3c3c438f] dark:bg-[#32324e] bg-[#f9f9f9] flex justify-center items-center size-5 sm:size-10 md:size-8 transition-[opacity_colors] duration-300 ease-linear ${
            copied
              ? "rounded-r-md transition-none"
              : "rounded-md group-hover:opacity-100 opacity-0 dark:hover:bg-[#1e1e2e] hover:bg-[#ebebeb]"
          }`}
          onClick={onCopy}
        >
          {copied ? <BiCheck /> : <BiCopy />}
        </button>
      </div>
    </div>
  );
};

export default CodeHighlighter;
