import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../../utils/AxiosInstance";

export const JobsAPI = createApi({
  reducerPath: "JobsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${getToken()}`);

      return headers;
    },
  }),
  tagTypes: ["userProfile", "applicants", "deleteJob", "appliedJobs"],

  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => "/job/get-all-jobs",
    }),
    getAppliedJobs: builder.query<any, void>({
      query: () => "/job/applied-jobs",
      providesTags: ["appliedJobs"],
    }),
    getUserProfile: builder.query<any, void>({
      query: () => "/user/get-profile",
      providesTags: ["userProfile"],
    }),
    updateUserProfile: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["userProfile"],
    }),
    applyForJobs: builder.mutation<any, { jobId: number | string }>({
      query: ({ jobId }) => ({
        url: `/job/apply-job/${jobId}`,
        method: "POST", // Change it to POST if applying for a job requires a request body.
      }),
      invalidatesTags: ["appliedJobs"],
    }),

    getEmployerPostedJobs: builder.query<any, void>({
      query: () => "/job/get-jobs-of-employer",
      providesTags: ["deleteJob"],
    }),
    createJob: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/job/post-job",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["deleteJob"],
    }),
    getAllApplicants: builder.query<any, { id: number }>({
      query: ({ id }) => `/job/view-applicants/${id}`,
      providesTags: ["applicants"],
    }),

    updateApplicationStatus: builder.mutation<
      any,
      { data: string; id: number }
    >({
      query: ({ data, id }) => ({
        url: `/job/update-application-status/${id}`,
        method: "PUT",
        body: { status: data },
      }),
      invalidatesTags: ["applicants", "appliedJobs"],
    }),

    deleteJob: builder.mutation<any, { jobId: string | number }>({
      query: ({ jobId }) => `/job/delete-job/${jobId}`,
      invalidatesTags: ["deleteJob"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetAppliedJobsQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useApplyForJobsMutation,
  useGetEmployerPostedJobsQuery,
  useCreateJobMutation,
  useGetAllApplicantsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteJobMutation,
} = JobsAPI;
