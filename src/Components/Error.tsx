import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Error({ err }: { err?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      const popup = document.getElementById("content");
      if (popup) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
  }, [isOpen]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background text-text">
      <div>
        <h1 className="mb-5 text-2xl text-center">
          Sorry for unexpected error :C
        </h1>
        <img
          src="https://img10.reactor.cc/pics/post/full/haoshen812-Genshin-Impact-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-Genshin-Impact-Gif-6860620.gif "
          className="cursor-pointer size-[360px] rounded-lg"
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
          >
            <div id="content" className="p-5 rounded-lg bg-neutral-900">
              <h2 className="text-xl">{err}</h2>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
