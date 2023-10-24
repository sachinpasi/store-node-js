interface IConstantValues {
  [key: string]: any;
}

interface IUser extends Document {
  avatar?: {
    url: string;
    localPath: string;
  };
  username: string;
  email: string;
  role?: string;
  password: string;
  loginType?: string;
  isEmailVerified?: boolean;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  generateTemporaryToken(): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: Date;
  };
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export { IConstantValues, IUser };
