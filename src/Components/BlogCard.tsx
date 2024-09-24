import { FunctionComponent } from "react";
import { BlogPost } from "../@types/schema";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Link } from "react-router-dom";

type BlogCardProps = {
  post: BlogPost;
};
dayjs.extend(localizedFormat);

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.slug}`}>
      <div className="w-full min-w-[300px] h-[280px] [box-shadow:0_2px_4px_0_rgba(0,0,0,0.1)] rounded-lg [box-sizing:border-box] overflow-hidden [&_*]:[transition:0.3s_ease_all] [&:hover_img]:-mt-8 [&:hover_h3]:[padding:8px_12px_0] [&:focus-within_img]:-mt-8 [&:focus-within_h3]:[padding:8px_12px_0] bg-secondary text-text dm-sans">
        <img
          className="w-full h-[224px] object-cover block"
          src={post.cover}
          alt={`cover image for ${post.title}`}
        />
        <h3 className="p-[12px_12px_48px] leading-8 font-medium text-xl">
          {post.title}
        </h3>
        <div className="p-[8px_12px]">
          <p className="leading-[1.5]">
            {dayjs(post.date).format("MMMM D, YYYY")} — {post.readTime}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
