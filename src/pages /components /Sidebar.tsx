import React from 'react';
import { Home, Beef, Heart, Sparkles, Activity, PlusSquare, DollarSign, BarChart3, FileText, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentRoute, setCurrentRoute }) => {
  const menuItems = [
    { route: 'dashboard', label: 'Dashboard', icon: Home },
    { route: 'rebanho', label: 'Gestão de Bovinos', icon: Beef },
    { route: 'reproducao', label: 'Reprodução', icon: Heart },
    { route: 'recomendacoes', label: 'Recomendações IA', icon: Sparkles },
    { route: 'genetica', label: 'Análises Genéticas', icon: Activity },
    { route: 'saude', label: 'Saúde Animal', icon: PlusSquare },
    { route: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { route: 'credito', label: 'Crédito Rural', icon: BarChart3 },
    { route: 'relatorios', label: 'Relatórios', icon: FileText },
    { route: 'config', label: 'Configurações', icon: Settings }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">AgroBrasil Tech</h2>
                  <p className="text-xs text-gray-500">Genética Bovina</p>
                </div>
              </div>
              <button onClick={onClose} className="lg:hidden">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map(({ route, label, icon: Icon }) => (
              <button
                key={route}
                onClick={() => {
                  setCurrentRoute(route);
                  onClose();
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${currentRoute === route 
                    ? 'bg-green-50 text-green-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                JS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">João Silva</p>
                <p className="text-xs text-gray-500 truncate">Fazenda São Francisco</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};