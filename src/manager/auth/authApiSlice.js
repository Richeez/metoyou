import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials }
            })
        }),
        post: builder.mutation({
            query: credentials => {

                const formDataToSend = new FormData();
                formDataToSend.append("description", credentials.description);
                formDataToSend.append("userId", credentials.userId);
                formDataToSend.append("file", credentials.file);


                return {
                    url: "/post",
                    method: "POST",
                    body: formDataToSend,
                };
            }
        }),
        updateProfile: builder.mutation({
            query: credentials => {

                const formDataToSend = new FormData();
                formDataToSend.append("userId", credentials.userId);
                formDataToSend.append("nickname", credentials.nickname);
                formDataToSend.append("occupation", credentials.occupation);
                formDataToSend.append("email", credentials.email);
                formDataToSend.append("location", credentials.location);
                formDataToSend.append("profilePicture", credentials.profilePicture);
                formDataToSend.append("coverImage", credentials.coverImage);

                return {
                    url: "/profile",
                    method: "PATCH",
                    body: formDataToSend,
                };
            }
        }),
        upload: builder.mutation({
            query: credentials => ({
                url: "/upload",
                method: "POST",
                body: { ...credentials }
            })
        }),
    })
})

export const { useLoginMutation, usePostMutation, useUpdateProfileMutation, useUploadMutation } = authApiSlice