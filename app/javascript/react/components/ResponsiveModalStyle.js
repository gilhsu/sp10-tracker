export const ResponsiveModalStyle = ({
  mobileWidthPercent,
  desktopWidthPercent
}) => {
  if (window.matchMedia("(max-width: 600px)").matches)
    // mobile style
    return {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: `${mobileWidthPercent}%`,
        padding: "20px"
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.5)"
      }
    };
  // desktop style
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: `${desktopWidthPercent}%`,
      padding: "50px"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };
};
