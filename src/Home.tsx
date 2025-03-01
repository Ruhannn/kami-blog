import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { BlogPost } from "./@types/schema";
import BlogCard from "./Components/BlogCard";
import Error from "./Components/Error";
import { AnimatedGroup } from "./Components/GroupAnimated";
import Loading from "./Components/Loading";
import { getBlogPosts } from "./service";
import { checkMotion } from "./utils/checkMotion";

const Home = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => getBlogPosts(),
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

  const title = "Kami Blogs";
  const description = "Some Blog About Something...";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={description}
        />
        <meta
          name={"og:title"}
          title={"og:title"}
          content={title}
        />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={title}
        />
      </Helmet>
      <div
        className={`min-h-[200vh] p-4 bg-background ${
          checkMotion() ? "toggle-animation" : ""
        }`}>
        <h1 className="text-3xl text-center my-7">Blogs</h1>
        {Array.isArray(posts) && posts.length > 0 ? (
          <AnimatedGroup
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.2,
                    type: "spring",
                    bounce: 0.3,
                  },
                },
              },
            }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post: BlogPost) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </AnimatedGroup>
        ) : (
          <p className="text-center">No blog posts available.</p>
        )}
      </div>
    </>
  );
};

export default Home;
