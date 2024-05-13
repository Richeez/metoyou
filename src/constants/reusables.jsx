import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";
import { ImageBox } from "../Components/features";

// export const formatDate = (dateString) => {
//   if (!dateString) return null;

//   let date = dateString instanceof Date ? dateString : new Date(dateString);

//   const optionsTime = {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   };

//   const optionsDate = {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   };

//   const optionsDay = {
//     weekday: "long",
//   };

//   const now = new Date();
//   const timeDifference = now - date;
//   const minutesAgo = Math.floor(timeDifference / (1000 * 60));
//   const hoursAgo = Math.floor(minutesAgo / 60);

//   let time = date.toLocaleString("en-US", optionsTime);
//   let formattedDate = date.toLocaleString("en-US", optionsDate);
//   let day = date.toLocaleString("en-US", optionsDay);
//   let ago = "";

//   if (minutesAgo < 1) {
//     ago = "just now";
//   } else if (minutesAgo < 60) {
//     ago = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
//   } else if (hoursAgo < 24) {
//     ago = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
//   }

//   return {
//     time: time,
//     date: formattedDate,
//     day: day,
//     ago: ago,
//   };
// };

export const formatDate = (dateString) => {
  if (!dateString) return null;

  let date = dateString instanceof Date ? dateString : new Date(dateString);

  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const optionsDate = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const optionsDay = {
    weekday: "long",
  };

  const now = new Date();
  const timeDifference = now - date;
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24); // Calculate days ago

  let time = date.toLocaleString("en-US", optionsTime);
  let formattedDate;
  let day = date.toLocaleString("en-US", optionsDay);
  let ago = "";

  // If it's been less than a minute
  if (minutesAgo < 1) {
    ago = "just now";
  } else if (minutesAgo < 60) {
    // If it's been less than an hour
    ago = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (hoursAgo < 24) {
    // If it's been less than a day
    ago = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo < 7) {
    // If it's been less than a week
    ago = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else {
    // If it's been more than a week, fallback to date and month
    formattedDate = date.toLocaleString("en-US", optionsDate);
    ago = "";
  }

  return {
    time: time,
    date: formattedDate, //? It will be set only if more than a week ago
    day: day,
    ago: ago,
  };
};

export const useDynamicDate = (initialDateString) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    // console.log("useDynamicDate: initialDateString", initialDateString);

    const formatted = formatDate(initialDateString); // Format the initial date string
    // console.log("useDynamicDate: formatted", formatted);

    setFormattedDate(formatted);

    const intervalId = setInterval(() => {
      // console.log("useDynamicDate: setInterval triggered");
      const updatedFormatted = formatDate(initialDateString); // Re-format the date string
      // console.log("useDynamicDate: updatedFormatted", updatedFormatted);
      setFormattedDate(updatedFormatted);
    }, 60000); // Update every minute

    // Clean up the interval on unmount or when the initialDateString changes
    return () => clearInterval(intervalId);
  }, [initialDateString]); // Run effect whenever initialDateString changes

  return formattedDate;
};

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export const isValidEmail = (email) => {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(email);
  const errorMessage = {
    error: true,
    message: "Invalid email address",
  };

  if (!isValid) {
    // Display a toast message when the email is not valid
    toaster(errorMessage.message, true);
  }

  return { isValid };
};

// Display a toast message when the email is not valid using the exported options
export const toaster = (message, error = false) => {
  const toastId = new Date().getTime().toString();
  if (error) {
    return toast.error(message, { ...toastOptions, toastId });
  }
  return toast.success(message, { ...toastOptions, toastId });
};

const getFileType = (fileName) => {
  console.log("🚀 ~ file: reusables.js:45 ~ getFileType ~ fileName:", fileName);
  const extension = fileName.split(".").pop().toLowerCase();

  if (extension === "jpg" || extension === "jpeg" || extension === "png") {
    return "image";
  } else if (extension === "pdf") {
    return "pdf";
  } else {
    return "unknown";
  }
};

export const renderFileType = (attachment, index, setImgIndex) => {
  const onClickHandler = setImgIndex ? () => setImgIndex(index) : null;
  switch (attachment.type) {
    case "image":
      return (
        <ImageBox
          curve
          src={attachment.url}
          others={{ width: "100%", height: "100%", cursor: "pointer" }}
          onclick={onClickHandler}
        />
      );
    case "video":
      return (
        <video style={{ width: "100%", borderRadius: "1rem" }} controls>
          <source src={attachment.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case "file":
      return (
        <a
          href={attachment.payload.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Document
        </a>
      );
    default:
      return null;
  }
};

//? FILE UPLOADER

export const uploadFile = async (editField) => {
  const isProfileArray = Array.isArray(editField.profile);
  const isCoverArray = Array.isArray(editField.cover);
  const isEditArray = Array.isArray(editField);

  // if (isProfileArray || isCoverArray) {
  const uploadPromises = [];

  if (isProfileArray) {
    uploadPromises.push(
      ...editField.profile
        .filter((file) => !file.uploaded)
        .map((file) => uploadSingleFile(file, "profile"))
    );
  }

  if (isCoverArray) {
    uploadPromises.push(
      ...editField.cover
        .filter((file) => !file.uploaded)
        .map((file) => uploadSingleFile(file, "cover"))
    );
  }

  if (isEditArray) {
    uploadPromises.push(
      ...editField
        .filter((file) => !file.uploaded)
        .map(async (file) => {
          return uploadSingleFile(file);
        })
    );
  }

  try {
    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles.flat(); // Flatten the array of arrays
  } catch (error) {
    toaster(error, true);

    console.error("Error uploading files:", error);
    throw error; // Re-throw the error for the caller to handle
  }
  // } else {
  // Handle differently when editField is not an object with profile and cover arrays
  // return uploadSingleFile(editField);
  // }
};

const uploadSingleFile = async (file, target) => {
  const size = file.size;
  const type = getFileType(file.name);

  try {
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    const result = await uploadBytes(imageRef, file);
    console.log("🚀 ~ uploadSingleFile ~ imageRef:", imageRef);
    console.log("🚀 ~ uploadSingleFile ~ result:", result);
    const url = await getDownloadURL(result.ref);

    return {
      url,
      type,
      size,
      target, // Add the target property to the file object
    };
  } catch (error) {
    toaster(error, true);
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error for better error handling
  }
};

// export const uploadFile = async (files) => {
//     const uploadPromises = files
//         .filter((file) => !file.uploaded)
//         .map(async (file) => {
//             const size = file.size;
//             const type = file.type;

//             try {
//                 const imageRef = ref(storage, `images/${file.name + v4()}`);
//                 const result = await uploadBytes(imageRef, file);
//                 const url = await getDownloadURL(result.ref);

//                 return {
//                     url,
//                     type,
//                     size,
//                 };
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//                 throw error; // Re-throw the error for better error handling
//             }
//         });

//     try {
//         const uploadedFiles = await Promise.all(uploadPromises);
//         return uploadedFiles;
//     } catch (error) {
//         console.error('Error uploading files:', error);
//         throw error; // Re-throw the error for the caller to handle
//     }
// };
