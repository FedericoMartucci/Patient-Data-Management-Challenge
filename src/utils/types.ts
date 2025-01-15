export type PatientDTO = {
  id: number;
  name: string;
  avatar: string;
  description: string;
  website: string;
  createdAt: Date;
};

export type Icon = {
  width?: string;
  height?: string;
  fillColor?: string;
};

export type Screen = {
  width: number;
  height: number;
};
