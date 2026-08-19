import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  AlertCircle, 
  ShieldAlert, 
  FileText, 
  Scroll, 
  Calendar, 
  UserCheck, 
  Search, 
  Flame, 
  EyeOff, 
  Stamp, 
  KeyRound,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { useAdminData } from '../../services/adminStore';
import { audioService } from '../../services/audioService';
import { SecretFile } from '../../types';

interface SecretFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretFilesModal: React.FC<SecretFilesModalProps> = ({ isOpen, onClose }) => {
  const { adminData } = useAdminData();
  const files = adminData.secrets || [];

  const [unlockedSecrets, setUnlockedSecrets] = useState<Record<string, boolean>>({});
  const [selectedFileId, setSelectedFileId] = useState<string>(files[0]?.id || 'file-001');
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedContent, setCopiedContent] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentFile: SecretFile = files.find((f) => f.id === selectedFileId) || files[0] || {
    id: 'sec-none',
    code: 'EXP-000',
    title: 'Sin Documentos',
    clearanceLevel: 'Nivel 1',
    isEncrypted: false,
    decryptKey: '',
    hint: '',
    evidenceType: 'Informe Forense',
    content: 'El archivo está vacío.',
  };

  const isPermanentlyLocked = !!currentFile.isPermanentlyLocked;
  const isEncrypted = currentFile.isEncrypted && !unlockedSecrets[currentFile.id] && !isPermanentlyLocked;
  const isUnlocked = !currentFile.isEncrypted || !!unlockedSecrets[currentFile.id];

  const handleDecrypt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (isPermanentlyLocked) {
      audioService.playClick(200);
      setErrorMessage('ACCESO DENEGADO PERMANENTE: Este expediente no puede ser vulnerado por ninguna clave.');
      return;
    }

    const correctCode = currentFile.decryptKey || 'SEBASTIAN';
    const cleanInput = inputCode.trim().toUpperCase();
    const cleanCorrect = correctCode.toUpperCase();

    if (cleanInput === cleanCorrect) {
      audioService.playUnlock();
      setUnlockedSecrets((prev) => ({ ...prev, [currentFile.id]: true }));
      setInputCode('');
      setErrorMessage('');
    } else {
      audioService.playClick(200);
      setErrorMessage('Clave incorrecta. Lee detenidamente los capítulos y las fechas del convento.');
    }
  };

  const handleInstantUnlock = () => {
    if (isPermanentlyLocked) return;
    const correctCode = currentFile.decryptKey || 'SEBASTIAN';
    setInputCode(correctCode);
    setTimeout(() => {
      audioService.playUnlock();
      setUnlockedSecrets((prev) => ({ ...prev, [currentFile.id]: true }));
      setErrorMessage('');
    }, 100);
  };

  const getClearanceBadge = (level?: string) => {
    switch (level) {
      case 'Bóveda Negra (Inaccesible)':
        return 'bg-red-950/90 text-red-400 border-red-500/70 animate-pulse';
      case 'Ultra Secreto':
        return 'bg-purple-950/90 text-purple-300 border-purple-500/60';
      case 'Clasificado':
        return 'bg-amber-950/90 text-amber-300 border-amber-500/60';
      default:
        return 'bg-neutral-800 text-neutral-300 border-white/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#09070d] border border-red-950/80 rounded-2xl shadow-[0_0_60px_rgba(220,38,38,0.2)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-red-950/80 bg-[#060408]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-500/50 flex items-center justify-center shadow">
              <Lock className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h2 className="font-gothic text-sm sm:text-base font-bold text-red-200 tracking-wider flex items-center gap-2">
                <span>Bóveda de Archivos Secretos & Confidenciales</span>
                <span className="text-[10px] font-mono bg-red-950 px-2 py-0.5 rounded text-red-300 border border-red-500/30">
                  Santa Vita • 1898-1925
                </span>
              </h2>
              <p className="font-sans-ui text-[11px] text-neutral-400">
                {files.length} expedientes eclesiásticos clasificados • Documentos deducibles de la historia
              </p>
            </div>
          </div>

          <button
            id="btn-secrets-close"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Files Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0e0c13] border-b border-white/5 flex gap-2 overflow-x-auto">
          {files.map((f, idx) => {
            const isFPermLocked = !!f.isPermanentlyLocked;
            const isFEncrypted = f.isEncrypted && !unlockedSecrets[f.id] && !isFPermLocked;
            const isSelected = selectedFileId === f.id;

            return (
              <button
                key={f.id || idx}
                onClick={() => {
                  audioService.playClick(440);
                  setSelectedFileId(f.id);
                  setErrorMessage('');
                  setInputCode('');
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-gothic tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? isFPermLocked
                      ? 'bg-red-950 border border-red-500 text-red-200 font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                      : 'bg-red-950/90 border border-red-500/60 text-white font-bold shadow'
                    : 'bg-black/40 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {isFPermLocked ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                ) : isFEncrypted ? (
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{f.code}</span>
              </button>
            );
          })}
        </div>

        {/* Main Document Display */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#0a080e]">
          
          {/* Document Header Box */}
          <div className="bg-[#120f18] border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-400 tracking-wider">
                  CÓDIGO: {currentFile.code}
                </span>
                {currentFile.date && (
                  <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    <Calendar className="w-3 h-3 text-neutral-500" />
                    <span>{currentFile.date}</span>
                  </span>
                )}
                <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                  {currentFile.evidenceType}
                </span>
              </div>

              <h3 className="font-gothic text-base sm:text-xl font-bold text-neutral-100 leading-snug">
                {currentFile.title}
              </h3>

              {currentFile.classificationOfficer && (
                <p className="text-[11px] font-sans-ui text-neutral-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Autoridad / Custodio: <strong className="text-neutral-300">{currentFile.classificationOfficer}</strong></span>
                </p>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold border ${getClearanceBadge(currentFile.clearanceLevel)}`}>
                {currentFile.clearanceLevel}
              </span>
            </div>
          </div>

          {/* SCENARIO 1: PERMANENTLY LOCKED FILE (CANNOT BE DECRYPTED) */}
          {isPermanentlyLocked && (
            <div className="bg-[#150a0f] border-2 border-red-600/70 rounded-xl p-6 sm:p-8 text-center space-y-5 shadow-[0_0_30px_rgba(220,38,38,0.25)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
              
              <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center mx-auto text-red-400 shadow-2xl">
                <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="inline-block px-3 py-0.5 bg-red-950 text-red-300 border border-red-500/50 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest">
                  🔒 ACCESO DENEGADO PERMANENTE
                </span>
                <h4 className="font-gothic text-lg sm:text-xl font-bold text-red-200">
                  Expediente Confiscado & Lacrado por el Santo Oficio
                </h4>
                <p className="font-quote italic text-sm text-neutral-300 leading-relaxed bg-black/50 p-3.5 rounded-lg border border-red-900/40">
                  «{currentFile.permanentLockReason || 'Este documento se encuentra sellado bajo anatema episcopal. Ninguna clave terrenal puede vulnerar su lacre.'}»
                </p>
              </div>

              {/* Redacted simulated preview */}
              <div className="max-w-md mx-auto p-3.5 bg-black/70 rounded-lg border border-white/10 font-mono text-xs text-neutral-500 space-y-1.5 select-none">
                <p>FOJA 01: ████████████████████████████████</p>
                <p>TESTIMONIO: ██████████ CERA NEGRA ████████████</p>
                <p>RESOLUCIÓN: SELLO CONFIDENCIAL ██████████████</p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-red-400/80 bg-red-950/40 px-3 py-1 rounded border border-red-900/30">
                  {currentFile.hint}
                </span>
              </div>
            </div>
          )}

          {/* SCENARIO 2: ENCRYPTED FILE (CAN BE DECRYPTED WITH LORE CLUES) */}
          {isEncrypted && (
            <div className="bg-[#120f18] border border-amber-500/40 rounded-xl p-6 sm:p-8 text-center space-y-5 shadow-inner">
              <div className="w-14 h-14 rounded-full bg-amber-950/60 border border-amber-500/50 flex items-center justify-center mx-auto text-amber-400">
                <Lock className="w-7 h-7 animate-pulse" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="font-gothic text-base sm:text-lg font-bold text-neutral-100 uppercase tracking-wider">
                  Cifrado Eclesiástico de Seguridad
                </h4>
                <p className="font-sans-ui text-xs text-neutral-400">
                  Este expediente requiere la clave canónica de desencriptación. Deduce la respuesta a partir de la historia.
                </p>
              </div>

              {/* Canonical Lore Hint */}
              {currentFile.hint && (
                <div className="max-w-lg mx-auto p-3.5 bg-black/60 border border-amber-500/30 rounded-xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    🔍 Pista de la Historia:
                  </span>
                  <p className="font-quote text-xs sm:text-sm text-amber-100/90 italic">
                    «{currentFile.hint}»
                  </p>
                </div>
              )}

              {/* Decrypt Form */}
              <form onSubmit={handleDecrypt} className="max-w-sm mx-auto space-y-3 pt-2">
                <div>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="INGRESAR CLAVE CANÓNICA..."
                    className="w-full bg-[#181522] border border-amber-500/40 rounded-lg px-4 py-2.5 text-center font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 font-sans-ui bg-red-950/40 p-2 rounded border border-red-500/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-red-950 to-amber-950 hover:from-red-900 hover:to-amber-900 border border-amber-500/50 text-white font-gothic text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer font-bold shadow"
                  >
                    Desencriptar Archivo
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantUnlock}
                    className="px-3 py-2.5 bg-black/60 hover:bg-black/90 border border-white/10 text-neutral-400 hover:text-amber-300 rounded-lg text-xs font-mono cursor-pointer transition-colors flex items-center gap-1"
                    title="Revelar con la clave canónica"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Revelar</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SCENARIO 3: UNLOCKED DOCUMENT VIEW */}
          {isUnlocked && !isPermanentlyLocked && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Aged Document Body */}
              <div className="relative p-6 sm:p-8 bg-[#110e17] border border-amber-500/30 rounded-xl shadow-2xl space-y-4">
                
                {/* Official Diocesan Header Stamp */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Stamp className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold uppercase tracking-wider">
                      ESTADO: DESCLASIFICADO • ARCHIVO HISTÓRICO
                    </span>
                  </div>

                  <span className="text-neutral-500">
                    REGISTRO: {currentFile.code}
                  </span>
                </div>

                {/* Content */}
                <div className="font-mono text-xs sm:text-sm text-neutral-200 whitespace-pre-line leading-relaxed selection:bg-red-950 selection:text-white pt-2">
                  {currentFile.content}
                </div>

                {/* Footer Stamp and Signature */}
                <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono">
                  <div className="text-neutral-400">
                    <span>Clave utilizada: </span>
                    <strong className="text-amber-300 font-mono">{currentFile.decryptKey}</strong>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${currentFile.title}\n${currentFile.content}`);
                      setCopiedContent(true);
                      setTimeout(() => setCopiedContent(false), 2500);
                    }}
                    className="px-3 py-1 bg-black/60 hover:bg-black/90 border border-white/10 text-neutral-300 hover:text-white rounded flex items-center gap-1.5 cursor-pointer w-fit"
                  >
                    {copiedContent ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedContent ? 'Texto Copiado' : 'Copiar Contenido'}</span>
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
