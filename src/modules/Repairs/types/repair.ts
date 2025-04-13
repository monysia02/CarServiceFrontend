export type Repair = {
  repairId: string;
  createdAt: string;
  finishedAt: string | null;
  status: string;
  price: number;
  description: string;
};

export type RepairFormFields = {
  repairId?: string;
  carId: string;
  description: string;
  employeeIds: string[];
  status?: string;
};
