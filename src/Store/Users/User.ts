import { Endereco } from "./Address";

export interface Usuario {
    nome: string;
    cpf: string;
    email: string;
    endereco: Endereco;
}