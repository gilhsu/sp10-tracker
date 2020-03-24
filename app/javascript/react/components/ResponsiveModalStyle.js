export const ResponsiveModalStyle = ({
  mobileWidthPercent,
  desktopWidthPercent,
  heightPercent,
  mobileWidth,
  transform = -50,
  top = "50%"
}) => {
  if (window.matchMedia("(max-width: 600px)").matches)
    // mobile style
    return {
      content: {
        top,
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: `translate(-50%, ${transform}%)`,
        width: `${mobileWidthPercent}%`,
        padding: "20px",
        height: `${heightPercent}%`,
        display: "block"
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.5)"
      }
    };
  // desktop style
  return {
    content: {
      top,
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: `translate(-50%, ${transform}%)`,
      width: `${desktopWidthPercent}%`,
      maxWidth: "1000px",
      padding: "50px",
      height: `${heightPercent}%`,
      display: "block"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };
};
