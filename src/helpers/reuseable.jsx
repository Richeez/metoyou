import { toast } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";

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
export const toaster = (message, isError = false) => {
  const toastId = new Date().getTime().toString();
  if (isError) {
    return toast.error(message, { ...toastOptions, toastId });
  }
  return toast.success(message, { ...toastOptions, toastId });
};

const getFileType = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();

  if (extension === "jpg" || extension === "jpeg" || extension === "png") {
    return "image";
  } else if (extension === "pdf") {
    return "pdf";
  } else if (
    extension === "mp4" ||
    extension === "avi" ||
    extension === "mov" ||
    extension === "wmv" ||
    extension === "flv" ||
    extension === "mkv"
  ) {
    return "video";
  } else {
    return "unknown";
  }
};

export function capitalizeFirstLetter(string) {
  if (string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return string;
  }
}

//? FILE UPLOADER

export const uploadFile = async (editField) => {
  try {
    const isProfileArray = Array.isArray(editField.profile);
    const isCoverArray = Array.isArray(editField.cover);
    const isEditArray = Array.isArray(editField);

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

    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles.flat(); // Flatten the array of arrays
  } catch (error) {
    toaster(error, true);
  }
};

const uploadSingleFile = async (file, target) => {
  const size = file.size;
  const type = getFileType(file.name);

  try {
    const fileRef = ref(storage, `assets/${file.name + v4()}`);
    const result = await uploadBytes(fileRef, file);
    console.log("🚀 ~ uploadSingleFile ~ fileRef:", fileRef);
    console.log("🚀 ~ uploadSingleFile ~ result:", result);
    const url = await getDownloadURL(result.ref);

    return {
      url,
      type,
      size,
      target, //? Add the target property to the file object
    };
  } catch (error) {
    toaster(error?.message, true);
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
//                 const fileRef = ref(storage, `images/${file.name + v4()}`);
//                 const result = await uploadBytes(fileRef, file);
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
