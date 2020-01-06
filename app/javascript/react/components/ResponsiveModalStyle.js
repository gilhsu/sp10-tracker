export const ResponsiveModalStyle = ({
  mobileWidthPercent,
  desktopWidthPercent,
  mobileWidth
}) => {
  if (window.matchMedia("(max-width: 600px)").matches)
    // mobile style
    return {
      content: {
        top: "10px",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, 0%)",
        width: `${mobileWidthPercent}%`,
        padding: "20px",
        height: "95%",
        display: "block"
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.5)"
      }
    };
  // desktop style
  return {
    content: {
      top: "10px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      width: `${desktopWidthPercent}%`,
      padding: "50px",
      height: "95%",
      display: "block"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };
};
