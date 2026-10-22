export const genericMessage =
  "Olá! Conheci a Smart Local e gostaria de conversar sobre a criação de um site para minha empresa.";
export const projectMessage = (name: string) =>
  `Olá! Vi o projeto ${name} no portfólio da Smart Local e gostaria de conversar sobre um site semelhante.`;
export const formMessage = (name: string, description: string) =>
  `Olá! Gostaria de solicitar um projeto com a Smart Local. Meu nome é ${name.trim()}. Sobre o projeto: ${description.trim()}.`;
export const whatsappUrl = (message = genericMessage) =>
  `https://wa.me/5543991364545?text=${encodeURIComponent(message)}`;
