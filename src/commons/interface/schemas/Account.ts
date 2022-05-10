export enum AccountStatus {
  DISABLED = 'DISABLED',
  ACTIVATED = 'ACTIVATED',
}

export enum AccountGender {
  OTHER,
  MALE,
  FEMALE,
}

export interface SourceCurrency {
  _id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  histories: {
    time: string;
    initialAmount: number;
    currentAmount: number;
  }[];
}

export interface Account {
  googleId: string | null;
  facebookId: string | null;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
  birthday: string | null;
  gender: AccountGender | null;
  status: AccountStatus;
  isVerified: boolean | false;
  createdAt: number;
  updatedAt: number | null;
}
