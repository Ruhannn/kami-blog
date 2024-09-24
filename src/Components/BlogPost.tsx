/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useQuery } from "@tanstack/react-query";
import { getSingleBlogPost } from "../service";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useThemeContext } from "../context/themeContext";
import { Helmet } from "react-helmet";
import { dracula, oneLight } from "./CodeTheme";
const BlogPost = () => {
  const { theme } = useThemeContext();
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getSingleBlogPost(slug!),
    retry: 3,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error err={error.message} />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta name="og:title" content={post.title} />
        <meta name="og:description" content={post.description} />
        <meta name="og:image" content={post.cover} />
      </Helmet>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8">
        <main className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center">
            <article className="prose-sm prose dark:prose-invert bg-background sm:prose-base lg:prose-lg xl:prose-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        key={theme}
                        style={theme === "light" ? oneLight : dracula}
                        PreTag="div"
                        language={match[1]}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.markdown}
              </ReactMarkdown>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPost;
