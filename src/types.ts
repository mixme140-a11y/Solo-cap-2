export interface Chapter {
  id: string;
  number: number;
  part: number;
  title: string;
  subtitle: string;
  estimatedReadTime: string;
  synopsis: string;
  content: string[];
  date: string;
  isUnlocked: boolean;
  coverImage?: string;
  audioUrl?: string;
  audioTitle?: string;
  audioAuthor?: string;
  audioDuration?: string;
  broadcastNote?: string;
  nextProgram?: string;
  nextHost?: string;
  audioTheme?: 'organ' | 'chant' | 'bell' | 'static';
}

export interface CharacterPhoto {
  id: string;
  url: string;
  caption?: string;
  date?: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  alias: string;
  quote: string;
  description: string;
  background?: string;
  secrets: string[];
  confessions: string[];
  affinity: number; // 0 to 100
  trustQuote?: string;
  image: string;
  voiceAudioUrl?: string;
  photoGallery?: CharacterPhoto[];
  status: 'Activo' | 'Desaparecido' | 'Fallecido' | 'Bajo Sospecha';
}

export interface MapLocation {
  id: string;
  name: string;
  subtitle: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  dangerLevel: 'Bajo' | 'Moderado' | 'Peligro Crítico';
  unlockedClue: string;
  secretFound: boolean;
}

export interface RadioBroadcast {
  id: string;
  stationName: string;
  frequency: string;
  programTitle: string;
  host: string;
  isLive: boolean;
  listenersCount: number;
  sermonText: string[];
  audioTheme: 'organ' | 'chant' | 'bell' | 'static';
}

export interface NewspaperArticle {
  id: string;
  edition: string;
  headline: string;
  subheadline: string;
  date: string;
  author: string;
  paragraphs: string[];
  classifiedNote: string;
  image?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'Reliquia' | 'Lectura' | 'Coleccionable' | 'Pase' | 'Merch' | string;
  price: number; // In USD / Currency
  description: string;
  rarity: 'Común' | 'Raro' | 'Místico' | 'Prohibido' | string;
  inStock: boolean;
  imageIcon?: string;
  image?: string;
  details?: string;
}

export interface SecretFile {
  id: string;
  code: string;
  title: string;
  date?: string;
  classificationOfficer?: string;
  clearanceLevel: 'Nivel 1' | 'Nivel 2' | 'Clasificado' | 'Ultra Secreto' | 'Bóveda Negra (Inaccesible)' | string;
  isEncrypted: boolean;
  isPermanentlyLocked?: boolean;
  permanentLockReason?: string;
  decryptKey: string;
  hint: string;
  content: string;
  evidenceType: 'Informe Forense' | 'Manuscrito Antiguo' | 'Transcripción Oculta' | 'Fotografía Confiscada' | 'Acta Parroquial Censurada' | 'Carta Interceptada' | 'Registro Parroquial' | string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'character' | 'system';
  characterId?: string;
  senderName: string;
  text: string;
  timestamp: string;
  isEncrypted?: boolean;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  impactLevel: 'Clave' | 'Misterio' | 'Tragedia';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'chapter' | 'radio' | 'secret' | 'system';
}

export interface SecurityCamera {
  id: string;
  code: string;
  name: string;
  location: string;
  status: 'ONLINE' | 'STANDBY' | 'DISTORTION';
  image?: string;
  description: string;
}

export type ActiveTab = 'inicio' | 'historia' | 'personajes' | 'convento' | 'extras';
