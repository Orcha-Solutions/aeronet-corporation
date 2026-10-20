import React, { useState, useMemo } from 'react';
import {
  Zap,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Globe,
  ShieldCheck,
  LifeBuoy,
  Search,
  Plus,
  Minus,
  Cpu,
  BatteryCharging,
  Building2,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

// ==========================================
// PRODUCT CATALOG DATA (PESO CURRENCY ₱)
// ==========================================
const PRODUCTS = [
  // CATEGORY 1: LAPTOPS
  {
    id: 'lap-1',
    category: 'laptop',
    name: 'UltraBook Pro 14 Air-Ti',
    tagline: 'Sub-Kilogram Executive Neural Ultrabook',
    price: 109900,
    badge: 'ULTRALIGHT 940G',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85',
    summary:
      'Featherweight brushed Grade-5 titanium chassis with fanless vapor-plane cooling and 28-hour solid-state battery endurance.',
    upgrades: [
      { label: 'Standard (32GB RAM / 1TB NVMe)', delta: 0 },
      { label: 'Executive (64GB RAM / 2TB NVMe)', delta: 22000 },
      { label: 'Foundry Max (96GB RAM / 4TB NVMe)', delta: 48000 },
    ],
    specs: {
      CPU: 'Aether M4 Pro (14-Core, 5.2GHz)',
      RAM: '32GB Unified LPDDR5X (8533 MT/s)',
      Storage: '1TB PCIe Gen5 NVMe (14,000 MB/s)',
      GPU: 'Integrated 20-Core Neural Raytracing GPU',
      Display: '14.2" 3.2K Tandem OLED, 120Hz ProMotion',
      Chassis: '0.94 kg • Dual Thunderbolt 5 • Wi-Fi 7',
    },
  },
  {
    id: 'lap-2',
    category: 'laptop',
    name: 'Creator Max Studio 16',
    tagline: 'Flagship Visual Effects & AI Workstation',
    price: 189900,
    badge: 'FLAGSHIP COMPUTE',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85',
    summary:
      'Built for 8K RAW cinema pipelines and local LLM training with hardware-calibrated Reference OLED and dual-impeller cryo-cooling.',
    upgrades: [
      { label: 'Studio Base (96GB RAM / 4TB RAID-0)', delta: 0 },
      { label: 'Neural Pro (128GB RAM / 8TB RAID-0)', delta: 36000 },
      { label: 'Extreme Silicon (192GB RAM / 16TB RAID-0)', delta: 78000 },
    ],
    specs: {
      CPU: 'Aether M4 Ultra (24-Core, 5.6GHz)',
      RAM: '96GB Unified LPDDR5X (192GB Optional)',
      Storage: '4TB RAID-0 Gen5 NVMe SSD',
      GPU: 'NVIDIA RTX 5090M 24GB GDDR7',
      Display: '16.2" 4K+ Tandem OLED, 240Hz, 1600 nits',
      Chassis: '1.85 kg • SD Express 8.0 • 3x TB5 Ports',
    },
  },
  {
    id: 'lap-3',
    category: 'laptop',
    name: 'Quantum Gaming Apex 18',
    tagline: 'Desktop-Replacement Esports & Sim Rig',
    price: 159900,
    badge: '480HZ DISPLAY',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85',
    summary:
      'Full-wattage 250W combined thermal envelope with optical-mechanical per-key Hall-Effect switches and phase-change liquid metal.',
    upgrades: [
      { label: 'Apex 5080M (64GB DDR5 / 2TB Gen5)', delta: 0 },
      { label: 'Apex 5090M OC (96GB DDR5 / 4TB Gen5)', delta: 39000 },
    ],
    specs: {
      CPU: 'Intel Core Ultra 9 295HX (24-Core)',
      RAM: '64GB DDR5-7200 XMP Low-Latency',
      Storage: '2TB PCIe Gen5 NVMe + Open M.2 Slot',
      GPU: 'NVIDIA RTX 5080M 16GB GDDR7 (175W TGP)',
      Display: '18.0" QHD+ Mini-LED, 480Hz, 0.2ms GTG',
      Chassis: '2.65 kg • 2.5GbE LAN • Per-Key Hall RGB',
    },
  },
  {
    id: 'lap-4',
    category: 'laptop',
    name: 'TensorBook Linux Tensor-X',
    tagline: 'Dedicated Tensor & Robotics Field Terminal',
    price: 139900,
    badge: 'AETHER-OS / LINUX',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=85',
    summary:
      'Pre-configured with CUDA 13, PyTorch, ROS 2, and direct OCuLink eGPU/EV-telemetry bridge for autonomous vehicle engineers.',
    upgrades: [
      { label: 'Field Dev (64GB ECC / 2TB Encrypted)', delta: 0 },
      { label: 'Autonomous Cluster (128GB ECC / 4TB)', delta: 31000 },
    ],
    specs: {
      CPU: 'AMD Ryzen AI Max+ 395 (16-Core Zen 5)',
      RAM: '64GB ECC Soldered Unified Memory',
      Storage: '2TB Hardware-Encrypted Gen5 NVMe',
      GPU: 'Radeon 8060S + Dedicated 120 TOPS NPU',
      Display: '15.6" Anti-Glare 2.8K Matte IPS, 165Hz',
      Chassis: '1.52 kg • OCuLink Port • MIL-STD-810H',
    },
  },

  // CATEGORY 2: ELECTRIC VEHICLES
  {
    id: 'ev-1',
    category: 'ev',
    name: 'Wuling Yangguang EV Passenger Van 14 Seats',
    tagline: 'Carbon-Monocoque Hyper-Commuter',
    price: 1333000,
    badge: 'Wuling',
    image: 'https://wulingcars.com/wp-content/uploads/2024/09/Wuling-Yangguang-Electric-Passenger-Van1.png',
    summary:
      'Yangguang Electric Passenger Van 14 Seats',
    upgrades: [
      { label: 'Single 1.8 kWh Blade (115 Mi Range)', delta: 0 },
      { label: 'Dual-Blade Long Range Pack (230 Mi)', delta: 36000 },
    ],
    specs: {
      Range: '300 km to 400 km (CLTC)',
      'Top Speed': '100 km/h to 135 km/h depending on the configuration',
      'Battery Capacity': 'Wuling Red No. 1 LFP battery with liquid-cooling (30% to 80% fast charge in about 30 minutes)',
      Configurations: 'Available in cargo, utility, and passenger layouts (such as 5 to 7-seater or up to 14-seater minibus variants)',
    },
  },
  {
    id: 'ev-2',
    category: 'ev',
    name: 'Wuling Starlight EV Xingguang EV 2025',
    tagline: 'Starlight EV Edition',
    price: 1483000,
    badge: 'Wuling',
    image: 'https://wulingcars.com/wp-content/uploads/2024/06/Wuling-Starlight-EV-Edition3.png',
    summary:
      'Wuling Starlight EV adopts smooth and modern body lines, and the whole car is dynamic and elegant',
    upgrades: [
      { label: 'Dual-Motor AWD Standard (390 Mi)', delta: 0 },
      { label: 'Performance Track Package + Level 4 Pilot', delta: 250000 },
    ],
    specs: {
      Range: '610 km (approx. 400+ km realistic highway range)',
      'Top Speed': '1450 KMH',
      'Battery Capacity': 'Premium / Top-spec: 54.3 kWh or 69.2 kWh (depending on the trim tier)',
      Configurations: '4-door, 5-seater mid-size saloon (sedan). Front-Wheel Drive (FWD) layout with MacPherson independent front suspension and multi-link independent rear suspension.',
    },
  },
  {
    id: 'ev-3',
    category: 'ev',
    name: 'Wuling Starlight L PHEV 2026',
    tagline: 'Wuling Starlight L',
    price: 1733000,
    badge: 'Wuling',
    image: 'https://wulingcars.com/wp-content/uploads/2026/04/WULING-STARLIHT-L-2-2048x1106.jpg',
    summary:
      'Our flagship grand tourer combining a 900V silicon-carbide tri-motor powertrain with whisper-quiet active road-noise cancellation.',
    upgrades: [
      { label: 'Grand Touring Tri-Motor (610 Mi Range)', delta: 0 },
      { label: 'Sovereign Carbon-Ceramic Track Edition', delta: 540000 },
    ],
    specs: {
      Range: '610 Miles EPA Verified',
      'Top Speed': '190 km/h (driven by a 1.5L Atkinson cycle engine paired with a 170 kW electric motor producing 231 combined hp)',
      'Battery Capacity': '37.9 kWh Lithium Iron Phosphate (LFP) pack',
      Configurations: '6-seater mid-size crossover SUV in a 2+2+2 independent seating layout',
    },
  },
  {
    id: 'ev-4',
    category: 'ev',
    name: 'Wuling Aishang A100C Mini EV',
    tagline: 'Wuling Aishang A100C',
    price: 580000,
    badge: 'Aishang',
    image: 'https://wulingcars.com/wp-content/uploads/2025/11/aishang-a-100c11.png',
    summary:
      '14 inches of adjustable pneumatic ground clearance, tank-turn capability, and integrated 240V mobile workstation power outlets.',
    upgrades: [
      { label: 'Quad-Motor Expedition (520 Mi Range)', delta: 0 },
      { label: 'Solar Roof Canopy + Winch & Telemetry Array', delta: 350000 },
    ],
    specs: {
      Range: '220 KM o a single charge (CLTC)',
      'Top Speed': 'Maximized at 101 km/h, powered by a 35 kW (51 hp / 47 hp) electric motor generating 83 Nm of instant torque',
      'Battery Capacity': 'Equipped with a 17.65 kWh Lithium Iron Phosphate (LFP)',
      Configurations: '3-door, 4-seat micro hatchback. It utilizes a Rear-Motor, Rear-Wheel-Drive (RWD)',
    },
  },
];

// Helper to format Peso currency
const formatPeso = (amount) => `₱${Number(amount).toLocaleString('en-PH')}`;

export default function App() {
  // Navigation & Page State
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroPreviewMode, setHeroPreviewMode] = useState('compute');

  // Strictly 2 Product Categories: 'laptop' (1st) and 'ev' (2nd)
  const [productCategory, setProductCategory] = useState('laptop');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Cart & Bag State
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([
    // {
    //   productId: 'lap-1',
    //   category: 'laptop',
    //   title: 'UltraBook Pro 14 Air-Ti',
    //   subtitle: 'Standard (32GB RAM / 1TB NVMe) • Ships in 24h',
    //   unitPrice: 109900,
    //   qty: 1,
    // },
  ]);

  // Spec & Configurator Modal State
  const [specModalProduct, setSpecModalProduct] = useState(null);
  const [selectedUpgradeIdx, setSelectedUpgradeIdx] = useState(0);

  // Contact Page Dual-Purpose State
  const [contactMode, setContactMode] = useState('support'); // 'support' | 'corporate'
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    division: 'Aether Compute (Laptops)',
    serial: '',
    company: '',
    volume: '10 - 50 Units (Compute / EV)',
    showroom: 'Manila — BGC High Street Flagship Hub',
    message: '',
  });
  const [contactReceipt, setContactReceipt] = useState(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const showToast = (message, accent = 'cyber') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, accent }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCatalogWithCategory = (category) => {
    setProductCategory(category);
    navigateTo('products');
  };

  const addToCart = (productId, upgradeIdx = 0) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const selectedUpgrade = product.upgrades
      ? product.upgrades[upgradeIdx]
      : { label: 'Factory Spec', delta: 0 };
    const finalPrice = product.price + (selectedUpgrade?.delta || 0);
    const customSubtitle = selectedUpgrade
      ? selectedUpgrade.label
      : product.category === 'laptop'
      ? 'Direct Hardware Purchase'
      : 'Factory EV Order';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.subtitle === customSubtitle
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          category: product.category,
          title: product.name,
          subtitle: customSubtitle,
          unitPrice: finalPrice,
          qty: 1,
        },
      ];
    });

    showToast(
      `Added ${product.name} (${customSubtitle}) to Cart`,
      product.category === 'ev' ? 'volt' : 'cyber'
    );
  };

  const inquireProduct = (product) => {
    setContactMode('corporate');
    setContactForm((prev) => ({
      ...prev,
      division:
        product.category === 'ev'
          ? 'Volt Mobility (EVs & E-Bikes)'
          : 'Aether Compute (Laptops)',
      message: `I would like to inquire about purchasing the ${product.name} (${formatPeso(
        product.price
      )}). Please share availability and delivery details.`,
    }));
    navigateTo('contact');
    showToast(`Loaded inquiry form for ${product.name}`, 'volt');
  };

  const updateCartQty = (idx, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[idx].qty + delta;
      if (newQty <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx] = { ...updated[idx], qty: newQty };
      }
      return updated;
    });
  };

  const checkoutOrder = () => {
    if (cart.length === 0) {
      showToast('Your cart is currently empty.', 'cyber');
      return;
    }
    const orderRef = 'AERO-' + Math.floor(100000 + Math.random() * 900000);
    setCart([]);
    setCartOpen(false);
    showToast(
      `Order ${orderRef} confirmed! Official receipt & dispatch details sent to your email.`,
      'volt'
    );
  };

  // Filtered & Sorted Products for the active category ('laptop' or 'ev')
  const activeProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = PRODUCTS.filter((item) => {
      if (item.category !== productCategory) return false;
      const haystack = `${item.name} ${item.tagline} ${item.summary} ${Object.values(
        item.specs
      ).join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [productCategory, searchQuery, sortBy]);

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );
  const totalCartCost = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0),
    [cart]
  );

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const ticketId =
      (contactMode === 'support' ? 'SUP-' : 'FLT-') +
      Math.floor(10000 + Math.random() * 90000);

    setContactReceipt({
      ticketId,
      name: contactForm.name,
      email: contactForm.email,
      showroom: contactForm.showroom,
      mode: contactMode,
    });

    showToast(`Inquiry #${ticketId} received by AERONET Concierge.`, 'volt');
    setContactForm((prev) => ({
      ...prev,
      name: '',
      email: '',
      serial: '',
      company: '',
      message: '',
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern bg-grid relative">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Top Announcement Telemetry Bar */}
      {/* <div className="relative z-40 bg-carbon/90 border-b border-line text-xs font-mono text-muted py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 text-volt-400">
              <span className="w-2 h-2 rounded-full bg-volt-400 animate-pulse" />
              AERONET SOLID-STATE ARCHITECTURE v4.2 LIVE
            </span>
            <span className="hidden sm:inline text-ink">|</span>
            <span className="hidden sm:inline text-muted">
              ALL PRICES IN PHILIPPINE PESO (₱ PHP)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>0% APR FINANCING ON ALL LAPTOPS &amp; EV BUILDS</span>
            <button
              onClick={() => navigateTo('products')}
              className="text-cyber-400 hover:underline"
            >
              EXPLORE CATALOG &rarr;
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-volt-500 border border-line flex items-center justify-center group-hover:border-cyber-400 transition-colors">
              <Zap className="w-5 h-5 text-ink" />
            </div>
            <div>
              <span className="font-display font-bold tracking-wider text-lg text-ink block leading-none">
                AERONET<span className="text-cyber-400">//</span>CORP
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
                Laptops &amp; Electric Vehicles
              </span>
            </div>
          </button>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-mist border border-line">
            {[
              { id: 'home', label: 'Home' },
              { id: 'products', label: 'Products' },
              { id: 'contact', label: 'Contact & Showrooms' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activePage === tab.id
                    ? 'bg-mist text-ink shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Cart Drawer Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-mist hover:bg-mist border border-line transition text-sm font-medium text-ink"
            >
              <ShoppingBag className="w-4 h-4 text-cyber-400" />
              <span className="hidden sm:inline">Cart &amp; Orders</span>
              <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyber-500 text-ink font-semibold">
                {totalCartItems}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} className="md:hidden p-2.5 rounded-xl bg-mist border border-line text-muted hover:text-ink"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-line bg-carbon px-4 pt-3 pb-5 space-y-2">
            <button
              onClick={() => navigateTo('home')}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-mist"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('products')}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-mist"
            >
              Products (Laptops &amp; Electric Vehicles)
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-mist"
            >
              Contact &amp; Showrooms
            </button>
          </div>
        )}
      </header>

      {/* ==========================================
          MAIN CONTENT ROUTER
          ========================================== */}
      <main className="flex-grow relative z-10">
        {/* ==========================================
            PAGE 1: HOME
            ========================================== */}
        {activePage === 'home' && (
          <section className="page-transition">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-line">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Hero Copy */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist border border-line text-xs font-mono text-muted">
                      <span className="px-2 py-0.5 rounded-full bg-cyber-500/20 text-cyber-400 font-semibold">
                        01. LAPTOPS
                      </span>
                      <span>+</span>
                      <span className="px-2 py-0.5 rounded-full bg-volt-500/20 text-volt-400 font-semibold">
                        02. ELECTRIC VEHICLES
                      </span>
                      <span className="text-muted pl-1">Unified Ecosystem 2026</span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.05]">
                      Engineered for <br />
                      <span className="hero-highlight">
                        Teraflops &amp; Torque.
                      </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted max-w-2xl font-light leading-relaxed">
                      From aerospace-grade neural laptops to 900V solid-state electric
                      vehicles. AERONET unifies personal supercomputing and zero-emission
                      mobility under a single minimalist design language.
                    </p>

                    {/* Primary Hero CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => openCatalogWithCategory('laptop')}
                        className="px-7 py-4 rounded-xl bg-cyber-500 hover:bg-cyber-400 text-ink font-display font-semibold text-sm tracking-wide transition shadow-lg shadow-cyber-500/20 flex items-center gap-2"
                      >
                        <span>Explore Laptops</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openCatalogWithCategory('ev')}
                        className="px-7 py-4 rounded-xl bg-volt-500/15 hover:bg-volt-500/25 text-volt-400 border border-volt-500/40 font-display font-semibold text-sm tracking-wide transition flex items-center gap-2"
                      >
                        <span>Explore Electric Vehicles</span>
                        <Zap className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Live Engineering Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-line max-w-xl">
                      <div>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                          180 <span className="text-cyber-400 text-base font-mono">TOPS</span>
                        </div>
                        <div className="text-xs font-mono text-muted mt-1">
                          ON-DEVICE AI COMPUTE
                        </div>
                      </div>
                      <div>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                          610 <span className="text-volt-400 text-base font-mono">MI</span>
                        </div>
                        <div className="text-xs font-mono text-muted mt-1">
                          MAX SOLID-STATE RANGE
                        </div>
                      </div>
                      <div>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                          1.9 <span className="text-ink text-base font-mono">SEC</span>
                        </div>
                        <div className="text-xs font-mono text-muted mt-1">
                          0-60 MPH &amp; INSTANT WAKE
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Interactive Dual Showcase Card */}
                  <div className="lg:col-span-5">
                    <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-line shadow-2xl">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono uppercase tracking-widest text-muted">
                          CATEGORY PREVIEW
                        </span>
                        <div className="inline-flex rounded-lg bg-obsidian p-1 border border-line">
                          <button
                            onClick={() => setHeroPreviewMode('compute')}
                            className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                              heroPreviewMode === 'compute'
                                ? 'bg-cyber-500 text-ink font-semibold'
                                : 'text-muted hover:text-ink'
                            }`}
                          >
                            LAPTOPS
                          </button>
                          <button
                            onClick={() => setHeroPreviewMode('mobility')}
                            className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                              heroPreviewMode === 'mobility'
                                ? 'bg-volt-500 text-ink font-semibold'
                                : 'text-muted hover:text-ink'
                            }`}
                          >
                            ELECTRIC VEHICLES
                          </button>
                        </div>
                      </div>

                      {heroPreviewMode === 'compute' ? (
                        <div className="space-y-5 page-transition">
                          <div className="relative rounded-2xl overflow-hidden h-52 bg-obsidian border border-line">
                            <img
                              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
                              alt="Creator Max Studio 16"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-obsidian/85 border border-cyber-500/40 text-xs font-mono text-cyber-400">
                              AETHER M4 ULTRA • 96GB UNIFIED
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-display text-xl font-bold text-ink">
                                Creator Max Studio 16
                              </h3>
                              <p className="text-xs font-mono text-muted">
                                CNC Titanium • 240Hz Tandem OLED
                              </p>
                            </div>
                            <span className="font-mono text-xl font-bold text-cyber-400">
                              {formatPeso(189900)}
                            </span>
                          </div>
                          <div className="space-y-2 text-xs font-mono">
                            <div className="flex justify-between text-muted">
                              <span>AI Neural Compute</span>
                              <span className="text-cyber-400">180 TOPS</span>
                            </div>
                            <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyber-400 h-full w-[94%]" />
                            </div>
                            <div className="flex justify-between text-muted pt-1">
                              <span>Battery Endurance</span>
                              <span className="text-volt-400">26 Hours</span>
                            </div>
                            <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden">
                              <div className="bg-volt-400 h-full w-[90%]" />
                            </div>
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => addToCart('lap-2')}
                              className="flex-1 py-3 rounded-xl bg-cyber-500 hover:bg-cyber-400 text-ink font-display font-semibold text-xs uppercase tracking-wider transition"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => openCatalogWithCategory('laptop')}
                              className="px-4 py-3 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-ink transition"
                            >
                              View Laptops
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-5 page-transition">
                          <div className="relative rounded-2xl overflow-hidden h-52 bg-obsidian border border-line">
                            <img
                              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80"
                              alt="Horizon Long-Range GT"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-obsidian/85 border border-volt-500/40 text-xs font-mono text-volt-400">
                              900V ARCHITECTURE • 1,120 HP
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-display text-xl font-bold text-ink">
                                Horizon Long-Range GT
                              </h3>
                              <p className="text-xs font-mono text-muted">
                                Tri-Motor AWD • 135 kWh Solid-State
                              </p>
                            </div>
                            <span className="font-mono text-xl font-bold text-volt-400">
                              {formatPeso(4850000)}
                            </span>
                          </div>
                          <div className="space-y-2 text-xs font-mono">
                            <div className="flex justify-between text-muted">
                              <span>EPA Single-Charge Range</span>
                              <span className="text-volt-400">610 Miles</span>
                            </div>
                            <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden">
                              <div className="bg-volt-400 h-full w-[96%]" />
                            </div>
                            <div className="flex justify-between text-muted pt-1">
                              <span>0–60 MPH Acceleration</span>
                              <span className="text-cyber-400">1.95 Sec</span>
                            </div>
                            <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyber-400 h-full w-[92%]" />
                            </div>
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => addToCart('ev-3')}
                              className="flex-1 py-3 rounded-xl bg-volt-500 hover:bg-volt-400 text-ink font-display font-semibold text-xs uppercase tracking-wider transition"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => openCatalogWithCategory('ev')}
                              className="px-4 py-3 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-ink transition"
                            >
                              View EVs
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURED SPLIT: FLAGSHIPS SIDE-BY-SIDE */}
            <div className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-cyber-400 block mb-2">
                    // 01 — DUAL FLAGSHIP SERIES
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                    Two Categories. One Engineering DNA.
                  </h2>
                </div>
                <p className="text-muted max-w-md text-sm">
                  Both flagship lines share our proprietary Silicon-Carbide thermal matrix and
                  high-density lithium-ceramic cell chemistry.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Flagship Laptop */}
                <div className="glass-panel rounded-3xl overflow-hidden border border-cyber-500/25 flex flex-col justify-between group card-hover">
                  <div>
                    <div className="relative h-72 sm:h-80 overflow-hidden bg-carbon">
                      <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"
                        alt="Creator Max Studio 16 Flagship"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slateCard via-slateCard/30 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-500 text-ink">
                          CATEGORY 01 // LAPTOPS
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-obsidian/80 text-muted border border-line">
                          CNC TITANIUM CHASSIS
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                        <div>
                          <p className="text-xs font-mono text-cyber-400 uppercase tracking-wider">
                            AETHER SERIES
                          </p>
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                            Creator Max Studio 16
                          </h3>
                        </div>
                        <span className="font-mono text-xl font-bold text-ink">
                          {formatPeso(189900)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                      <p className="text-muted text-sm leading-relaxed">
                        Designed for neural model compilation, 8K RAW color grading, and
                        real-time raytracing. Equipped with vapor-chamber liquid metal cooling
                        and a 16.2&quot; Tandem OLED 240Hz display.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            PROCESSOR
                          </span>
                          <span className="font-mono text-xs font-semibold text-ink">
                            Aether M4 Ultra 24C
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            MEMORY
                          </span>
                          <span className="font-mono text-xs font-semibold text-ink">
                            96GB LPDDR5X
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            GRAPHICS
                          </span>
                          <span className="font-mono text-xs font-semibold text-ink">
                            RTX 5090M 24GB
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            BATTERY
                          </span>
                          <span className="font-mono text-xs font-semibold text-cyber-400">
                            26 Hrs Solid-State
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => addToCart('lap-2')}
                      className="flex-1 py-3.5 px-5 rounded-xl bg-cyber-500 hover:bg-cyber-400 text-ink font-display font-semibold text-sm transition text-center"
                    >
                      Add to Cart — {formatPeso(189900)}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUpgradeIdx(0);
                        setSpecModalProduct(PRODUCTS.find((p) => p.id === 'lap-2'));
                      }}
                      className="py-3.5 px-4 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-muted transition"
                    >
                      Full Specs &amp; Configure
                    </button>
                  </div>
                </div>

                {/* Right Column: Flagship Electric Vehicle */}
                <div className="glass-panel rounded-3xl overflow-hidden border border-volt-500/25 flex flex-col justify-between group card-hover">
                  <div>
                    <div className="relative h-72 sm:h-80 overflow-hidden bg-carbon">
                      <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85"
                        alt="Horizon Long-Range Sedan"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slateCard via-slateCard/30 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-volt-500 text-ink">
                          CATEGORY 02 // ELECTRIC VEHICLES
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-obsidian/80 text-muted border border-line">
                          TRI-MOTOR AWD
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                        <div>
                          <p className="text-xs font-mono text-volt-400 uppercase tracking-wider">
                            VOLT SOVEREIGN SERIES
                          </p>
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                            Horizon Long-Range GT
                          </h3>
                        </div>
                        <span className="font-mono text-xl font-bold text-ink">
                          {formatPeso(4850000)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                      <p className="text-muted text-sm leading-relaxed">
                        Sculpted with a 0.197 Cd drag coefficient, active magnetorheological
                        air suspension, and an onboard Aether Neural Drive computer delivering
                        Level 4 highway autonomy.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            EPA RANGE
                          </span>
                          <span className="font-mono text-xs font-semibold text-volt-400">
                            610 Miles
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            TOP SPEED
                          </span>
                          <span className="font-mono text-xs font-semibold text-ink">
                            205 MPH
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            BATTERY PACK
                          </span>
                          <span className="font-mono text-xs font-semibold text-ink">
                            135 kWh Solid-State
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-obsidian/60 border border-line">
                          <span className="text-[11px] font-mono text-muted block">
                            HYPERCHARGE
                          </span>
                          <span className="font-mono text-xs font-semibold text-ink">
                            200 Mi in 8 Min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => addToCart('ev-3')}
                      className="flex-1 py-3.5 px-5 rounded-xl bg-volt-500 hover:bg-volt-400 text-ink font-display font-semibold text-sm transition text-center"
                    >
                      Add to Cart — {formatPeso(4850000)}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUpgradeIdx(0);
                        setSpecModalProduct(PRODUCTS.find((p) => p.id === 'ev-3'));
                      }}
                      className="py-3.5 px-4 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-muted transition"
                    >
                      Full Specs &amp; Trim
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* VALUE PROPOSITION GRID */}
            <div className="py-20 bg-carbon/60 border-t border-line">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="font-mono text-xs uppercase tracking-widest text-volt-400 block mb-2">
                    // 02 — INFRASTRUCTURE &amp; ASSURANCE
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                    Built for Zero Compromise
                  </h2>
                  <p className="text-muted text-sm mt-3">
                    Whether deploying a fleet of mobile workstations or stepping into your next
                    daily electric vehicle, every purchase is backed by direct manufacturer
                    infrastructure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="glass-panel p-7 rounded-2xl border border-line card-hover">
                    <div className="w-12 h-12 rounded-xl bg-cyber-500/15 border border-cyber-500/30 flex items-center justify-center text-cyber-400 mb-5">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      Nationwide &amp; Global Delivery
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      24-hour express air-freight dispatch for all custom laptops and enclosed
                      climate-controlled flatbed delivery to your doorstep for EVs.
                    </p>
                  </div>

                  <div className="glass-panel p-7 rounded-2xl border border-line card-hover">
                    <div className="w-12 h-12 rounded-xl bg-volt-500/15 border border-volt-500/30 flex items-center justify-center text-volt-400 mb-5">
                      <BatteryCharging className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      Cobalt-Free Solid Cells
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      100% closed-loop recyclable silicon-anode cells power both our laptops
                      and EVs—delivering 2.4x energy density with zero thermal runaway risk.
                    </p>
                  </div>

                  <div className="glass-panel p-7 rounded-2xl border border-line card-hover">
                    <div className="w-12 h-12 rounded-xl bg-cyber-500/15 border border-cyber-500/30 flex items-center justify-center text-cyber-400 mb-5">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      AetherShield™ Warranty
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      8-year / 150,000-mile EV battery &amp; drive unit coverage, plus 4-year
                      next-business-day accidental swap coverage on all compute systems.
                    </p>
                  </div>

                  <div className="glass-panel p-7 rounded-2xl border border-line card-hover">
                    <div className="w-12 h-12 rounded-xl bg-volt-500/15 border border-volt-500/30 flex items-center justify-center text-volt-400 mb-5">
                      <LifeBuoy className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      24/7 Telemetry Concierge
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      Over-the-air diagnostics and senior hardware engineers available
                      on-demand via AetherOS or in-cabin satellite link anywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            PAGE 2: PRODUCTS CATALOG (2 CATEGORIES)
            ========================================== */}
        {activePage === 'products' && (
          <section className="page-transition py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Catalog Header & 2-Category Filter Controls */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-cyber-400 block mb-2">
                    // HARDWARE &amp; FLEET CATALOG (PHP ₱)
                  </span>
                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink">
                    Precision Product Matrix
                  </h1>
                  <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl">
                    Select a category below to switch between our high-performance{' '}
                    <strong className="text-ink">Laptops</strong> and zero-emission{' '}
                    <strong className="text-ink">Electric Vehicles</strong>.
                  </p>
                </div>

                {/* Strictly 2 Product Category Tabs: 1. Laptops, 2. Electric Vehicles */}
                <div className="flex items-center gap-2 bg-carbon p-1.5 rounded-2xl border border-line self-start lg:self-auto">
                  <button
                    onClick={() => setProductCategory('laptop')}
                    className={`px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center gap-2.5 ${
                      productCategory === 'laptop'
                        ? 'bg-cyber-500 text-ink font-bold shadow-lg shadow-cyber-500/20'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    1. Laptops (4)
                  </button>
                  <button
                    onClick={() => setProductCategory('ev')}
                    className={`px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center gap-2.5 ${
                      productCategory === 'ev'
                        ? 'bg-volt-500 text-ink font-bold shadow-lg shadow-volt-500/20'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    2. Electric Vehicles (4)
                  </button>
                </div>
              </div>

              {/* Secondary Search & Sort Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      productCategory === 'laptop'
                        ? 'Search laptop model, CPU, RAM, or GPU...'
                        : 'Search EV model, battery range, or speed...'
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-carbon border border-line text-sm text-ink placeholder-slate-500 focus:outline-none focus:border-cyber-400 transition"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-4 h-4 text-muted" />
                  <label className="text-xs font-mono text-muted uppercase">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-carbon border border-line text-xs font-mono text-ink focus:outline-none focus:border-cyber-400"
                  >
                    <option value="featured">Featured Engineering</option>
                    <option value="price-asc">Price: Low to High (₱)</option>
                    <option value="price-desc">Price: High to Low (₱)</option>
                  </select>
                </div>
              </div>

              {/* CATEGORY 1: LAPTOP CATALOG */}
              {productCategory === 'laptop' && (
                <div className="mt-4 space-y-6 page-transition">
                  <div className="flex items-center justify-between border-l-2 border-cyber-400 pl-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-cyber-400" />
                        High-Performance Laptops
                      </h2>
                      <p className="text-xs font-mono text-muted">
                        CNC-MACHINED TITANIUM &amp; ANODIZED ALUMINUM WORKSTATIONS
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyber-500/10 text-cyber-400 border border-cyber-500/20">
                      IN STOCK — SHIPS IN 24H
                    </span>
                  </div>

                  {activeProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {activeProducts.map((lap) => (
                        <div
                          key={lap.id}
                          className="glass-panel rounded-3xl overflow-hidden border border-line flex flex-col justify-between card-hover"
                        >
                          <div>
                            <div className="relative h-60 bg-obsidian overflow-hidden">
                              <img
                                src={lap.image}
                                alt={lap.name}
                                className="w-full h-full object-cover opacity-85 hover:scale-105 transition duration-500"
                              />
                              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-500 text-ink">
                                {lap.badge}
                              </div>
                              <div className="absolute bottom-3 right-4 px-3 py-1 rounded-lg bg-obsidian/90 border border-line font-mono text-lg font-bold text-ink">
                                {formatPeso(lap.price)}
                              </div>
                            </div>
                            <div className="p-6 sm:p-7 space-y-5">
                              <div>
                                <div className="text-xs font-mono text-cyber-400 uppercase">
                                  {lap.tagline}
                                </div>
                                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                                  {lap.name}
                                </h3>
                                <p className="text-muted text-sm mt-2 leading-relaxed">
                                  {lap.summary}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">CPU</span>
                                  <span className="text-ink font-medium">
                                    {lap.specs.CPU}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">RAM</span>
                                  <span className="text-ink font-medium">
                                    {lap.specs.RAM}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">
                                    STORAGE
                                  </span>
                                  <span className="text-ink font-medium">
                                    {lap.specs.Storage}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">GPU</span>
                                  <span className="text-cyber-400 font-medium">
                                    {lap.specs.GPU}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="px-6 pb-6 sm:px-7 sm:pb-7 flex items-center gap-3">
                            <button
                              onClick={() => addToCart(lap.id, 0)}
                              className="flex-1 py-3.5 px-4 rounded-xl bg-cyber-500 hover:bg-cyber-400 text-ink font-display font-semibold text-sm transition flex items-center justify-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add to Cart — {formatPeso(lap.price)}</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUpgradeIdx(0);
                                setSpecModalProduct(lap);
                              }}
                              className="py-3.5 px-4 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-muted transition"
                            >
                              Configure
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-carbon border border-line text-center text-muted font-mono text-sm">
                      No laptop configurations match &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </div>
              )}

              {/* CATEGORY 2: ELECTRIC VEHICLE CATALOG */}
              {productCategory === 'ev' && (
                <div className="mt-4 space-y-6 page-transition">
                  <div className="flex items-center justify-between border-l-2 border-volt-400 pl-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                        <Zap className="w-5 h-5 text-volt-400" />
                        Electric Vehicles
                      </h2>
                      <p className="text-xs font-mono text-muted">
                        SOLID-STATE 900V ARCHITECTURE — E-MOBILITY TO HYPER-SEDANS
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-volt-500/10 text-volt-400 border border-volt-500/20">
                      DIRECT FACTORY DELIVERY
                    </span>
                  </div>

                  {activeProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {activeProducts.map((ev) => (
                        <div
                          key={ev.id}
                          className="glass-panel rounded-3xl overflow-hidden border border-line flex flex-col justify-between card-hover"
                        >
                          <div>
                            <div className="relative h-60 bg-obsidian overflow-hidden">
                              <img
                                src={ev.image}
                                alt={ev.name}
                                className="w-full h-full object-cover opacity-85 hover:scale-105 transition duration-500"
                              />
                              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-volt-500 text-ink">
                                {ev.badge}
                              </div>
                              <div className="absolute bottom-3 right-4 px-3 py-1 rounded-lg bg-obsidian/90 border border-line font-mono text-lg font-bold text-ink">
                                {formatPeso(ev.price)}
                              </div>
                            </div>
                            <div className="p-6 sm:p-7 space-y-5">
                              <div>
                                <div className="text-xs font-mono text-volt-400 uppercase">
                                  {ev.tagline}
                                </div>
                                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                                  {ev.name}
                                </h3>
                                <p className="text-muted text-sm mt-2 leading-relaxed">
                                  {ev.summary}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">
                                    RANGE
                                  </span>
                                  <span className="text-volt-400 font-medium">
                                    {ev.specs.Range}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">
                                    TOP SPEED &amp; ACCEL
                                  </span>
                                  <span className="text-ink font-medium">
                                    {ev.specs['Top Speed']}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">
                                    BATTERY CAPACITY
                                  </span>
                                  <span className="text-ink font-medium">
                                    {ev.specs['Battery Capacity']}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-obsidian/70 border border-line">
                                  <span className="text-[10px] text-muted block">
                                    Configurations
                                  </span>
                                  <span className="text-ink font-medium">
                                    {ev.specs.Configurations}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="px-6 pb-6 sm:px-7 sm:pb-7 flex items-center gap-3">
                            <button
                              onClick={() => addToCart(ev.id, 0)}
                              className="flex-1 py-3.5 px-4 rounded-xl bg-volt-500 hover:bg-volt-400 text-ink font-display font-semibold text-sm transition flex items-center justify-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add to Cart — {formatPeso(ev.price)}</span>
                            </button>
                            <button
                              onClick={() => inquireProduct(ev)}
                              className="py-3.5 px-4 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-volt-400 transition"
                            >
                              Inquire
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUpgradeIdx(0);
                                setSpecModalProduct(ev);
                              }}
                              className="py-3.5 px-4 rounded-xl bg-mist hover:bg-mist border border-line text-xs font-mono text-muted transition"
                            >
                              Specs
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-carbon border border-line text-center text-muted font-mono text-sm">
                      No electric vehicles match &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==========================================
            PAGE 3: CONTACT & SHOWROOMS
            ========================================== */}
        {activePage === 'contact' && (
          <section className="page-transition py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <span className="font-mono text-xs uppercase tracking-widest text-volt-400 block mb-2">
                  // 03 — DIRECT CONCIERGE &amp; FLEET INTAKE
                </span>
                <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink">
                  Connect With Engineering &amp; Sales
                </h1>
                <p className="text-muted text-sm sm:text-base mt-3">
                  Whether you need technical support for your Aether workstation, showroom
                  telemetry consultations, or corporate fleet provisioning, our specialists
                  respond within 2 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left: Dual-Purpose Interactive Intake Form */}
                <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-line">
                  <div className="mb-8">
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3">
                      Select Inquiry Channel
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-obsidian border border-line">
                      <button
                        type="button"
                        onClick={() => setContactMode('support')}
                        className={`py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                          contactMode === 'support'
                            ? 'bg-cyber-500 text-ink font-semibold'
                            : 'text-muted hover:text-ink'
                        }`}
                      >
                        <LifeBuoy className="w-4 h-4" />
                        General &amp; Tech Support
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactMode('corporate')}
                        className={`py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                          contactMode === 'corporate'
                            ? 'bg-volt-500 text-ink font-semibold'
                            : 'text-muted hover:text-ink'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        Corporate Sales &amp; Fleet
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase text-muted mb-2">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, name: e.target.value })
                          }
                          placeholder="Dr. Elena Vance"
                          className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink placeholder-slate-500 focus:outline-none focus:border-cyber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-muted mb-2">
                          Work or Personal Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                          placeholder="elena.vance@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink placeholder-slate-500 focus:outline-none focus:border-cyber-400"
                        />
                      </div>
                    </div>

                    {contactMode === 'support' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono uppercase text-muted mb-2">
                            Product Division
                          </label>
                          <select
                            value={contactForm.division}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, division: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink focus:outline-none focus:border-cyber-400"
                          >
                            <option value="Aether Compute (Laptops)">
                              Aether Compute (Laptops)
                            </option>
                            <option value="Volt Mobility (EVs & E-Bikes)">
                              Volt Mobility (EVs &amp; E-Bikes)
                            </option>
                            <option value="Home HyperCharger & Solar">
                              Home HyperCharger &amp; Solar
                            </option>
                            <option value="Order & Delivery Status">
                              Order &amp; Delivery Status
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase text-muted mb-2">
                            Serial / VIN (Optional)
                          </label>
                          <input
                            type="text"
                            value={contactForm.serial}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, serial: e.target.value })
                            }
                            placeholder="e.g. AETH-9941-X or VLT-0082"
                            className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink placeholder-slate-500 focus:outline-none focus:border-cyber-400"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono uppercase text-muted mb-2">
                            Organization / Company *
                          </label>
                          <input
                            required
                            type="text"
                            value={contactForm.company}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, company: e.target.value })
                            }
                            placeholder="Hyperion Robotics Inc."
                            className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink placeholder-slate-500 focus:outline-none focus:border-volt-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase text-muted mb-2">
                            Estimated Fleet / Unit Volume
                          </label>
                          <select
                            value={contactForm.volume}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, volume: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink focus:outline-none focus:border-volt-400"
                          >
                            <option value="10 - 50 Units (Compute / EV)">
                              10 – 50 Units (Compute / EV)
                            </option>
                            <option value="50 - 250 Units">50 – 250 Units</option>
                            <option value="250+ Enterprise Global Agreement">
                              250+ Enterprise Global Agreement
                            </option>
                            <option value="Custom Government / Research Spec">
                              Custom Government / Research Spec
                            </option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-2">
                        Preferred Flagship Showroom
                      </label>
                      <select
                        value={contactForm.showroom}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, showroom: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink focus:outline-none focus:border-cyber-400"
                      >
                        <option value="Manila — BGC High Street Flagship Hub">
                          Manila — BGC High Street Flagship Hub
                        </option>
                        <option value="Cebu — IT Park Mobility & Compute Atelier">
                          Cebu — IT Park Mobility &amp; Compute Atelier
                        </option>
                        <option value="Tokyo — Shibuya Sky Telemetry Lounge">
                          Tokyo — Shibuya Sky Telemetry Lounge
                        </option>
                        <option value="Remote / Digital Concierge">
                          Remote / Digital Concierge
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-2">
                        Inquiry Details &amp; Technical Requirements *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, message: e.target.value })
                        }
                        placeholder="Describe your custom workstation configuration, EV delivery preferences, or enterprise deployment timeline..."
                        className="w-full px-4 py-3 rounded-xl bg-obsidian/90 border border-line text-sm text-ink placeholder-slate-500 focus:outline-none focus:border-cyber-400"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-xs font-mono text-muted">
                        Encrypted TLS 1.3 Dispatch • Avg Response:{' '}
                        <span className="text-volt-400">14 mins</span>
                      </p>
                      <button
                        type="submit"
                        className="px-8 py-4 rounded-xl bg-volt-500 hover:opacity-95 text-ink font-display font-bold text-sm tracking-wide transition shadow-lg"
                      >
                        Transmit Dispatch &rarr;
                      </button>
                    </div>
                  </form>

                  {/* Instant Submission Receipt Box */}
                  {contactReceipt && (
                    <div className="mt-6 p-6 rounded-2xl bg-volt-500/10 border border-volt-500/30 text-sm space-y-2 page-transition">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-volt-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          DISPATCH TRANSMITTED — TICKET #{contactReceipt.ticketId}
                        </span>
                        <span className="text-xs font-mono text-muted">
                          SLA: &lt; 2 HOURS
                        </span>
                      </div>
                      <p className="text-muted">
                        Thank you, <strong className="text-ink">{contactReceipt.name}</strong>
                        . Your{' '}
                        {contactReceipt.mode === 'support'
                          ? 'Technical Support'
                          : 'Corporate Fleet & Sales'}{' '}
                        dossier has been routed to{' '}
                        <strong className="text-ink">{contactReceipt.showroom}</strong>. A
                        confirmation packet has been sent to{' '}
                        <span className="font-mono text-cyber-400">
                          {contactReceipt.email}
                        </span>
                        .
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Contact Info Card & Physical Showrooms */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="glass-panel rounded-3xl p-7 border border-line space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-widest text-cyber-400">
                        DIRECT CHANNELS
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-volt-400">
                        <span className="w-2 h-2 rounded-full bg-volt-400 animate-ping" />
                        ENGINEERS ONLINE
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-obsidian/70 border border-line">
                        <div className="text-xs font-mono text-muted">
                          LAPTOP &amp; SILICON SUPPORT
                        </div>
                        <div className="font-mono text-sm text-ink font-semibold mt-0.5">
                          compute-care@aeronet.corp
                        </div>
                        <div className="text-xs text-muted mt-1">
                          +63 (2) 8940-AETH • Ext. 101
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-obsidian/70 border border-line">
                        <div className="text-xs font-mono text-muted">
                          EV CONCIERGE &amp; FLEET SALES
                        </div>
                        <div className="font-mono text-sm text-ink font-semibold mt-0.5">
                          mobility-fleet@aeronet.corp
                        </div>
                        <div className="text-xs text-muted mt-1">
                          +63 (2) 8940-VOLT • Ext. 204
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-line">
                      <div className="text-xs font-mono uppercase text-muted mb-2">
                        OPERATING HOURS
                      </div>
                      <div className="flex justify-between text-xs text-muted py-1">
                        <span>Mon – Fri (Showrooms &amp; Sales)</span>
                        <span className="font-mono text-ink">08:00 – 21:00 PHT</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted py-1">
                        <span>Sat – Sun (Showroom Viewings)</span>
                        <span className="font-mono text-ink">09:00 – 19:00 PHT</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted py-1">
                        <span>Telemetry &amp; Roadside Dispatch</span>
                        <span className="font-mono text-volt-400">24 / 7 / 365</span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Showroom Addresses */}
                  <div className="glass-panel rounded-3xl p-7 border border-line space-y-5">
                    <span className="text-xs font-mono uppercase tracking-widest text-volt-400 block">
                      FLAGSHIP ATELIERS
                    </span>

                    <div className="space-y-4">
                      <div className="border-l-2 border-cyber-400 pl-4">
                        <h4 className="font-display font-bold text-ink text-sm">
                          MANILA // BGC FLAGSHIP HUB
                        </h4>
                        <p className="text-xs text-muted mt-1">
                          5th Avenue cor. 28th St, Bonifacio Global City, Taguig, Metro Manila
                        </p>
                        <p className="text-[11px] font-mono text-cyber-400 mt-1">
                          600kW HyperCharger Plaza + Compute Lab
                        </p>
                      </div>

                      <div className="border-l-2 border-volt-400 pl-4">
                        <h4 className="font-display font-bold text-ink text-sm">
                          CEBU // VISAYAS PROPULSION STUDIO
                        </h4>
                        <p className="text-xs text-muted mt-1">
                          Abad St, Cebu IT Park, Apas, Cebu City, 6000 Cebu
                        </p>
                        <p className="text-[11px] font-mono text-volt-400 mt-1">
                          EV Delivery Center &amp; Silicon Care Lounge
                        </p>
                      </div>

                      <div className="border-l-2 border-line pl-4">
                        <h4 className="font-display font-bold text-ink text-sm">
                          TOKYO // APAC DESIGN STUDIO
                        </h4>
                        <p className="text-xs text-muted mt-1">
                          2-24-12 Shibuya, Shibuya-ku, Tokyo 150-6139, Japan
                        </p>
                        <p className="text-[11px] font-mono text-muted mt-1">
                          Custom Anodizing &amp; Bespoke Cabin Studio
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ==========================================
          SLIDE-OVER CART & ORDERS DRAWER
          ========================================== */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-carbon border-l border-line z-50 transform transition-transform duration-300 flex flex-col justify-between ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-line flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyber-400 block">
              ACTIVE CONFIGURATION (PHP ₱)
            </span>
            <h3 className="font-display text-xl font-bold text-ink">
              Your Cart &amp; Orders
            </h3>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="p-2 rounded-lg bg-mist hover:bg-mist text-muted hover:text-ink"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-muted space-y-3">
              <ShoppingBag className="w-10 h-10 text-muted" />
              <p className="font-mono text-xs uppercase">Your Cart is Empty</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigateTo('products');
                }}
                className="text-xs font-mono text-cyber-400 underline"
              >
                Explore Laptops &amp; Electric Vehicles
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                className="p-4 rounded-2xl bg-obsidian/90 border border-line flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      item.category === 'ev'
                        ? 'bg-volt-500/20 text-volt-400'
                        : 'bg-cyber-500/20 text-cyber-400'
                    }`}
                  >
                    {item.category === 'ev' ? 'ELECTRIC VEHICLE' : 'LAPTOP'}
                  </span>
                  <h4 className="font-display font-bold text-ink text-sm pt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono text-muted">{item.subtitle}</p>
                  <div className="font-mono text-sm font-semibold text-ink pt-1">
                    {formatPeso(item.unitPrice * item.qty)}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-carbon px-2 py-1 rounded-lg border border-line">
                  <button
                    onClick={() => updateCartQty(idx, -1)}
                    className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs text-ink w-5 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateCartQty(idx, 1)}
                    className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-line bg-obsidian/80 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>INSURED EXPRESS LOGISTICS</span>
            <span className="text-volt-400">COMPLIMENTARY</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">Total Amount (PHP)</span>
            <span className="font-mono text-2xl font-bold text-ink">
              {formatPeso(totalCartCost)}
            </span>
          </div>
          <button
            onClick={checkoutOrder}
            className="w-full py-4 rounded-xl bg-volt-500 text-ink font-display font-bold text-sm tracking-wide hover:opacity-95 transition"
          >
            Complete Order
          </button>
        </div>
      </aside>

      {/* ==========================================
          MODAL: DETAILED TECHNICAL SPEC & CONFIGURATOR
          ========================================== */}
      {specModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-line relative page-transition">
            <button
              onClick={() => setSpecModalProduct(null)}
              aria-label="Close product details"
              className="absolute top-5 right-5 p-2 rounded-lg bg-mist hover:bg-mist text-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <img
                src={specModalProduct.image}
                alt={specModalProduct.name}
                className="w-full sm:w-40 h-28 object-cover rounded-2xl border border-line"
              />
              <div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                    specModalProduct.category === 'laptop'
                      ? 'bg-cyber-500 text-ink'
                      : 'bg-volt-500 text-ink'
                  }`}
                >
                  {specModalProduct.badge}
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-2">
                  {specModalProduct.name}
                </h3>
                <p className="text-xs font-mono text-muted">
                  {specModalProduct.tagline} — Base {formatPeso(specModalProduct.price)}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted mt-5 leading-relaxed">
              {specModalProduct.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {Object.entries(specModalProduct.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="p-3.5 rounded-xl bg-obsidian/90 border border-line"
                >
                  <div className="text-[10px] font-mono uppercase text-muted">
                    {key}
                  </div>
                  <div className="text-xs font-mono text-ink font-semibold mt-1">
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {specModalProduct.upgrades && (
              <div className="mt-5">
                <label className="block text-xs font-mono uppercase text-muted mb-2">
                  Select Factory Tier / Trim
                </label>
                <select
                  value={selectedUpgradeIdx}
                  onChange={(e) => setSelectedUpgradeIdx(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian border border-line text-xs font-mono text-ink focus:outline-none focus:border-cyber-400"
                >
                  {specModalProduct.upgrades.map((u, idx) => (
                    <option key={u.label} value={idx}>
                      {u.label} {u.delta > 0 ? `(+${formatPeso(u.delta)})` : '(Included)'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-line flex justify-end gap-3">
              <button
                onClick={() => setSpecModalProduct(null)}
                className="px-5 py-2.5 rounded-xl bg-mist text-xs font-mono text-muted hover:text-ink"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToCart(specModalProduct.id, selectedUpgradeIdx);
                  setSpecModalProduct(null);
                }}
                className={`px-6 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-ink ${
                  specModalProduct.category === 'laptop'
                    ? 'bg-cyber-500 hover:bg-cyber-400'
                    : 'bg-volt-500 hover:bg-volt-400'
                }`}
              >
                Add Configured Build —{' '}
                {formatPeso(
                  specModalProduct.price +
                    (specModalProduct.upgrades?.[selectedUpgradeIdx]?.delta || 0)
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TOAST NOTIFICATIONS
          ========================================== */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`glass-panel px-4 py-3 rounded-xl border ${
              t.accent === 'volt' ? 'border-volt-500/50' : 'border-cyber-500/50'
            } shadow-2xl flex items-center gap-3 text-xs font-mono text-ink pointer-events-auto page-transition`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                t.accent === 'volt' ? 'bg-volt-400' : 'bg-cyber-400'
              }`}
            />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className="border-t border-line bg-obsidian py-12 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-volt-500 border border-line flex items-center justify-center">
              <Zap className="w-4 h-4 text-ink" />
            </div>
            <span className="font-display font-bold tracking-wider text-sm text-ink">
              AERONET<span className="text-cyber-400">//</span>CORPORATION
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-mono text-muted">
            <button onClick={() => navigateTo('home')} className="hover:text-ink transition">
              HOME
            </button>
            <button
              onClick={() => openCatalogWithCategory('laptop')}
              className="hover:text-cyber-400 transition"
            >
              1. LAPTOPS
            </button>
            <button
              onClick={() => openCatalogWithCategory('ev')}
              className="hover:text-volt-400 transition"
            >
              2. ELECTRIC VEHICLES
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-ink transition"
            >
              SHOWROOMS &amp; SUPPORT
            </button>
          </div>

          <p className="text-xs font-mono text-muted">
            &copy; 2026 AERONET CORPORATION. ALL TELEMETRY VERIFIED.
          </p>
        </div>
      </footer>
    </div>
  );
}
