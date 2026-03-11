

import axiosInstance from "./axios";

export const getEnquiries = async ({ page, limit, status, q }) => {
  const res = await axiosInstance.get("/contact-messages", {
    params: {
      page,
      limit,
      status: status === "ALL" ? undefined : status,
      q: q || undefined,
    },
  });

  return res.data.data;
};

export const getEnquiryById = async (id) => {
  const res = await axiosInstance.get(
    `/contact-messages/${id}`
  );

  return res.data.data;
};


export const updateEnquiryStatus = async (id, status) => {
  const res = await axiosInstance.patch(
    `/contact-messages/${id}/status`,
    { status }
  );

  return res.data.data;
};