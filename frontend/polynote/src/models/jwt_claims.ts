/** Represent the JWT token claims. Purely for internal UX/UI purposes the token is inside the cookie */

export interface JwtClaims {
  _id: string;
  email: string;
  emailValidated: boolean;
  iat: number;
  exp: number;
}
