const CONSTANTS = {
  SERVER_PORT: 8080,
  DB_NAME: "LocalEcommerceDev",

  PRODUCTION: "production",
  DEVLOPMENT: "development",

  PAGINATION_LIMIT: 5,

  USER_TEMPORARY_TOKEN_EXPIRY: 20 * 60 * 1000, // 20 minutes
  ROUTES: {
    PREFIX: "/api",
    API_VERSION: "/v1",
    API_CATEGORIES: {
      USER: "/users",
      CATEGORY: "/category",
      BRAND: "/brand",
    },
    USER_ROUTES: {
      REGISTER: "/register",
      LOGIN: "/login",
    },
    CATEGORY_ROUTES: {
      CREATE: "/create",
      GET_ALL_CATEGORIES: "/get-all-categories",
    },
    BRAND_ROUTES: {
      CREATE: "/create",
      GET_ALL_BRANDS: "/get-all-brands",
    },
  },

  AVAILABLE_USER_ROLES: {
    ADMIN: "ADMIN",
    USER: "USER",
  },
  AVAILABLE_LOGIN_TYPE: {
    GOOGLE: "GOOGLE",
    GITHUB: "GITHUB",
    EMAIL_PASSWORD: "EMAIL_PASSWORD",
  },

  FETCH_SUCCESS: "Fetch successfull",
  USER_ALREADY_EXIST:
    "An account with the provided email or username already exists. Please choose a different email or username.",
  USER_CREATION_FAILED:
    "User Registration Error: We encountered an issue while creating your account. Please try again later or contact support for assistance.",
  USER_CREATION_SUCCESS:
    "Registration successful. Please check your email for verification instructions.",
  USER_NOT_FOUND: "User not found. Please check your email or username.",
  INVALID_CREDENTIALS:
    "Invalid username or password. Please double-check your credentials.",
  ACCESS_TOKEN_GENERATION_FAILED:
    "Internal Server Error: Something went wrong while generating the access token.",
  LOGIN_SUCCESS: "Login successful. Welcome back!",
  TOKEN_EXPIRED:
    "Access denied. Your session has expired or your credentials are invalid. Please log in again.",
  CATEGORY_CREATED: "Category created successfully",
  CATEGORY_ALREADY_EXIST:
    "An category with the provided name already exists. Please choose a different name",
  BRAND_ALREADY_EXIST:
    "An brand with the provided name already exists. Please choose a different name",
};

export { CONSTANTS };
