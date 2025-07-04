export interface ListItem {
  id: string;
  name: string;
  link: string;
  price: string;
  image?: string;
  purchased: boolean;
  reservedBy?: string;
  reservedAt?: string;
}

export interface GiftList {
  id: string;
  name: string;
  occasion: "CASAMENTO" | "ANIVERSARIO" | "CHA_DE_CASA_NOVA" | "CHA_DE_BEBE" | "FORMATURA" | "OUTROS";
  description: string;
  items: ListItem[];
  userId: string;
  createdAt: string;
  slug: string;
}
