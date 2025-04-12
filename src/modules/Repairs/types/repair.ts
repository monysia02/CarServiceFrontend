export type RepairFormFields = {
  id?: string;
  createdAt: Date;
  finishedAt: Date;
  status: string; //??
  price: number;
  description: string;
};

export type Repair = {
  repairId: string;
  createdAt: Date;
  finishedAt: Date;
  status: string; //??
  price: number;
  description: string;
};
