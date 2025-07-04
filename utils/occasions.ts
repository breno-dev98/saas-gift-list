export const occasionLabels = {
  CASAMENTO: "Casamento",
  ANIVERSARIO: "Aniversário",
  CHA_DE_CASA_NOVA: "Chá de Casa Nova",
  CHA_DE_BEBE: "Chá de Bebê",
  FORMATURA: "Formatura",
  OUTROS: "Outros",
} as const;

export type OccasionValue = keyof typeof occasionLabels;

export const occasionOptions = Object.entries(occasionLabels).map(([value, label]) => ({
  value,
  label,
}));
