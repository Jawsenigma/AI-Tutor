// types/next-auth.d.ts

import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string; // Add the `id` field to the User type
  }
}
