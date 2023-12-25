export const APP_URL =
  process.env.NODE_ENV === "development"
    ? `http://app.localhost:3000`
    : `https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
