export interface ReviewData {
  id: number;
  rate: number;
  text: string;
  id_user: number;
  id_entry: number;
}

export interface ReviewDataOutput {
  created_at: string;
  id: number;
  product: number;
  created_by: {
    id: number;
    username: string;
  };
  rate: number;
  text: string;
}
