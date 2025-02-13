export const validatePassword = (password: string): boolean => {
  // Minimal 8 karakter
  if (password.length < 8) return false;
  
  // Harus mengandung huruf besar
  if (!/[A-Z]/.test(password)) return false;
  
  // Harus mengandung huruf kecil
  if (!/[a-z]/.test(password)) return false;
  
  // Harus mengandung angka
  if (!/[0-9]/.test(password)) return false;
  
  // Harus mengandung karakter spesial
  if (!/[!@#$%^&*]/.test(password)) return false;
  
  return true;
}; 