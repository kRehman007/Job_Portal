export const openResume = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const getResumeDownloadUrl = (url: string) =>
  url.replace("/uploads/", "/uploads-download/");