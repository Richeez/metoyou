// import { useEffect } from "react";

// const useClickOutside = (ref, handler, menuRefs) => {
//   useEffect(() => {
//     const listener = (event) => {
//       console.log("🚀 ~ useClickOutside ~ menuRefs:", menuRefs);
//       console.log("🚀 ~ useClickOutside ~ handler:", handler);
//       console.log("🚀 ~ listener ~ event:", event);
//       console.log("🚀 ~ useClickOutside ~ ref:", ref);
//       // Do nothing if ref's element or its descendants are clicked
//       if (
//         ref.current &&
//         (ref.current.contains(event.target) ||
//           menuRefs.some(
//             (menuRef) =>
//               menuRef &&
//               menuRef.current &&
//               menuRef.current.contains(event.target)
//           ))
//       ) {
//         console.log(" first event");
//         return;
//       }

//       // Run the handler if any menu's toggle button is clicked
//       if (
//         menuRefs.some(
//           (menuRef) =>
//             menuRef &&
//             menuRef.current &&
//             menuRef.current.classList.contains("toggle")
//         )
//       ) {
//         console.log(" second event");
//         handler(event);
//       }
//     };

//     document.addEventListener("mousedown", listener, false);
//     document.addEventListener("touchstart", listener, false);

//     return () => {
//       document.removeEventListener("mousedown", listener, false);
//       document.removeEventListener("touchstart", listener, false);
//     };
//   }, [ref, handler, menuRefs]);
// };

import PropTypes from "prop-types";

import { useRef, useEffect } from "react";

function useOutsideClick(ref, callback, menuRefs) {
  useEffect(() => {
    function handleClickOutside(event) {
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

      if (
        menuRefs.some(
          (menuRef) =>
            menuRef &&
            menuRef.current &&
            menuRef.current.classList.contains("toggle")
        )
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback, menuRefs]);
}

function OutsideClickHandler({ children, onOutsideClick, menuRefs }) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onOutsideClick, menuRefs);

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideClickHandler.propTypes = {
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  menuRefs: PropTypes.array,
};

export default OutsideClickHandler;
