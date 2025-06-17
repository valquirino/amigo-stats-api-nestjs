import { Request } from 'express';
import { ITokenPayload } from './token-payload.interface';

export interface RequestWithUser extends Request {
  user: ITokenPayload;
}
