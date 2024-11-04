/**
 * Represents a response from the randomuser.me API.
 * This interface defines the structure of the data returned by the API,
 * including an array of user results and information about the request.
 */
interface IUserResponse {
    /**
     * An optional array of User objects returned from the API.
     * This property may be undefined if no results are available.
     */
    results?: IUser[];
  
    /**
     * Contains metadata about the API request and response.
     * @type {Object}
     * @property {string} seed - A unique string used to generate the results,
     *                            which can be useful for pagination and tracking requests.
     * @property {number} results - The total number of results returned.
     * @property {number} page - The current page of results being fetched.
     * @property {string} version - The version of the API being used.
     */
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  }
  
  /**
   * Represents a single user from the randomuser.me API response.
   * This interface provides a structured format for user details.
   */
  export interface IUser {
    /**
     * An optional object containing the user's name components.
     * @type {Object}
     * @property {string} [title] - The title of the user (e.g., Mr, Ms).
     * @property {string} [first] - The first name of the user.
     * @property {string} [last] - The last name of the user.
     */
    name?: {
      title?: string;
      first?: string;
      last?: string;
    };
  
    /**
     * An optional string representing the user's email address.
     */
    email?: string;
  
    /**
     * An optional object containing different sizes of the user's profile picture.
     * @type {Object}
     * @property {string} [large] - The URL for the large version of the user's picture.
     * @property {string} [medium] - The URL for the medium version of the user's picture.
     * @property {string} [thumbnail] - The URL for the thumbnail version of the user's picture.
     */
    picture?: {
      large?: string;
      medium?: string;
      thumbnail?: string;
    };
  
    // Additional properties exist in the User interface but are omitted for brevity.
  }
  
  /**
   * Users class for managing user-related data.
   * This class provides methods for fetching user data from the randomuser.me API
   * and returning it in a structured format suitable for application use.
   */
  export class Users {
    /**
     * The base URL for the randomuser.me API.
     * This URL is used to construct API requests for fetching user data.
     * @private
     * @readonly
     * @type {string}
     */
    private readonly apiUrl: string;
  
    /**
     * Constructs a new Users instance.
     * Initializes the API URL for subsequent fetch requests.
     */
    constructor() {
      this.apiUrl = "https://randomuser.me/api/";
    }
  
    /**
     * Fetches a list of users from the randomuser.me API.
     * This method constructs a request to the API with a specified number of user results.
     * If no number is provided, it defaults to fetching 10 users.
     *
     * @param {number} [results=10] - The number of users to fetch from the API.
     *                                 This parameter is optional and defaults to 10.
     * @returns {Promise<IUser[]>} A Promise that resolves to an array of User objects.
     *                            If the fetch fails, an empty array will be returned.
     * @throws {Error} Throws an error if the fetch request fails or the response is not ok.
     */
    public async getAllUsers(results: number = 10): Promise<IUser[]> {
      try {
        const response = await fetch(`${this.apiUrl}?results=${results}`);
  
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const data: IUserResponse = await response.json();
        return data.results || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    }
  }
  