export interface Ordinal {
  id: string;
  inscriptionId: string;
  inscriptionName: string;
  floorPrice: number;
  contentUrl: string;
  bisUrl: string;
  renderUrl?: string;
  collection: { name: string };
}

export interface Offer {
  id: string;
  amount: number;
  ltv: number;
  termDays: number;
  interest: number;
  ordinal: Ordinal;
}
