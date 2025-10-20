// src/components/Modals/VacinaModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    animalId?: string;
    loteId?: string;
    vacina: string;
    dose: string;
    data: string;
    loteProduto?: string;
    responsavel?: string;
  }) => void;
};

export default function VacinaModal({ open, onClose, onSubmit }: Props) {
  const [animalId, setAnimalId] = useState('');
  const [loteId, setLoteId] = useState('');
  const [vacina, setVacina] = useState('Aftosa');
  const [dose, setDose] = useState('2ml');
  const [data, setData] = useState<string>(new Date().toISOString().slice(0, 10));
  const [loteProduto, setLoteProduto] = useState('');
  const [responsavel, setResponsavel] = useState('');

  if (!open) return null;

  const handleSave = () => {
    onSubmit({
      animalId: animalId || undefined,
      loteId: loteId || undefined,
      vacina,
      dose,
      data,
      loteProduto: loteProduto || undefined,
      responsavel: responsavel || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-lg bg-white rounded-2xl shadow-card p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Registrar vacinação</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Brinco / ID do animal (opcional)</label>
              <input
                value={animalId}
                onChange={(e) => setAnimalId(e.target.value)}
                placeholder="BR-001"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Lote (opcional)</label>
              <input
                value={loteId}
                onChange={(e) => setLoteId(e.target.value)}
                placeholder="Lote A"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Vacina</label>
              <input
                value={vacina}
                onChange={(e) => setVacina(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Dose</label>
              <input
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Lote do produto (opcional)</label>
              <input
                value={loteProduto}
                onChange={(e) => setLoteProduto(e.target.value)}
                placeholder="L2024-045"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Responsável (opcional)</label>
            <input
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Dr(a). Nome"
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