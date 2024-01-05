import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";


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
        message: 'Invalid email address'
    };

    if (!isValid) {
        // Display a toast message when the email is not valid
        toaster(errorMessage.message, toast.error);
    }

    return { isValid };
};



// Display a toast message when the email is not valid using the exported options
export const toaster = (message, show) => {
    const toastId = new Date().getTime().toString();
    show(message, { ...toastOptions, toastId });

}

const getFileType = (fileName) => {
    console.log("🚀 ~ file: reusables.js:45 ~ getFileType ~ fileName:", fileName)
    const extension = fileName.split('.').pop().toLowerCase();

    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
        return 'image';
    } else if (extension === 'pdf') {
        return 'pdf';
    } else {
        return 'unknown';
    }
};


//? FILE UPLOADER

export const uploadFile = async (editField) => {
    const isProfileArray = Array.isArray(editField.profile);
    const isCoverArray = Array.isArray(editField.cover);
    const isEditArray = Array.isArray(editField);

    if (isProfileArray || isCoverArray) {
        const uploadPromises = [];

        if (isProfileArray) {
            uploadPromises.push(
                ...editField.profile
                    .filter((file) => !file.uploaded)
                    .map((file) => uploadSingleFile(file, 'profile'))
            );
        }

        if (isCoverArray) {
            uploadPromises.push(
                ...editField.cover
                    .filter((file) => !file.uploaded)
                    .map((file) => uploadSingleFile(file, 'cover'))
            );
        }

        if (isEditArray) {
            uploadPromises.push(
                ...editField.filter((file) => !file.uploaded)
                    .map(async (file) => {
                        return uploadSingleFile(file);
                    }));

        }

        try {
            const uploadedFiles = await Promise.all(uploadPromises);
            return uploadedFiles.flat(); // Flatten the array of arrays
        } catch (error) {
            console.error('Error uploading files:', error);
            throw error; // Re-throw the error for the caller to handle
        }
    } else {
        // Handle differently when editField is not an object with profile and cover arrays
        return uploadSingleFile(editField);
    }
};

const uploadSingleFile = async (file, target) => {
    const size = file.size;
    const type = getFileType(file.name);

    try {
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const result = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(result.ref);

        return {
            url,
            type,
            size,
            target, // Add the target property to the file object
        };
    } catch (error) {
        console.error('Error uploading file:', error);
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

