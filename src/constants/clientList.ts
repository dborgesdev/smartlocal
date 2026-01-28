const LogoPath = '/assets/logo-parceiros/';

export interface Client {
  id: number;
  name: string;
  category: string;
  location: string;
  initials: string;
  logoUrl?: string;
}

export const CLIENTS: Client[] = [
  {
    id: 1,
    name: "Garaperia Dona Onça",
    category: "Loja de Sucos",
    location: "Londrina, PR",
    initials: "GD",
    logoUrl: `${LogoPath}1.png`
  },
  {
    id: 2,
    name: "Profissional Centro Automotivo",
    category: "Oficina Mecânica",
    location: "Londrina, PR",
    initials: "PC",
    logoUrl: `${LogoPath}2.png`
  },
  {
    id: 3,
    name: "Pest Control",
    category: "Dedetizadora",
    location: "Arapongas, PR",
    initials: "PC",
    logoUrl: `${LogoPath}3.png`
  },
  {
    id: 4,
    name: "Barbearia Donleonis",
    category: "Barbearia Premium",
    location: "Londrina, PR",
    initials: "BD",
    logoUrl: `${LogoPath}4.png`
  },
  {
    id: 5,
    name: "Auto Elétrica Acapulco",
    category: "Autoelétrica",
    location: "Londrina, PR",
    initials: "AA",
    logoUrl: `${LogoPath}5.png`
  },
  {
    id: 6,
    name: "Aliança Podologia",
    category: "Podóloga e Manicure",
    location: "Londrina, PR",
    initials: "AP",
    logoUrl: `${LogoPath}6.png`
  },
  {
    id: 7,
    name: "Plantão Desentop",
    category: "Desentupidora",
    location: "Londrina, PR",
    initials: "PD",
    logoUrl: `${LogoPath}7.png`
  },
  {
    id: 8,
    name: "Odontomaq",
    category: "Equipamentos Odontológicos",
    location: "Naviraí, MS",
    initials: "OD",
    logoUrl: `${LogoPath}8.png`
  },
  {
    id: 9,
    name: "GT Refrigeração",
    category: "Conserto de Refrigeradores",
    location: "Londrina, PR",
    initials: "GT",
    logoUrl: `${LogoPath}9.png`
  },
  {
    id: 10,
    name: "Serjão Brasa's",
    category: "Restaurante",
    location: "Londrina, PR",
    initials: "SB",
    logoUrl: `${LogoPath}10.png`
  },
  {
    id: 11,
    name: "Aço Portas Paraná",
    category: "Serralheria",
    location: "Londrina, PR",
    initials: "AP",
    logoUrl: `${LogoPath}11.png`
  },
  {
    id: 12,
    name: "Mercearia Maringá",
    category: "Restaurante",
    location: "Londrina, PR",
    initials: "MM",
    logoUrl: `${LogoPath}12.png`
  },
  {
    id: 13,
    name: "Gaviãozinho Farm",
    category: "Fazenda de Árvores",
    location: "Londrina, PR",
    initials: "GF",
    logoUrl: `${LogoPath}13.png`
  },
];