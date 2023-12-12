import jwt, { JwtPayload } from "jsonwebtoken";

interface IToken {
  userId: string;
  email: string;
}

export const decryptToken = (token: string): IToken | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded === "string") {
      return null;
    }

    // Type assertion to IToken
    const decodedToken: IToken = decoded as IToken;
    return decodedToken;
  } catch (error) {
    // Handle invalid tokens or token expiration
    return null;
  }
};
