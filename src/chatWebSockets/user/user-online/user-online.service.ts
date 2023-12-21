import { Injectable } from '@nestjs/common';

import { UserDocument } from 'utils/schemas/web-sockets/user.schema';

@Injectable()
export class UserOnlineService {
  public users = new Map<string, UserDocument>();

  public getUser(id: string) {
    return this.users.get(id);
  }

  public setUser({ id, user }: { id: string; user: UserDocument }) {
    this.users.set(id, user);
  }

  public deleteUser(id: string) {
    this.users.delete(id);
  }
}
