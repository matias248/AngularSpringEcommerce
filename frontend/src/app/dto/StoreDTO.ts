import { GeoPoint } from "./GeoPoint";
import { Address } from "./Address";


export interface StoreDTO {
    id: number;
    name: string;
    address: Address;
    location: GeoPoint;
    contactPhone: string;
    imageUrl?: string;
}

export const storesKeysToNotDisplayInDetails = ["id", "contactPhone"]
