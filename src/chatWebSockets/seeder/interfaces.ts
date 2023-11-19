export interface UserInterface {
  lastname: string;
  firstname: string;
  password: string;
  username: string;
  email: string;
  patronymic: string;
  avatar: string;
  listOfBlockedInterlocutors: string[];
  listIOfDeletedDialogs: string[];
}

export interface MessageInterface {
  from: string;
  to: string;
  typeMessage: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  isArchive: boolean;
  linkToImage: string;
  linkToAudio: string;
  roomId?: string;
}
