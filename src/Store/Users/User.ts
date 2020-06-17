import { Endereco } from "./Address";

export interface Usuario {
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    endereco: Endereco;
}