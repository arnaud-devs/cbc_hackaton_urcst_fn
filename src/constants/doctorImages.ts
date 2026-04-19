export const DOCTOR_IMAGES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663229063875/W6xpkbunQSHuQDX5cZwqis/candidate-applications/1772984428574-5imv9obl19f.jpg",
  "https://res.cloudinary.com/dv9cz01fi/image/upload/v1769624178/kmpdu/candidates/KMPDU1030.jpg",
  "https://res.cloudinary.com/dv9cz01fi/image/upload/v1769624187/kmpdu/candidates/KMPDU0209.jpg",
];

export const getDoctorImage = (index: number) =>
  DOCTOR_IMAGES[index % DOCTOR_IMAGES.length];
