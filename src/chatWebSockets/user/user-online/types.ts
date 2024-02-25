export enum IModule {
  userOnline = '/user-online',
  peerToPeer = '/peer-to-peer',
}

export type Module = IModule.peerToPeer | IModule.userOnline;
