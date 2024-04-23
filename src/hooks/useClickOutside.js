import { useEffect } from "react";

// const useClickOutside = (ref, handler, click) => {
//   console.log("ref", ref);
//   useEffect(() => {
//     const listener = (event) => {
//       console.log("event", event);

//       //? Do nothing if ref's element or descendant is click
//       if (
//         !ref?.current &&
//         (!ref?.current.contains(event.target) ||
//           click.current.classList.contains("toggle"))
//       ) {
//         console.log("!ref?.current", ref?.current);
//         console.log(
//           "ref?.current.contains(event.target)",
//           ref?.current.contains(event.target)
//         );
//         console.log(
//           'click.current.classList.contains("toggle")',
//           click.current.classList.contains("toggle")
//         );
//         handler(event);
//       }
//       console.log("descendant was clicked");
//       return;
//     };
//     document.addEventListener("mousedown", listener, false);
//     document.addEventListener("touchstart", listener, false);

//     return () => {
//       document.removeEventListener("mousedown", listener, false);
//       document.removeEventListener("touchstart", listener, false);
//     };
//   }, [ref, handler]);
// };

const useClickOutside = (ref, handler, menuRefs) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if ref's element or its descendants are clicked
      if (
        ref.current &&
        (ref.current.contains(event.target) ||
          menuRefs.some(
            (menuRef) =>
              menuRef &&
              menuRef.current &&
              menuRef.current.contains(event.target)
          ))
      ) {
        return;
      }

      // Run the handler if any menu's toggle button is clicked
      if (
        menuRefs.some(
          (menuRef) =>
            menuRef &&
            menuRef.current &&
            menuRef.current.classList.contains("toggle")
        )
      ) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener, false);
    document.addEventListener("touchstart", listener, false);

    return () => {
      document.removeEventListener("mousedown", listener, false);
      document.removeEventListener("touchstart", listener, false);
    };
  }, [ref, handler, menuRefs]);
};

export default useClickOutside;
