import React from 'react';
import { X } from 'lucide-react';
import { GothicRadioPlayer } from '../GothicRadioPlayer';

interface RadioModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRadioPlaying?: boolean;
  onTogglePlay?: () => void;
}

export const RadioModal: React.FC<RadioModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#09080c] border border-[#524330] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Modal Close Button */}
        <button
          id="btn-radio-close"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 border border-[#5c4a30] text-[#baa98e] hover:text-white hover:border-[#a89060] transition-colors cursor-pointer"
          title="Cerrar Radio"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gothic Radio Player Engine */}
        <div className="p-2 sm:p-3">
          <GothicRadioPlayer standalone={true} />
        </div>

      </div>
    </div>
  );
};
