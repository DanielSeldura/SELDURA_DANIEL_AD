import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";
import * as admin from "firebase-admin";
//the jwt is named amapiauth
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger("AuthGuard");
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<boolean> {
    const jwt = JSON.parse(JSON.stringify(request.headers));
    console.log(jwt.authportal);
    if (jwt.authportal != null) return await this.verifyToken(jwt.authportal);
    else return false;
  }

  async verifyToken(token: any): Promise<boolean> {
    try {
      const decodedIdToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(token);
      this.logger.debug(`Authenticated request from ${decodedIdToken.email}`);
      return decodedIdToken != null;
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
      return false;
    }
  }

  async decodeToken(token: string): Promise<admin.auth.DecodedIdToken | null> {
    try {
      const decodedIdToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(token);
      return decodedIdToken;
    } catch (e) {
      console.log(e.code);
      console.log(e);
      return null;
    }
  }
}
