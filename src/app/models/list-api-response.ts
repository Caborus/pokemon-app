import { Pokemon } from "./pokemon";

export interface listApiRes{
    count: number;
    next: string;
    previous? : string;
    results : Pokemon[];
}