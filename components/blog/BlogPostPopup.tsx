"use client";

import { useEffect, useState } from "react";
import { BLOG_FEED_TITLE, formatBlogDate, type BlogPostItem } from "@/lib/blog-data";

interface BlogPostPopupProps {
  post: BlogPostItem | null;
  onClose: () => void;
}

export function BlogPostPopup({ post, onClose }: BlogPostPopupProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!post) {
      setVisible(false);
      setClosing(false);
      return;
    }

    setClosing(false);
    const frame = window.requestAnimationFrame(() => setVisible(true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [post]);

  function handleClose() {
    if (closing) return;
    setClosing(true);
    setVisible(false);
    window.setTimeout(() => {
      onClose();
      setClosing(false);
    }, 320);
  }

  if (!post) return null;

  return (
    <div
      className={`blog-popup${visible ? " blog-popup--visible" : ""}${closing ? " blog-popup--closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div className="blog-popup__topbar">
        <button type="button" className="blog-popup__back" aria-label="Закрыть пост" onClick={handleClose}>
          <svg aria-hidden="true" width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M1 1L10 10L1 19" stroke="#000000" strokeWidth="2" />
          </svg>
        </button>
        <p className="blog-popup__feed-title">{BLOG_FEED_TITLE}</p>
      </div>

      <div className="blog-popup__panel">
        <div className="blog-popup__content">
          <h2 className="blog-popup__title">{post.title}</h2>
          <time className="blog-popup__date" dateTime={post.publishedAt}>
            {formatBlogDate(post.publishedAt)}
          </time>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.imageUrl} alt="" className="blog-popup__image" />
        </div>
      </div>
    </div>
  );
}
