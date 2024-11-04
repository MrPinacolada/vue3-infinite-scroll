/**
 * Represents a response from the randomuser.me API.
 */
interface UserResponse {
  results?: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

/**
 * Represents a single user from the randomuser.me API response.
 */
export interface User {
  name?: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture?: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  // There's a lot more properties in the User, but we need just this few.
}

/**
 * Users class for managing user-related data.
 * Fetches user data from the randomuser.me API and returns it in a structured format.
 */
export class Users {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = "https://randomuser.me/api/";
  }

  /**
   * Fetches a list of users from the API.
   * @param results - Number of users to fetch.
   * @returns A Promise that resolves to an array of users.
   */
  public async getAllUsers(results: number = 10): Promise<User[]> {
    try {
      const response = await fetch(`${this.apiUrl}?results=${results}`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: UserResponse = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }
}
