export interface IRentalItem {
  gearItemId: string;
  quantity: number;
}

export interface ICreateRental {
  items: IRentalItem[];
  startDate: Date;
  endDate: Date;
}

export interface IUpdateRentalStatus {
  status: "PLACED" | "CONFIRMED" | "PICKED_UP" | "RETURNED" | "CANCELLED";
}