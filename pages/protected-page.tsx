// pages/protected-page.tsx

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
};

export default ProtectedPage;
