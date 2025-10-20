// src/components/Modals/CreditoModal.tsx
import React, { useMemo, useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    valor: number;
    prazoMeses: number;
    taxaAno: number;
    finalidade: string;
  }) => void;
};

export default function CreditoModal({ open, onClose, onSubmit }: Props) {
  const [valor, setValor] = useState<number>(200_000);
  const [prazoMeses, setPrazoMeses] = useState<number>(36);
  const [taxaAno, setTaxaAno] = useState<number>(6.5);
  const [finalidade, setFinalidade] = useState<string>('Aquisição de matrizes');

  const taxaMes = useMemo(() => (Math.pow(1 + taxaAno / 100, 1 / 12) - 1), [taxaAno]);

  const parcela = useMemo(() => {
    const i = taxaMes;
    const n = prazoMeses;
    if (i <= 0 || n <= 0) return 0;
    return valor * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  }, [valor, prazoMeses, taxaMes]);

  if (!open) return null;

  const handleSimular = () => {
    // Apenas recalcula — a UI já mostra o valor de parcela
  };

  const handleEnviar = () => {
    onSubmit({ valor, prazoMeses, taxaAno, finalidade });
    onClose();
  };

  const formatBRL = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-lg bg-white rounded-2xl shadow-card p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Simular crédito rural</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Finalidade</label>
            <input
              value={finalidade}
              onChange={(e) => setFinalidade(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Valor (R$)</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Prazo (meses)</label>
              <input
                type="number"
                value={prazoMeses}
                onChange={(e) => setPrazoMeses(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Taxa a.a. (%)</label>
              <input
                type="number"
                step="0.01"
                value={taxaAno}
                onChange={(e) => setTaxaAno(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div className="flex items-end">
              <div className="w-full bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">Parcela estimada</p>
                <p className="text-lg font-semibold text-green-700">{formatBRL(parcela || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-2">
          <button onClick={handleSimular} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            Simular
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              Cancelar
            </button>
            <button onClick={handleEnviar} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
              Enviar proposta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}