"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string
  onChange?: (value: string) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value = "", onChange, ...props }, ref) => {
    const formatCurrency = (value: string) => {
      // Remove tudo que não é número
      const numbers = value.replace(/\D/g, "")

      if (!numbers) return ""

      // Converte para centavos
      const cents = Number.parseInt(numbers)

      // Converte para reais
      const reais = cents / 100

      // Formata como moeda brasileira
      return reais.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCurrency(e.target.value)
      onChange?.(formatted)
    }

    return (
      <Input
        ref={ref}
        className={cn(className)}
        value={value}
        onChange={handleChange}
        placeholder="R$ 0,00"
        {...props}
      />
    )
  },
)
CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
