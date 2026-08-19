import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  BookOpen, 
  Key, 
  Palette, 
  Cross, 
  Package, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Tag, 
  DollarSign, 
  Flame, 
  Scroll, 
  Share2, 
  RotateCcw,
  Check,
  Award,
  AlertCircle
} from 'lucide-react';
import { useAdminData } from '../../services/adminStore';
import { StoreItem } from '../../types';
import { audioService } from '../../services/audioService';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  item: StoreItem;
  qty: number;
}

const RANDOM_GOTHIC_ANNOUNCEMENTS = [
  {
    title: '¡DECRETO SANTO N° 994: Transacción Aprobada por el Sínodo Oculto!',
    decree: 'Tu tarjeta ha sido purificada con agua bendita y tus reliquias han sido envueltas en terciopelo negro de clausura. Advertencia: No expongas el paquete a la luz de la luna llena.',
    seal: 'SELLO EPISCOPAL DE CLAUSURA',
    icon: '🕯️',
  },
  {
    title: '¡MILAGRO FINANCIERO EN SANTA VITA!',
    decree: 'La Madre Superiora ha encendido un cirio perpetuo en tu nombre. El Padre Lucien jura que escuchó un suspiro de agradecimiento desde la cripta subterránea al confirmarse el cobro.',
    seal: 'BENDICIÓN DE LA CRIPTA',
    icon: '⛪',
  },
  {
    title: '¡PROCLAMA ECLESIÁSTICA: Ofrenda Aceptada!',
    decree: 'Tus monedas terrenales han sido registradas en los libros mayores de 1924. Se te concede indulgencia plenaria por los próximos 40 días y guía escoltada por cuervos consagrados.',
    seal: 'INDULGENCIA OFICIAL PLENARIA',
    icon: '🦅',
  },
  {
    title: '¡ADVERTENCIA DEL SANTO OFICIO DE LA NOCHE!',
    decree: 'Compra registrada en los anales prohibidos. Tu envío ha sido sellado con cera roja y lágrimas de vela bendita. Si el paquete vibra o susurra a las tres de la madrugada, no lo abras.',
    seal: 'ARCHIVADO EN CONFIDENCIAL',
    icon: '🩸',
  },
  {
    title: '¡CERTIFICADO DE ABSOLUCIÓN DE GASTOS TERRENALES!',
    decree: 'El dinero ha dejado tu cuenta bancaria pero la paz ha entrado a tu alma. El coro de novicias ha cantado un responsorio en latín en honor a tu generoso desembolso.',
    seal: 'CORO NOVICIADO SANTA VITA',
    icon: '✨',
  },
  {
    title: '¡ALERTA EN EL CAMPANARIO: 7 Campanadas de Medianoche!',
    decree: 'El campanero ciego de Santa Vita ha tocado 7 campanadas secretas. Tu paquete ya está en la carreta negra que sale a medianoche rumbo a tu dirección.',
    seal: 'CARRETERA DE LAS SOMBRAS',
    icon: '🔔',
  },
];

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose }) => {
  const { adminData } = useAdminData();
  const shopItems = adminData.shopItems || [];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Checkout & Calculator State
  const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [discountError, setDiscountError] = useState<string>('');

  // Buyer Info Form
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [buyerAddress, setBuyerAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ofrenda' | 'apple'>('card');

  // Random Announcement Receipt Modal State
  const [orderReceipt, setOrderReceipt] = useState<{
    orderId: string;
    announcement: typeof RANDOM_GOTHIC_ANNOUNCEMENTS[0];
    items: CartItem[];
    subtotal: number;
    shipping: number;
    discountAmount: number;
    tax: number;
    total: number;
    buyerName: string;
    date: string;
  } | null>(null);

  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories = ['Todos', 'Reliquia', 'Lectura', 'Coleccionable', 'Pase', 'Merch'];

  // Filter items
  const filteredItems = shopItems.filter((item) => {
    const matchesCat = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Cart operations
  const addToCart = (item: StoreItem) => {
    audioService.playBell(587.33);
    setCart((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.map((p) => (p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    audioService.playClick(440);
    setCart((prev) => {
      return prev
        .map((p) => {
          if (p.item.id === itemId) {
            const nextQty = p.qty + delta;
            return nextQty > 0 ? { ...p, qty: nextQty } : null;
          }
          return p;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    audioService.playClick(320);
    setCart((prev) => prev.filter((p) => p.item.id !== itemId));
  };

  const clearCart = () => {
    audioService.playClick(300);
    setCart([]);
    setAppliedDiscount(null);
  };

  // Live Calculator Math
  const rawSubtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.qty, 0);
  const discountRate = appliedDiscount ? appliedDiscount.percent / 100 : 0;
  const discountAmount = rawSubtotal * discountRate;
  const discountedSubtotal = rawSubtotal - discountAmount;
  
  // Shipping: free if over $50 or if empty, otherwise $4.50 eclesiastic courier
  const shippingCost = rawSubtotal === 0 ? 0 : rawSubtotal >= 50 ? 0 : 4.50;
  
  // Diezmo / Canon eclesiástico (5%)
  const churchTax = rawSubtotal > 0 ? discountedSubtotal * 0.05 : 0;
  
  // Grand Total
  const grandTotal = rawSubtotal > 0 ? discountedSubtotal + shippingCost + churchTax : 0;
  const totalItemCount = cart.reduce((a, b) => a + b.qty, 0);

  // Apply discount coupon code
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = discountCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'SANCTUS' || code === 'SOLO' || code === 'SANTAVITA') {
      setAppliedDiscount({ code, percent: 20 });
      setDiscountError('');
      audioService.playUnlock();
    } else if (code === 'CLAUSURA' || code === 'ARTEMISA' || code === 'GABRIEL') {
      setAppliedDiscount({ code, percent: 15 });
      setDiscountError('');
      audioService.playUnlock();
    } else if (code === 'FE' || code === 'DEVOTO') {
      setAppliedDiscount({ code, percent: 10 });
      setDiscountError('');
      audioService.playUnlock();
    } else {
      setDiscountError('Código no reconocido por el Archivo Conventual.');
      audioService.playClick(200);
    }
  };

  // Complete Payment & Show Random Gothic Announcement
  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    audioService.playBell(330);
    setTimeout(() => {
      audioService.playBell(587.33);
    }, 250);

    // Pick a random announcement
    const randomIndex = Math.floor(Math.random() * RANDOM_GOTHIC_ANNOUNCEMENTS.length);
    const selectedAnnouncement = RANDOM_GOTHIC_ANNOUNCEMENTS[randomIndex];
    const randomOrderId = `SV-${Math.floor(100000 + Math.random() * 900000)}-${['ORD', 'BULA', 'DECRETO', 'SIGIL'][Math.floor(Math.random() * 4)]}`;

    const receipt = {
      orderId: randomOrderId,
      announcement: selectedAnnouncement,
      items: [...cart],
      subtotal: rawSubtotal,
      shipping: shippingCost,
      discountAmount,
      tax: churchTax,
      total: grandTotal,
      buyerName: buyerName.trim() || 'Devoto Anónimo de Santa Vita',
      date: new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    setOrderReceipt(receipt);
    setCart([]);
    setAppliedDiscount(null);
    setIsCheckoutDrawerOpen(false);
  };

  const getRarityBadgeColor = (rarity?: string) => {
    switch (rarity) {
      case 'Prohibido':
        return 'bg-red-950/90 text-red-300 border-red-500/60';
      case 'Místico':
        return 'bg-purple-950/90 text-purple-300 border-purple-500/60';
      case 'Raro':
        return 'bg-amber-950/90 text-amber-300 border-amber-500/60';
      default:
        return 'bg-neutral-800 text-neutral-300 border-white/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0b090f] border border-red-950/80 rounded-xl shadow-[0_0_60px_rgba(220,38,38,0.25)] overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-red-950/80 bg-[#07050a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-500/50 flex items-center justify-center shadow">
              <ShoppingCart className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h2 className="font-gothic text-sm sm:text-base font-bold text-red-200 tracking-wider flex items-center gap-2">
                <span>Relicario & Tienda Canónica de Santa Vita</span>
                <span className="text-[10px] font-mono bg-red-950 px-2 py-0.5 rounded text-red-300 border border-red-500/30">
                  Edición Limitada 1924
                </span>
              </h2>
              <p className="font-sans-ui text-[11px] text-neutral-400">
                {shopItems.length} artículos consagrados • Calculadora de ofrendas en tiempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Cart Button Toggle */}
            <button
              onClick={() => {
                audioService.playClick(450);
                setIsCheckoutDrawerOpen(!isCheckoutDrawerOpen);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border ${
                cart.length > 0 
                  ? 'bg-red-950 hover:bg-red-900 border-red-500/60 text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'bg-black/50 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-red-400" />
              <span className="font-bold font-mono">{totalItemCount}</span>
              <span className="hidden sm:inline">Cesta (${rawSubtotal.toFixed(2)})</span>
            </button>

            <button
              id="btn-store-close"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0e0c13] border-b border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  audioService.playClick(440);
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-gothic tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-950 border border-red-500/60 text-white font-bold shadow'
                    : 'bg-black/40 border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar reliquia o libro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15121c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 font-sans-ui focus:outline-none focus:border-red-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area (Split between Product Grid and Cart/Calculator Drawer) */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Product Catalog Grid */}
          <div className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all ${isCheckoutDrawerOpen ? 'hidden md:block md:w-3/5' : 'w-full'}`}>
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Package className="w-12 h-12 text-neutral-600 mx-auto" />
                <h3 className="font-gothic text-base text-neutral-300">No se encontraron artículos</h3>
                <p className="text-xs text-neutral-500 font-sans-ui max-w-sm mx-auto">
                  Prueba cambiando la categoría o término de búsqueda, o añade nuevos artículos desde el Panel de Administrador.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#120f18] border border-white/10 rounded-xl p-4 hover:border-red-500/40 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Product Image Preview if exists */}
                      {item.image && (
                        <div className="w-full h-36 rounded-lg overflow-hidden bg-black/60 border border-white/10 mb-3 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono border ${getRarityBadgeColor(item.rarity)}`}>
                            {item.rarity || 'Místico'}
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-gothic text-sm sm:text-base font-bold text-neutral-100 group-hover:text-red-200 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-sm font-mono font-bold text-amber-300 shrink-0 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {!item.image && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                            {item.category}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getRarityBadgeColor(item.rarity)}`}>
                            {item.rarity || 'Sagrado'}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-neutral-400 font-sans-ui line-clamp-3 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className={`text-[11px] font-mono flex items-center gap-1 ${item.inStock ? 'text-emerald-400' : 'text-red-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {item.inStock ? 'En Clausura' : 'Agotado'}
                      </span>

                      <button
                        disabled={!item.inStock}
                        onClick={() => addToCart(item)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                          item.inStock
                            ? 'bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 border border-red-500/50 text-white shadow hover:scale-105 active:scale-95'
                            : 'bg-neutral-900 text-neutral-600 border border-white/5 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5 text-red-300" />
                        <span>Añadir</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Shopping Cart & Real-Time Live Calculator Panel */}
          <div className={`w-full md:w-2/5 border-t md:border-t-0 md:border-l border-red-950/80 bg-[#08060c] p-4 sm:p-5 flex flex-col justify-between overflow-y-auto ${!isCheckoutDrawerOpen && 'hidden md:flex'}`}>
            <div className="space-y-4">
              
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  <h3 className="font-gothic text-xs uppercase tracking-wider text-amber-200 font-bold">
                    Cesta de Reliquias ({totalItemCount})
                  </h3>
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-neutral-400 hover:text-red-400 font-mono transition-colors cursor-pointer"
                  >
                    Vaciar Cesta
                  </button>
                )}
              </div>

              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <ShoppingCart className="w-8 h-8 text-neutral-700 mx-auto" />
                  <p className="font-gothic text-xs text-neutral-400">Tu cesta está vacía</p>
                  <p className="text-[11px] text-neutral-500 font-sans-ui">
                    Selecciona reliquias o manuscritos del catálogo para calcular tu ofrenda.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {cart.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="p-2.5 bg-[#120f18] border border-white/5 rounded-lg flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <h5 className="font-gothic text-xs font-bold text-neutral-200 truncate">
                          {item.name}
                        </h5>
                        <span className="text-[10px] font-mono text-amber-400/90">
                          ${item.price.toFixed(2)} c/u
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-black/60 border border-white/10 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs text-neutral-200 px-1.5 font-bold">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs text-amber-300 font-bold min-w-[50px] text-right">
                          ${(item.price * qty).toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Code Input */}
              {cart.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-2 border-t border-white/10">
                  <label className="block text-[10px] font-gothic uppercase tracking-wider text-neutral-400">
                    Código de Ofrenda / Descuento Canónico:
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Ej: SANCTUS, SOLO, FE..."
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 bg-[#120f18] border border-white/10 rounded px-2.5 py-1 text-xs text-neutral-200 font-mono focus:outline-none focus:border-red-500/60 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 font-gothic text-xs uppercase rounded cursor-pointer transition-all"
                    >
                      Aplicar
                    </button>
                  </div>
                  {appliedDiscount && (
                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3" />
                      <span>¡Descuento {appliedDiscount.code} (-{appliedDiscount.percent}%) aplicado!</span>
                    </div>
                  )}
                  {discountError && (
                    <span className="text-[10px] text-red-400 font-mono block mt-1">{discountError}</span>
                  )}
                </form>
              )}

              {/* Live Calculator Breakdown Box */}
              {cart.length > 0 && (
                <div className="bg-[#120f18] border border-amber-500/30 rounded-xl p-3.5 space-y-2 shadow-inner">
                  <h4 className="font-gothic text-[11px] uppercase tracking-wider text-amber-400 font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
                    <span>Calculadora de Compra Total</span>
                    <span className="font-mono text-[10px] text-neutral-400">USD</span>
                  </h4>

                  <div className="space-y-1.5 text-xs font-sans-ui">
                    <div className="flex justify-between text-neutral-300">
                      <span>Subtotal de Artículos ({totalItemCount}):</span>
                      <span className="font-mono text-neutral-200">${rawSubtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscount && (
                      <div className="flex justify-between text-emerald-400 font-mono">
                        <span>Descuento ({appliedDiscount.percent}%):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-400">
                      <span className="flex items-center gap-1">
                        <span>Despacho Eclesiástico:</span>
                        {rawSubtotal >= 50 && (
                          <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1 rounded">Gratis &gt;$50</span>
                        )}
                      </span>
                      <span className="font-mono">{shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between text-neutral-400">
                      <span>Diezmo & Canon Convento (5%):</span>
                      <span className="font-mono">${churchTax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-white/10 pt-2 flex justify-between items-baseline font-bold">
                      <span className="font-gothic text-sm text-amber-200 uppercase">TOTAL OFRENDA:</span>
                      <span className="font-mono text-base sm:text-lg text-amber-400">
                        ${grandTotal.toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form de Pago / Consagración */}
              {cart.length > 0 && (
                <form onSubmit={handleCompletePayment} className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Tu Nombre / Nombre de Ofrendante *"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-[#120f18] border border-white/10 rounded px-2.5 py-1.5 text-xs text-neutral-200 font-sans-ui focus:outline-none focus:border-red-500"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Correo para confirmación de bula / rastreo *"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full bg-[#120f18] border border-white/10 rounded px-2.5 py-1.5 text-xs text-neutral-200 font-sans-ui focus:outline-none focus:border-red-500"
                    />

                    <input
                      type="text"
                      placeholder="Dirección de Envío para Reliquias Físicas"
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      className="w-full bg-[#120f18] border border-white/10 rounded px-2.5 py-1.5 text-xs text-neutral-200 font-sans-ui focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-red-950 border-red-500 text-white font-bold'
                          : 'bg-black/40 border-white/10 text-neutral-400'
                      }`}
                    >
                      Tarjeta
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ofrenda')}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        paymentMethod === 'ofrenda'
                          ? 'bg-red-950 border-red-500 text-white font-bold'
                          : 'bg-black/40 border-white/10 text-neutral-400'
                      }`}
                    >
                      Ofrenda Cripta
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        paymentMethod === 'apple'
                          ? 'bg-red-950 border-red-500 text-white font-bold'
                          : 'bg-black/40 border-white/10 text-neutral-400'
                      }`}
                    >
                      Apple/Google
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-950 via-red-900 to-amber-950 hover:from-red-900 hover:to-amber-900 border border-red-500/60 text-white font-gothic text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer font-bold shadow-[0_0_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Consagrar Pago (${grandTotal.toFixed(2)} USD)</span>
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* RANDOM GOTHIC POST-PAYMENT ANNOUNCEMENT MODAL */}
        {orderReceipt && (
          <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="relative w-full max-w-xl bg-[#0e0b14] border-2 border-amber-500/70 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_80px_rgba(245,158,11,0.3)] text-center">
              
              {/* Lacre Wax Seal icon */}
              <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-red-800 to-red-950 border-4 border-amber-500 flex items-center justify-center shadow-2xl animate-pulse">
                <span className="text-3xl">{orderReceipt.announcement.icon}</span>
                <div className="absolute -bottom-2 bg-black/90 text-amber-300 border border-amber-500/50 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold">
                  Consagrado
                </div>
              </div>

              {/* Random Title Announcement */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                  {orderReceipt.announcement.seal}
                </span>
                <h3 className="font-gothic text-xl sm:text-2xl font-bold text-neutral-100 tracking-wide mt-2">
                  {orderReceipt.announcement.title}
                </h3>
              </div>

              {/* Random Fun Gothic Decree Text */}
              <div className="p-4 bg-black/60 border border-amber-500/30 rounded-xl relative">
                <Scroll className="w-5 h-5 text-amber-500 absolute top-2 right-2 opacity-50" />
                <p className="font-quote text-sm sm:text-base text-amber-100/90 italic leading-relaxed">
                  «{orderReceipt.announcement.decree}»
                </p>
              </div>

              {/* Purchase Details Breakdown */}
              <div className="bg-[#15121c] border border-white/10 rounded-xl p-4 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-mono uppercase">Número de Bula / Pedido:</span>
                    <span className="font-mono font-bold text-red-400 text-sm">{orderReceipt.orderId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[10px] font-mono uppercase">Devoto Beneficiario:</span>
                    <span className="font-gothic font-bold text-neutral-200">{orderReceipt.buyerName}</span>
                  </div>
                </div>

                {/* Purchased items list */}
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {orderReceipt.items.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex justify-between text-neutral-300 font-sans-ui text-[11px]">
                      <span>{cartItem.item.name} × {cartItem.qty}</span>
                      <span className="font-mono text-amber-400">${(cartItem.item.price * cartItem.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm">
                  <span className="font-gothic text-amber-300 uppercase">Monto Total Consagrado:</span>
                  <span className="font-mono text-emerald-400 text-base">${orderReceipt.total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const text = `📜 RECIBO SANTA VITA\nOrden: ${orderReceipt.orderId}\nTotal: $${orderReceipt.total.toFixed(2)} USD\nDecreto: ${orderReceipt.announcement.decree}`;
                    navigator.clipboard.writeText(text);
                    setCopiedReceipt(true);
                    setTimeout(() => setCopiedReceipt(false), 3000);
                  }}
                  className="flex-1 py-2.5 bg-black/60 hover:bg-black/90 border border-amber-500/40 text-amber-200 font-gothic text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedReceipt ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
                  <span>{copiedReceipt ? '¡Recibo Copiado!' : 'Copiar Certificado'}</span>
                </button>

                <button
                  onClick={() => {
                    audioService.playClick(440);
                    setOrderReceipt(null);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-950 to-amber-950 hover:from-red-900 hover:to-amber-900 border border-amber-500/60 text-white font-gothic text-xs uppercase tracking-widest rounded-xl transition-all font-bold cursor-pointer shadow-lg"
                >
                  Volver al Relicario
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
