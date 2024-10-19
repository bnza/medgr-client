import type { ApiRole } from "~/utils/consts/auth";

declare global {
  export type SessionData = {
    id: string;
    email: string;
    roles: Array<ApiRole>;
    privileges: Record<number, number>;
  };
}
export {};
