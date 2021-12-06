import {LinkedInfoElement} from './linked-info-element.interface';

export interface Message {
  id?: number;
  name: string;
  alias?: string;
  krs: string;
  nip: string;
  regon: string;
  court: string;
  place: string;
  capital: string;
  description: string;
  linkedInfo: LinkedInfoElement[];
  createdAt: Date | string;
}
