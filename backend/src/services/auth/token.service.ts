// services/auth/token.service.ts
export class TokenService {
    generateToken(userId: string) {...}
    verifyToken(token: string) {...}
    refreshToken(oldToken: string) {...}
  }