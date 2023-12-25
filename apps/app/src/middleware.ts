import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login",
  },
});
