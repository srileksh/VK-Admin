export const uploadToVimeo = async (uploadUrl, file) => {
  await fetch(uploadUrl, {
    method: "PATCH",
    headers: {
      "Tus-Resumable": "1.0.0",
      "Upload-Offset": "0",
      "Content-Type": "application/offset+octet-stream",
    },
    body: file,
  });
};
