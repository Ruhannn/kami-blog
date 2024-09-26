/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeHighlighter from "./CodeHighlighter";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import PPlayer from "./PPlayer";

export default function MarkDown({ children }: any) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeHighlighter
              code={String(children).replace(/\n$/, "")}
              language={match[1]}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        a: ({ href, children }) => {
          return children?.toString().endsWith("mp4") ? (
            <PPlayer url={href!.toString()} />
          ) : (
            <Link
              isBlock
              showAnchorIcon
              color="primary"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </Link>
          );
        },
        img: ({ alt, src }) => (
          <div>
            <Image isZoomed draggable={false} src={src} alt={alt} />
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}