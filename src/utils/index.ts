export const formatPhoneWithExt = (phone: string) => {
  const normalizedPhone = phone.replace(/\s+/g, " ").trim();
  const [baseNumber, extension] = normalizedPhone.split(/\s*(?:x|ext\.?)\s*/i);

  const cleaned = baseNumber.replace(/\D/g, "");
  const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

  return extension ? `${formatted} ext. ${extension}` : formatted;
};
