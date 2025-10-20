// src/components/Modals/EventoReprodutivoModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { EventoReprodutivoTipo } from '@/types';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    animalId: string;
    tipo: EventoReprodutivoTipo;
    data: string;
    notas?: string;
  }) => void;
};

const tipos: EventoReprodutivoTipo[] = [
  'Cio',
  'CoberturaIA',
  'Gestacao',
  'PreParto',
  'Parto',
  'Desmama',
];

export default function EventoReprodutivoModal({ open, onClose, onSubmit }: Props) {
  const [animalId, setAnimalId] = useState('');
  const [tipo, setTipo] = useState<EventoReprodutivoTipo>('Cio');
  const [data, setData] = useState<string>(new Date().toISOString().slice(0, 10));
  const [notas, setNotas] = useState('');

  if (!open) return null;

  const handleSave = () => {
    if (!animalId) return;
    onSubmit({ animalId, tipo, data, notas: notas || undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-lg bg-white rounded-2xl shadow-card p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Registrar evento reprodutivo</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Brinco / ID do animal</label>
            <input
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
              placeholder="Ex.: BR-001"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as EventoReprodutivoTipo)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none bg-white"
              >
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Notas (opcional)</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}