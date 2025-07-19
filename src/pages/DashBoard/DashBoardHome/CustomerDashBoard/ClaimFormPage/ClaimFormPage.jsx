import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import { Label, Textarea, FileInput, Button } from "flowbite-react";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";

const ClaimFormPage = () => {
  //   const { id } = useParams(); // applicationId from route
  const { state } = useLocation(); // policyTitle from ClaimRequestPage
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { applicationId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [uploadedDoc, setUploadedDoc] = useState("");

  const {
    isLoading,
    isPending,
    data: application = {},
  } = useQuery({
    queryKey: ["application", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/policy-applications/${applicationId}`
      );
      return res.data;
    },
  });

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(imageUploadURL, formData);
    console.log("Uploaded image url", res.data.data.url);
    setUploadedDoc(res.data.data.url);
  };

  /* const { mutateAsync: submitClaim, isPending } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      console.log("data", data);
      formData.append("image", data.claim_document[0]);

      const uploadRes = await axiosSecure.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_KEY
        }`,
        formData
      );

      const imgData = await uploadRes.json();
      const claim_document = imgData?.data?.url;
      console.log(claim_document);
      console.log("imgData", imgData);
      const docData = uploadRes.data.data.url;
      console.log("docData", docData);

      const res = await axiosSecure.patch(`/claim-request/${applicationId}`, {
        claim_reason: data.claim_reason,
        claim_document,
      });

      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        "Claim Submitted!",
        "Your claim request has been submitted.",
        "success"
      );
      navigate("/dashboard/claim-requests");
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit claim", "error");
    },
  }); */

  const onSubmit = async (data) => {
    console.log(data);

    console.log(data.claim_reason, uploadedDoc);

    /*  const claimRes = await axiosSecure.patch(
      `/claim-request/${applicationId}`,
      {
        claim_reason: data.claim_reason,
        claim_document: uploadedDoc,
      }
    );

    console.log(claimRes.data);

    Swal.fire(
      "Claim Submitted!",
      "Your claim request has been submitted.",
      "success"
    ); */

    // reset();
    navigate("/dashboard/claim-request");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Submit Claim Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Policy Title */}
        <div>
          <label htmlFor="policyTitle" value="Policy Name" />
          <input
            type="text"
            id="policyTitle"
            value={application?.policyTitle || ""}
            readOnly
            className="w-full mt-1 border-gray-300 rounded-md"
          />
        </div>

        {/* Reason for Claim */}
        <div>
          <label htmlFor="claim_reason" value="Reason for Claim" />
          <textarea
            id="claim_reason"
            rows={4}
            placeholder="Write your reason here..."
            {...register("claim_reason", { required: true })}
            className="mt-1"
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
            value="Upload Claim Document (PDF/Image)"
          >
            Upload file
          </label>
          <input
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-1"
            id="file_input"
            accept=".pdf,image/*"
            type="file"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" isProcessing={isPending} disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </div>
  );
};

export default ClaimFormPage;
