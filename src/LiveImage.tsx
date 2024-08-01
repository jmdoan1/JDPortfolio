import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

const LiveImage = ({
  style,
  ...rest
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  const [imageSrc, setImageSrc] = useState("");

  const captureVisibleWindow = () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    html2canvas(document.body, {
      backgroundColor: null,
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: -scrollX,
      scrollY: -scrollY,
    }).then((canvas) => {
      setImageSrc(canvas.toDataURL("image/png"));
    });
  };

  useEffect(() => {
    captureVisibleWindow();
    const handleScroll = () => {
      captureVisibleWindow();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return imageSrc ? (
    <img
      src={imageSrc}
      alt="Live View"
      style={{
        marginTop: 0,
        width: "50%",
        aspectRatio: 1,
        objectFit: "cover",
        ...style,
      }}
      {...rest}
    />
  ) : null;
};

export default LiveImage;
