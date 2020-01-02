export const ResponsiveModalStyle = () => {
  if (window.matchMedia("(max-width: 600px)").matches)
    return {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        padding: "20px"
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.5)"
      }
    };
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      padding: "50px"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };
};
