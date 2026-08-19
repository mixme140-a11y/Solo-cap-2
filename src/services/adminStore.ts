import { useState, useEffect } from 'react';
import { 
  HERO_ASSETS, 
  CHAPTERS_DATA, 
  SECRET_FILES_DATA, 
  STORE_ITEMS, 
  RADIO_BROADCAST,
  CONVENT_CAMERAS,
  CHARACTERS_DATA
} from '../data/loreData';
import { Chapter, SecretFile, StoreItem, SecurityCamera, Character } from '../types';

export interface CarouselSlideData {
  id: string;
  image: string;
  caption: string;
  quote?: string;
}

export interface BookSynopsisData {
  title: string;
  subtitle: string;
  author: string;
  releaseDate: string;
  pageCount: string;
  synopsis: string;
  mainQuote: string;
  genre: string;
  triggerWarnings: string[];
}

export interface AudioFrequencyData {
  id: string;
  name: string;
  frequency: string;
  type: 'organ' | 'chant' | 'bell' | 'static';
  description: string;
  audioUrl?: string;
}

export interface AppAdminState {
  carouselSlides: CarouselSlideData[];
  synopsis: BookSynopsisData;
  secrets: SecretFile[];
  radioTracks: AudioFrequencyData[];
  shopItems: StoreItem[];
  chapters: Chapter[];
  mapImage?: string;
  securityCameras: SecurityCamera[];
  characters: Character[];
  trailerVideoUrl?: string;
  trailerTitle?: string;
  trailerDescription?: string;
}

const STORAGE_KEY = 'santa_vita_admin_data_v16';
const IDB_DB_NAME = 'santa_vita_persistent_db';
const IDB_STORE_NAME = 'admin_store';
const IDB_DATA_KEY = 'admin_state';

// Simple native IndexedDB Promise helpers to avoid quota limits on large audio/image files
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(IDB_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getFromIDB = async <T>(key: string): Promise<T | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readonly');
      const store = tx.objectStore(IDB_STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.warn('IDB read error:', e);
    return null;
  }
};

const saveToIDB = async (key: string, value: any): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(IDB_STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IDB write error:', e);
  }
};

const getDefaultState = (): AppAdminState => ({
  carouselSlides: [
    {
      id: 'slide-1',
      image: HERO_ASSETS.carousel1,
      caption: 'Gabriel & Helena — Encuentro en el Convento',
      quote: '“El pecado no desaparece, solo encuentra un lugar donde rezar.”',
    },
    {
      id: 'slide-2',
      image: HERO_ASSETS.carousel2,
      caption: 'Oración y Votos en la Catedral Gótica',
      quote: '“Bajo las bóvedas de piedra, la fe y la sangre reclaman su precio.”',
    },
    {
      id: 'slide-3',
      image: HERO_ASSETS.carousel3,
      caption: 'El Incendio y la Caída de Santa Vita',
      quote: '“Las cenizas de la capilla guardan secretos que jamás debieron arder.”',
    },
  ],
  synopsis: {
    title: 'Cap 2 † SOLO',
    subtitle: 'La Crónica del Convento Santa Vita',
    author: 'Autor de Santa Vita',
    releaseDate: 'Noviembre 2025',
    pageCount: '348 págs',
    synopsis: `Huyendo de quienes quieren verlo muerto, Gabriel encuentra refugio en el último lugar donde esperaba estar: un convento.

Allí se reencuentra con Helena, la mujer que alguna vez amó y que ahora ha entregado su vida a Dios. Pero detrás de los muros de aquel lugar hay algo mucho más oscuro que fe y silencio.

Un padre corrupto, monjas que guardan secretos y una historia que nadie parece dispuesto a contar comienzan a revelar que algunos pecados no pertenecen al pasado.

Gabriel creyó que el convento sería un refugio. Tal vez solo encontró otra forma de condena.`,
    mainQuote: '“El pecado no desaparece, solo encuentra un lugar donde rezar.”',
    genre: 'Novela Gótica • Thriller Psicológico',
    triggerWarnings: ['Misterio eclesiástico', 'Violencia psicológica', 'Ambiente de suspenso'],
  },
  secrets: SECRET_FILES_DATA,
  radioTracks: [
    {
      id: 'track-1',
      name: 'Radio Santa Vita (Misa de Medianoche)',
      frequency: '88.6 MHz AM',
      type: 'organ',
      description: 'Sermón nocturno y órgano mayor oficiado por el Padre Lucien.',
    },
    {
      id: 'track-2',
      name: 'Frecuencia de las Sombras (Cánticos)',
      frequency: '92.4 MHz OC',
      type: 'chant',
      description: 'Cánticos gregorianos provenientes de los pasillos de clausura.',
    },
    {
      id: 'track-3',
      name: 'Canal Clandestino de la Cripta (Campanas)',
      frequency: '104.1 MHz FM',
      type: 'bell',
      description: 'Campanadas lentas y resonancias de piedra bajo tierra.',
    },
  ],
  shopItems: STORE_ITEMS,
  chapters: CHAPTERS_DATA,
  mapImage: HERO_ASSETS.map,
  securityCameras: CONVENT_CAMERAS,
  characters: CHARACTERS_DATA,
  trailerTitle: 'Tráiler Oficial • Santa Vita',
  trailerDescription: 'Descubre los oscuros secretos del convento de clausura y la verdad que yace bajo las sombras de 1924.',
});

/**
 * Merge saved persistent state with code defaults so newly added chapters, characters or items are never wiped out.
 */
export const mergeStateWithDefaults = (saved: Partial<AppAdminState> | null | undefined): AppAdminState => {
  const defaults = getDefaultState();
  if (!saved) return defaults;

  // Merge chapters so any default chapter (including new ones like cap-9) is always present
  const mergedChaptersMap = new Map<string, Chapter>();
  defaults.chapters.forEach((c) => mergedChaptersMap.set(c.id, c));
  
  if (Array.isArray(saved.chapters)) {
    saved.chapters.forEach((savedChap) => {
      if (mergedChaptersMap.has(savedChap.id)) {
        const defChap = mergedChaptersMap.get(savedChap.id)!;
        mergedChaptersMap.set(savedChap.id, {
          ...defChap,
          ...savedChap,
          content: savedChap.content && savedChap.content.length > 0 ? savedChap.content : defChap.content,
        });
      } else {
        mergedChaptersMap.set(savedChap.id, savedChap);
      }
    });
  }

  // Merge shop items
  const mergedShopMap = new Map<string, StoreItem>();
  defaults.shopItems.forEach((item) => mergedShopMap.set(item.id, item));
  if (Array.isArray(saved.shopItems)) {
    saved.shopItems.forEach((item) => {
      mergedShopMap.set(item.id, { ...(mergedShopMap.get(item.id) || {}), ...item } as StoreItem);
    });
  }

  // Merge characters
  const mergedCharMap = new Map<string, Character>();
  defaults.characters.forEach((c) => mergedCharMap.set(c.id, c));
  if (Array.isArray(saved.characters)) {
    saved.characters.forEach((c) => {
      mergedCharMap.set(c.id, { ...(mergedCharMap.get(c.id) || {}), ...c } as Character);
    });
  }

  // Merge security cameras
  const mergedCamMap = new Map<string, SecurityCamera>();
  defaults.securityCameras.forEach((cam) => mergedCamMap.set(cam.id, cam));
  if (Array.isArray(saved.securityCameras)) {
    saved.securityCameras.forEach((cam) => {
      mergedCamMap.set(cam.id, { ...(mergedCamMap.get(cam.id) || {}), ...cam } as SecurityCamera);
    });
  }

  return {
    ...defaults,
    ...saved,
    chapters: Array.from(mergedChaptersMap.values()).sort((a, b) => a.number - b.number),
    shopItems: Array.from(mergedShopMap.values()),
    characters: Array.from(mergedCharMap.values()),
    securityCameras: Array.from(mergedCamMap.values()),
  };
};

// Cache in memory for instant synchronous access
let inMemoryCache: AppAdminState | null = null;

export const loadAdminState = (): AppAdminState => {
  if (inMemoryCache) {
    return inMemoryCache;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      inMemoryCache = mergeStateWithDefaults(parsed);
      return inMemoryCache;
    }
  } catch (e) {
    console.warn('LocalStorage read error, will load defaults/IDB', e);
  }

  inMemoryCache = getDefaultState();
  return inMemoryCache;
};

export const saveAdminState = (state: AppAdminState): void => {
  inMemoryCache = state;

  // 1. Save to IndexedDB (Persistent, no 5MB quota limit for large audio/images)
  saveToIDB(IDB_DATA_KEY, state).catch((err) => {
    console.error('Failed to save to IndexedDB', err);
  });

  // 2. Save to LocalStorage for fast synchronous boot
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('LocalStorage quota limit reached; IndexedDB has saved the full data safely.', e);
  }

  // 3. Dispatch broadcast event across tabs and components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('santa_vita_admin_data_updated'));
  }
};

export const resetAdminState = (): AppAdminState => {
  const defaults = getDefaultState();
  saveAdminState(defaults);
  return defaults;
};

// React hook for synchronized persistent state across the whole app
export const useAdminData = () => {
  const [data, setData] = useState<AppAdminState>(loadAdminState);

  // Initialize and check IndexedDB on initial mount
  useEffect(() => {
    let isMounted = true;

    const initFromIDB = async () => {
      try {
        const idbData = await getFromIDB<AppAdminState>(IDB_DATA_KEY);
        if (idbData && isMounted) {
          inMemoryCache = mergeStateWithDefaults(idbData);
          setData(inMemoryCache);
        }
      } catch (e) {
        console.error('Failed to initialize from IndexedDB', e);
      }
    };

    initFromIDB();

    const handleUpdate = () => {
      if (isMounted) {
        setData(loadAdminState());
      }
    };

    window.addEventListener('santa_vita_admin_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('santa_vita_admin_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateState = (updater: (prev: AppAdminState) => AppAdminState) => {
    setData((prev) => {
      const next = updater(prev);
      saveAdminState(next);
      return next;
    });
  };

  return {
    adminData: data,
    updateAdminData: updateState,
    resetToDefaults: resetAdminState,
  };
};
