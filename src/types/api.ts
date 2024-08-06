/*

Define types for API responses and requests. This helps ensure that the shape of data you expect from your API is consistent.

Example: types/api.ts

typescript
Copy code
// types/api.ts
export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  isModerator: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

*/

interface Role {
  isAdmin : boolean,
  isModerator : boolean
}

export interface CookieDataInterface {
  username : string,
  firstname : string,
  lastname? : string | undefined | null,
  roles : Role
}

