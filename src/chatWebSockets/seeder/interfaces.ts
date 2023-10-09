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
}

interface InterlocutorInterface {
  interlocutor: string;
  messageId: string;
  lastUpdatedAt: string;
}

export interface InterlocutorsInterface {
  userId: string;
  interlocutors: InterlocutorInterface[];
}
