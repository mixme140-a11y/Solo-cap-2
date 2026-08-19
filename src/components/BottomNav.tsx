import React from 'react';
import { Home, BookOpen, Users, Church, Star } from 'lucide-react';
import { ActiveTab } from '../types';
import { audioService } from '../services/audioService';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      id: 'inicio',
      label: 'INICIO',
      icon: Home,
    },
    {
      id: 'historia',
      label: 'HISTORIA',
      icon: BookOpen,
    },
    {
      id: 'personajes',
      label: 'PERSONAJES',
      icon: Users,
    },
    {
      id: 'convento',
      label: 'CONVENTO',
      icon: Church,
    },
    {
      id: 'extras',
      label: 'EXTRAS',
      icon: Star,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#08080a]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 shadow-[0_-8px_24px_rgba(0,0,0,0.8)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => {
                audioService.playClick(isActive ? 380 : 440);
                onTabChange(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 sm:px-4 rounded-md transition-all duration-200 cursor-pointer ${
                isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <div className="relative mb-1">
                <IconComponent
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2] text-white' : 'stroke-[1.5]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                )}
              </div>
              <span
                className={`font-gothic text-[8px] sm:text-[9px] tracking-widest uppercase transition-colors ${
                  isActive ? 'font-bold text-white' : 'font-normal text-neutral-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
