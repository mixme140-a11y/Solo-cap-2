import React from 'react';
import { Users, Heart, Shield, Lock, Eye, Volume2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useAdminData } from '../../services/adminStore';
import { audioService } from '../../services/audioService';

interface CharactersViewProps {
  onOpenCharacterDossier: (charId: string) => void;
}

export const CharactersView: React.FC<CharactersViewProps> = ({ onOpenCharacterDossier }) => {
  const { adminData } = useAdminData();
  const characters = adminData.characters || [];

  return (
    <div className="w-full px-4 py-6 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-end justify-between">
        <div>
          <span className="font-gothic text-xs text-red-400 uppercase tracking-widest block flex items-center gap-1.5">
            <span>Dramatis Personae</span>
            <span className="text-red-500">†</span>
          </span>
          <h2 className="font-gothic text-2xl font-bold text-neutral-100">
            Personajes de Santa Vita
          </h2>
        </div>
        <span className="font-mono text-xs text-neutral-400">
          {characters.length} Expedientes
        </span>
      </div>

      {/* Grid of Characters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {characters.map((char) => (
          <div
            key={char.id}
            className="p-4 bg-gradient-to-b from-[#14111a] to-[#0c0910] border border-white/10 hover:border-red-500/40 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-16 h-20 rounded-md bg-black/80 border border-white/15 overflow-hidden flex-shrink-0 relative shadow">
                  {char.image ? (
                    <img
                      src={char.image}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top brightness-90 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-950/40 text-red-400 font-gothic text-xs font-bold">
                      †
                    </div>
                  )}
                  {char.voiceAudioUrl && (
                    <div className="absolute bottom-1 right-1 p-0.5 bg-black/80 rounded text-red-400 border border-red-500/40" title="Audio de voz disponible">
                      <Volume2 className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                <div className="overflow-hidden">
                  <span className="font-gothic text-[9px] text-red-400 uppercase tracking-widest block truncate">
                    {char.role}
                  </span>
                  <h3 className="font-gothic text-base font-bold text-neutral-100 group-hover:text-red-200 transition-colors truncate">
                    {char.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      char.status === 'Bajo Sospecha' 
                        ? 'bg-red-950/80 border-red-500/40 text-red-300'
                        : char.status === 'Desaparecido'
                        ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                        : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                    }`}>
                      {char.status}
                    </span>
                    {char.photoGallery && char.photoGallery.length > 0 && (
                      <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-0.5">
                        <ImageIcon className="w-2.5 h-2.5" />
                        {char.photoGallery.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="font-quote text-xs sm:text-sm text-neutral-300 italic mb-4 line-clamp-2 bg-black/30 p-2.5 rounded border border-white/5">
                “{char.quote}”
              </p>
            </div>

            <button
              onClick={() => {
                audioService.playClick(440);
                onOpenCharacterDossier(char.id);
              }}
              className="w-full py-2 bg-[#17131e] hover:bg-red-950/80 border border-white/10 hover:border-red-500/50 text-neutral-200 hover:text-white font-gothic text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow"
            >
              <Eye className="w-3.5 h-3.5 text-red-400" />
              Examinar Expediente Completo
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
