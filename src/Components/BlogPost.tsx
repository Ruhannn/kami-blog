import { useQuery } from "@tanstack/react-query";
import { getSingleBlogPost } from "../service";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import { Helmet } from "react-helmet";
import MarkDown from "./MarkDown";
import { motion } from "framer-motion";
import { checkMotion } from "../utils/checkMotion";
const BlogPost = () => {
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
      <div
        className={`min-h-screen px-4 sm:px-6 lg:px-8 bg-background ${
          checkMotion() ? "toggle-animation" : ""
        }`}
      >
        <main className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center">
            <motion.article
              initial={{ opacity: 0, y: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: -40, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                type: "spring",
                bounce: 0.3,
              }}
              className={`my-24 prose-sm prose dark:prose-invert bg-background sm:prose-base lg:prose-lg xl:prose-xl ${
                checkMotion() ? "toggle-animation" : ""
              }`}
            >
              <MarkDown>{post.markdown}</MarkDown>
            </motion.article>
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPost;
