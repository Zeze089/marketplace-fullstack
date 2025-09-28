// frontend/src/utils/masks.ts

// Máscara para CPF: 000.000.000-00
export const cpfMask = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');
  
  // Aplica a máscara
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

// Máscara para telefone: (00) 00000-0000
export const phoneMask = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');
  
  // Aplica a máscara
  return cleanValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

// Remove máscara de CPF
export const removeCpfMask = (value: string): string => {
  return value.replace(/[.\-]/g, '');
};

// Remove máscara de telefone
export const removePhoneMask = (value: string): string => {
  return value.replace(/[() \-]/g, '');
};

// Validação de CPF
export const validateCpf = (cpf: string): boolean => {
  const cleanCpf = removeCpfMask(cpf);
  
  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  
  // Validação do algoritmo de CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  
  let checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  if (checkDigit !== parseInt(cleanCpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  
  checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  if (checkDigit !== parseInt(cleanCpf.charAt(10))) return false;
  
  return true;
};

// Validação de telefone (formato brasileiro)
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = removePhoneMask(phone);
  
  // Verifica se tem 10 ou 11 dígitos (com ou sem 9 no celular)
  return /^[1-9]{2}9?[0-9]{8}$/.test(cleanPhone);
};

// Formatação de preço
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Formatação de data
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
};