import React, { useState } from 'react';
import { X, Bell, CheckCheck, Radio, BookOpen, Lock, Info } from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../../data/loreData';
import { AppNotification } from '../../types';
import { audioService } from '../../services/audioService';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRadio: () => void;
  onOpenChapter: () => void;
  onOpenSecrets: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onOpenRadio,
  onOpenChapter,
  onOpenSecrets,
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS_DATA);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    audioService.playClick(440);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClickNotification = (n: AppNotification) => {
    audioService.playClick(480);
    setNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );
    onClose();
    if (n.type === 'radio') onOpenRadio();
    else if (n.type === 'chapter') onOpenChapter();
    else if (n.type === 'secret') onOpenSecrets();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#0e0e12] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] mt-12 sm:mt-14">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#08080a]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-red-500" />
            <span className="font-gothic text-xs font-bold text-neutral-200 tracking-wider">
              Notificaciones del Convento
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleMarkAllRead}
              title="Marcar todas como leídas"
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((n) => {
            return (
              <button
                key={n.id}
                onClick={() => handleClickNotification(n)}
                className={`w-full p-3 rounded-md border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  n.read
                    ? 'bg-[#121217] border-white/5 opacity-75'
                    : 'bg-red-950/20 border-red-500/30'
                }`}
              >
                <div className="p-2 rounded bg-black/60 border border-white/10 flex-shrink-0 mt-0.5">
                  {n.type === 'radio' && <Radio className="w-4 h-4 text-red-400" />}
                  {n.type === 'chapter' && <BookOpen className="w-4 h-4 text-amber-400" />}
                  {n.type === 'secret' && <Lock className="w-4 h-4 text-emerald-400" />}
                  {n.type === 'system' && <Info className="w-4 h-4 text-neutral-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-gothic text-xs font-bold text-neutral-200">
                      {n.title}
                    </span>
                    <span className="font-sans-ui text-[9px] text-neutral-500">
                      {n.time}
                    </span>
                  </div>
                  <p className="font-quote italic text-xs text-neutral-300 line-clamp-2">
                    {n.message}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
