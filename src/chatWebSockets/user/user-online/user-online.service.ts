import { Injectable } from '@nestjs/common';

import { UserDocument } from '@utils/schemas/web-sockets/user.schema';

import { IModule, Module } from './types';

@Injectable()
export class UserOnlineService {
  public users = {
    [IModule.peerToPeer]: new Map<string, UserDocument>(),
    [IModule.userOnline]: new Map<string, UserDocument>(),
  };

  public getUser({ id, module }: { id: string; module: Module }) {
    return this.users[module].get(id);
  }

  public setUser({
    id,
    user,
    module,
  }: {
    id: string;
    user: UserDocument;
    module: Module;
  }) {
    this.users[module].set(id, user);
  }

  public deleteUser({ id, module }: { id: string; module: Module }) {
    this.users[module].delete(id);
  }
}
