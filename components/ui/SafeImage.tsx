import type { ImageProps } from "next/image";
import Image from "next/image";

type SafeImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt?: string;
};

/** next/image не оптимизирует SVG — используем обычный img */
export function SafeImage({ src, alt, width, height, className, priority }: SafeImageProps) {
  if (src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
