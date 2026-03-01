/* ─────────────────────────────────────────────
   CATEGORIES
───────────────────────────────────────────── */
export interface Category {
  id: string
  slug: string
  key: string
  nameAz: string
  nameEn: string
  nameRu: string
  image: string
}

export function getCategoryName(cat: Category, lang: 'az' | 'en' | 'ru'): string {
  if (lang === 'az') return cat.nameAz
  if (lang === 'ru') return cat.nameRu
  return cat.nameEn
}

export const categories: Category[] = [
  {
    id: 'hair-care', slug: 'hair-care', key: 'hairCare',
    nameAz: 'Saç Baxımı', nameEn: 'Hair Care', nameRu: 'Уход за волосами',
    image: 'https://placehold.co/500x600?text=Luxury+Hair+Care+Products+Gold+Bottles+Dark+Elegant',
  },
  {
    id: 'nail-care', slug: 'nail-care', key: 'nailCare',
    nameAz: 'Dırnak Baxımı', nameEn: 'Nail Care', nameRu: 'Уход за ногтями',
    image: 'https://placehold.co/500x600?text=Nail+Care+Gel+Polish+UV+Lamp+Pink+Beige+Tones',
  },
  {
    id: 'face-care', slug: 'face-care', key: 'faceCare',
    nameAz: 'Üz Baxımı', nameEn: 'Face Care', nameRu: 'Уход за лицом',
    image: 'https://placehold.co/500x600?text=Face+Care+Serum+Cream+Elegant+Skincare+Flatlay',
  },
  {
    id: 'makeup', slug: 'makeup', key: 'makeup',
    nameAz: 'Makiyaj', nameEn: 'Makeup', nameRu: 'Макияж',
    image: 'https://placehold.co/500x600?text=Professional+Makeup+Brushes+Palettes+Gold+Luxury',
  },
  {
    id: 'cosmetology-devices', slug: 'cosmetology-devices', key: 'cosmetologyDevices',
    nameAz: 'Kosmetologiya Cihazları', nameEn: 'Cosmetology Devices', nameRu: 'Косметологические аппараты',
    image: 'https://placehold.co/500x600?text=Professional+Cosmetology+RF+Facial+Devices+White+Medical',
  },
  {
    id: 'laser-equipment', slug: 'laser-equipment', key: 'laserEquipment',
    nameAz: 'Lazer Avadanlığı', nameEn: 'Laser Equipment', nameRu: 'Лазерное оборудование',
    image: 'https://placehold.co/500x600?text=Professional+Laser+Hair+Removal+Device+Medical+Grade',
  },
  {
    id: 'professional-tools', slug: 'professional-tools', key: 'professionalTools',
    nameAz: 'Peşəkar Alətlər', nameEn: 'Professional Tools', nameRu: 'Профессиональные инструменты',
    image: 'https://placehold.co/500x600?text=Professional+Salon+Tools+Hair+Dryer+Clippers+Black',
  },
]

/* ─────────────────────────────────────────────
   PRODUCT
───────────────────────────────────────────── */
export interface Product {
  id: string
  slug: string
  nameAz: string
  nameEn: string
  nameRu: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  images: string[]
  badge?: 'new' | 'sale' | 'bestseller'
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  descriptionAz?: string
  descriptionEn?: string
  descriptionRu?: string
  tags?: string[]
}

export function getProductName(product: Product, lang: 'az' | 'en' | 'ru'): string {
  if (lang === 'az') return product.nameAz
  if (lang === 'ru') return product.nameRu
  return product.nameEn
}

export function getProductDescription(product: Product, lang: 'az' | 'en' | 'ru'): string {
  if (lang === 'az') return product.descriptionAz ?? ''
  if (lang === 'ru') return product.descriptionRu ?? ''
  return product.descriptionEn ?? ''
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export const products: Product[] = [
  // ── HAIR CARE ──────────────────────────────────────────
  {
    id: 'hc-001',
    slug: 'loreal-absolut-repair-shampoo',
    nameAz: 'L\'Oréal Absolut Repair Şampuanı',
    nameEn: 'L\'Oréal Absolut Repair Shampoo',
    nameRu: 'Шампунь L\'Oréal Absolut Repair',
    brand: 'L\'Oréal Professionnel',
    category: 'hair-care',
    price: 38,
    originalPrice: 52,
    images: [
      'https://placehold.co/600x800?text=Gold+luxury+hair+repair+shampoo+bottle+with+dark+background',
      'https://placehold.co/600x800?text=Shampoo+texture+close+up+creamy+white+formula',
    ],
    badge: 'sale',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 18,
    descriptionAz: 'Zədələnmiş saçlar üçün intensiv bərpa formulu. Keratinlə gücləndirilmiş formula saçı dərindən bərpa edir.',
    descriptionEn: 'Intensive repair formula for damaged hair. Keratin-enriched formula deeply restores hair from root to tip.',
    descriptionRu: 'Интенсивный восстанавливающий состав для поврежденных волос. Формула с кератином глубоко восстанавливает волосы.',
    tags: ['shampoo', 'repair', 'keratin'],
  },
  {
    id: 'hc-002',
    slug: 'wella-professionals-oil-reflections',
    nameAz: 'Wella Oil Reflections Maska',
    nameEn: 'Wella Oil Reflections Hair Mask',
    nameRu: 'Маска Wella Oil Reflections',
    brand: 'Wella Professionals',
    category: 'hair-care',
    price: 45,
    images: [
      'https://placehold.co/600x800?text=Elegant+white+hair+mask+jar+with+gold+lid+luxury+beauty',
      'https://placehold.co/600x800?text=Rich+creamy+hair+mask+texture+warm+lighting',
    ],
    badge: 'bestseller',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 12,
    descriptionEn: 'Luminous smoothness and brilliant shine. White tea and camellia oil formula.',
    descriptionAz: 'Parlaq hamar görünüş və inanılmaz parlaqlıq. Ağ çay və kameliya yağı formulası.',
    descriptionRu: 'Сияющая гладкость и блеск. Формула с белым чаем и маслом камелии.',
  },
  {
    id: 'hc-003',
    slug: 'schwarzkopf-bc-color-freeze',
    nameAz: 'Schwarzkopf BC Color Freeze Şampuanı',
    nameEn: 'Schwarzkopf BC Color Freeze Shampoo',
    nameRu: 'Шампунь Schwarzkopf BC Color Freeze',
    brand: 'Schwarzkopf Professional',
    category: 'hair-care',
    price: 34,
    images: [
      'https://placehold.co/600x800?text=Purple+professional+color+protect+shampoo+bottle',
      'https://placehold.co/600x800?text=Vibrant+violet+shampoo+formula+splash',
    ],
    badge: 'new',
    rating: 4.7,
    reviewCount: 67,
    inStock: true,
    stockCount: 25,
    descriptionEn: 'Anti-fade formula protects color-treated hair. Keeps color vibrant up to 8 weeks.',
    descriptionAz: 'Rənglənmiş saçlar üçün anti-solma formulası. Rəngi 8 həftəyə qədər canlı saxlayır.',
    descriptionRu: 'Формула против выцветания защищает окрашенные волосы. Сохраняет цвет ярким до 8 недель.',
  },
  {
    id: 'hc-004',
    slug: 'kerastase-elixir-ultime',
    nameAz: 'Kérastase Elixir Ultime Yağ',
    nameEn: 'Kérastase Elixir Ultime Hair Oil',
    nameRu: 'Масло Kérastase Elixir Ultime',
    brand: 'Kérastase',
    category: 'hair-care',
    price: 72,
    originalPrice: 88,
    images: [
      'https://placehold.co/600x800?text=Premium+gold+hair+serum+oil+bottle+black+background+luxury',
      'https://placehold.co/600x800?text=Glistening+hair+oil+dropper+warm+amber+glow',
    ],
    badge: 'sale',
    rating: 5.0,
    reviewCount: 201,
    inStock: true,
    stockCount: 9,
    descriptionEn: 'Multi-benefit sublimating oil that nourishes, softens and illuminates all hair types.',
    descriptionAz: 'Bütün saç növlərini qidalandıran, yumşaldان və parlatandan çox yönlü yağ.',
    descriptionRu: 'Многофункциональное масло для питания, смягчения и придания блеска всем типам волос.',
  },

  // ── NAIL CARE ──────────────────────────────────────────
  {
    id: 'nc-001',
    slug: 'opi-nail-lacquer-bubble-bath',
    nameAz: 'OPI Nail Lacquer – Bubble Bath',
    nameEn: 'OPI Nail Lacquer – Bubble Bath',
    nameRu: 'Лак OPI Nail Lacquer – Bubble Bath',
    brand: 'OPI',
    category: 'nail-care',
    price: 22,
    images: [
      'https://placehold.co/600x800?text=Soft+pink+nail+polish+bottle+OPI+luxury+beauty',
      'https://placehold.co/600x800?text=Sheer+blush+pink+nail+color+on+elegant+hand',
    ],
    badge: 'bestseller',
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    stockCount: 40,
    descriptionEn: 'A sheer pink with just a touch of shimmer. Long-lasting, chip-resistant formula.',
    descriptionAz: 'Minimal parıltı ilə şeffaf çəhrayı rəng. Uzun müddətli, çat atmayan formula.',
    descriptionRu: 'Прозрачный розовый с легким мерцанием. Стойкая формула без сколов.',
  },
  {
    id: 'nc-002',
    slug: 'cnd-shellac-gel-system',
    nameAz: 'CND Shellac Gel Sistemi',
    nameEn: 'CND Shellac Gel System',
    nameRu: 'Гель-система CND Shellac',
    brand: 'CND',
    category: 'nail-care',
    price: 58,
    originalPrice: 74,
    images: [
      'https://placehold.co/600x800?text=Professional+gel+nail+system+kit+white+and+gold+packaging',
      'https://placehold.co/600x800?text=Glossy+gel+nail+application+professional+result',
    ],
    badge: 'sale',
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    stockCount: 15,
    descriptionEn: 'Professional 14+ day gel manicure system. No damage, no filing. Gel-like shine with chip-free wear.',
    descriptionAz: 'Peşəkar 14+ günlük gel manikür sistemi. Zərərsiz, əyləcsiz tətbiq.',
    descriptionRu: 'Профессиональный гель-маникюр на 14+ дней. Без повреждений и подпиливания.',
  },
  {
    id: 'nc-003',
    slug: 'nailperfect-led-lamp',
    nameAz: 'NailPerfect LED/UV Lampa 48W',
    nameEn: 'NailPerfect LED/UV Lamp 48W',
    nameRu: 'LED/UV лампа NailPerfect 48W',
    brand: 'NailPerfect',
    category: 'nail-care',
    price: 95,
    images: [
      'https://placehold.co/600x800?text=Sleek+white+professional+LED+UV+nail+cure+lamp+salon',
      'https://placehold.co/600x800?text=Nail+lamp+glowing+blue+LED+light+professional',
    ],
    badge: 'new',
    rating: 4.6,
    reviewCount: 55,
    inStock: true,
    stockCount: 8,
    descriptionEn: '48W professional LED/UV lamp compatible with all gel polish brands. 30s fast cure.',
    descriptionAz: 'Bütün gel lak markaları ilə uyğun 48W peşəkar LED/UV lampa. 30 saniyə sürətli qurutma.',
    descriptionRu: '48W профессиональная LED/UV лампа, совместимая со всеми брендами гель-лаков. Быстрое отверждение за 30с.',
  },

  // ── FACE CARE ──────────────────────────────────────────
  {
    id: 'fc-001',
    slug: 'la-roche-posay-cicaplast',
    nameAz: 'La Roche-Posay Cicaplast Baume',
    nameEn: 'La Roche-Posay Cicaplast Baume B5',
    nameRu: 'Бальзам La Roche-Posay Cicaplast B5',
    brand: 'La Roche-Posay',
    category: 'face-care',
    price: 29,
    images: [
      'https://placehold.co/600x800?text=White+clinical+skin+repair+balm+tube+with+blue+cap',
      'https://placehold.co/600x800?text=Dermatological+skin+balm+texture+smooth+white',
    ],
    badge: 'bestseller',
    rating: 4.9,
    reviewCount: 445,
    inStock: true,
    stockCount: 60,
    descriptionEn: 'Multi-purpose repairing balm for dry and irritated skin. Soothes and protects.',
    descriptionAz: 'Quru və qıcıqlanmış dəri üçün çox amaçlı bərpa balzamı.',
    descriptionRu: 'Многофункциональный восстанавливающий бальзам для сухой и раздраженной кожи.',
  },
  {
    id: 'fc-002',
    slug: 'vichy-mineral-89-serum',
    nameAz: 'Vichy Mineral 89 Serum',
    nameEn: 'Vichy Mineral 89 Serum',
    nameRu: 'Сыворотка Vichy Mineral 89',
    brand: 'Vichy',
    category: 'face-care',
    price: 47,
    originalPrice: 60,
    images: [
      'https://placehold.co/600x800?text=Transparent+glass+serum+bottle+volcanic+mineral+formula',
      'https://placehold.co/600x800?text=Serum+drops+skin+hydration+close+up+clear+formula',
    ],
    badge: 'sale',
    rating: 4.7,
    reviewCount: 289,
    inStock: true,
    stockCount: 22,
    descriptionEn: '89% Vichy mineralizing water + hyaluronic acid. Fortifies and plumps skin daily.',
    descriptionAz: '89% Vichy minerallaşdırıcı su + hialuron turşusu. Dərini gündəlik möhkəmləndirir.',
    descriptionRu: '89% минерализующая вода Vichy + гиалуроновая кислота. Укрепляет и увлажняет кожу.',
  },

  // ── MAKEUP ──────────────────────────────────────────
  {
    id: 'mk-001',
    slug: 'charlotte-tilbury-magic-cream',
    nameAz: 'Charlotte Tilbury Magic Cream',
    nameEn: 'Charlotte Tilbury Magic Cream',
    nameRu: 'Крем Charlotte Tilbury Magic Cream',
    brand: 'Charlotte Tilbury',
    category: 'makeup',
    price: 89,
    images: [
      'https://placehold.co/600x800?text=Gold+luxury+magic+moisturiser+cream+jar+with+rose+gold+lid',
      'https://placehold.co/600x800?text=Rich+creamy+face+moisturiser+texture+close+up+gold',
    ],
    badge: 'new',
    rating: 4.9,
    reviewCount: 667,
    inStock: true,
    stockCount: 14,
    descriptionEn: 'Famous magic moisturiser used by celebrities worldwide. Transforms skin instantly.',
    descriptionAz: 'Dünya üzrə məşhurlar tərəfindən istifadə edilən sehrli nəmləndirici. Dərini anında çevrir.',
    descriptionRu: 'Знаменитый крем, которым пользуются знаменитости по всему миру. Мгновенное преображение кожи.',
  },
  {
    id: 'mk-002',
    slug: 'nars-radiant-creamy-concealer',
    nameAz: 'NARS Radiant Creamy Korrektoru',
    nameEn: 'NARS Radiant Creamy Concealer',
    nameRu: 'Консилер NARS Radiant Creamy',
    brand: 'NARS',
    category: 'makeup',
    price: 54,
    originalPrice: 66,
    images: [
      'https://placehold.co/600x800?text=Matte+black+luxury+concealer+stick+with+gold+NARS+branding',
      'https://placehold.co/600x800?text=Concealer+swatches+on+skin+multiple+shades+neutral',
    ],
    badge: 'sale',
    rating: 4.8,
    reviewCount: 502,
    inStock: true,
    stockCount: 30,
    descriptionEn: 'Full coverage creamy concealer that brightens and conceals. 16 shades available.',
    descriptionAz: 'Parlaq və gizlədici dolu örtüklü kremli korrektoru. 16 çalarlı mövcuddur.',
    descriptionRu: 'Кремовый консилер с полным покрытием для яркости и маскировки. 16 оттенков.',
  },

  // ── COSMETOLOGY DEVICES ──────────────────────────────────────────
  {
    id: 'cd-001',
    slug: 'hifu-ultrasound-lifting-device',
    nameAz: 'HIFU Ultrasəs Lifting Cihazı',
    nameEn: 'HIFU Ultrasound Lifting Device',
    nameRu: 'HIFU ультразвуковой аппарат для лифтинга',
    brand: 'MedLift Pro',
    category: 'cosmetology-devices',
    price: 1250,
    originalPrice: 1500,
    images: [
      'https://placehold.co/600x800?text=Professional+white+HIFU+ultrasound+facial+lifting+machine',
      'https://placehold.co/600x800?text=HIFU+device+treatment+cartridges+and+handpiece+display',
    ],
    badge: 'sale',
    rating: 4.8,
    reviewCount: 43,
    inStock: true,
    stockCount: 5,
    descriptionEn: 'Professional HIFU machine for non-invasive face and body lifting. 3 cartridges included.',
    descriptionAz: 'Qeyri-invaziv üz və bədən liftinqi üçün peşəkar HIFU cihazı. 3 kartric daxildir.',
    descriptionRu: 'Профессиональный HIFU аппарат для неинвазивного лифтинга лица и тела. Включены 3 картриджа.',
  },
  {
    id: 'cd-002',
    slug: 'rf-radio-frequency-machine',
    nameAz: 'RF Radio Frequency Cihazı',
    nameEn: 'RF Radio Frequency Machine',
    nameRu: 'RF аппарат радиочастотный',
    brand: 'SalonTech',
    category: 'cosmetology-devices',
    price: 780,
    images: [
      'https://placehold.co/600x800?text=Sleek+professional+RF+radio+frequency+beauty+machine+silver',
      'https://placehold.co/600x800?text=RF+machine+touchscreen+display+treatment+settings',
    ],
    badge: 'new',
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    stockCount: 7,
    descriptionEn: 'Multi-polar RF technology for skin tightening and body contouring. Adjustable energy levels.',
    descriptionAz: 'Dəri gərginləşdirmə və bədən konturu üçün çox qütblü RF texnologiyası.',
    descriptionRu: 'Многополярная RF технология для подтяжки кожи и коррекции тела. Регулируемые уровни энергии.',
  },

  // ── LASER EQUIPMENT ──────────────────────────────────────────
  {
    id: 'le-001',
    slug: 'diode-laser-hair-removal-808nm',
    nameAz: 'Diode Lazer Tük Alma 808nm',
    nameEn: 'Diode Laser Hair Removal 808nm',
    nameRu: 'Диодный лазер для удаления волос 808нм',
    brand: 'LaserPro Elite',
    category: 'laser-equipment',
    price: 4500,
    originalPrice: 5200,
    images: [
      'https://placehold.co/600x800?text=Professional+diode+laser+hair+removal+machine+white+salon',
      'https://placehold.co/600x800?text=Laser+handpiece+treatment+on+smooth+skin+closeup',
    ],
    badge: 'sale',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    stockCount: 3,
    descriptionEn: '808nm diode laser for permanent hair removal. Triple wavelength 755+808+1064nm. 10M shots.',
    descriptionAz: 'Daimi tük alma üçün 808nm diode lazer. Üçlü dalğa uzunluğu 755+808+1064nm. 10M atış.',
    descriptionRu: 'Диодный лазер 808нм для постоянного удаления волос. Тройная длина волны 755+808+1064нм. 10M вспышек.',
  },

  // ── PROFESSIONAL TOOLS ──────────────────────────────────────────
  {
    id: 'pt-001',
    slug: 'wahl-professional-hair-clipper',
    nameAz: 'Wahl Peşəkar Saç Kəsmə Maşını',
    nameEn: 'Wahl Professional Hair Clipper',
    nameRu: 'Профессиональная машинка Wahl',
    brand: 'Wahl',
    category: 'professional-tools',
    price: 185,
    images: [
      'https://placehold.co/600x800?text=Black+professional+barber+hair+clipper+wahl+chrome+trim',
      'https://placehold.co/600x800?text=Hair+clipper+blades+close+up+sharp+chrome+barber',
    ],
    badge: 'bestseller',
    rating: 4.9,
    reviewCount: 134,
    inStock: true,
    stockCount: 20,
    descriptionEn: 'Professional corded hair clipper with precision blades. Includes 4 guide combs.',
    descriptionAz: 'Dəqiq bıçaqlarla peşəkar kabelli saç kəsmə maşını. 4 aparıcı darama daxildir.',
    descriptionRu: 'Профессиональная проводная машинка с точными лезвиями. Включены 4 гребня-насадки.',
  },
  {
    id: 'pt-002',
    slug: 'dyson-supersonic-hair-dryer',
    nameAz: 'Dyson Supersonic Saç Quruducu',
    nameEn: 'Dyson Supersonic Hair Dryer',
    nameRu: 'Фен Dyson Supersonic',
    brand: 'Dyson',
    category: 'professional-tools',
    price: 620,
    originalPrice: 720,
    images: [
      'https://placehold.co/600x800?text=Premium+Dyson+Supersonic+hair+dryer+fuchsia+nickel+luxury',
      'https://placehold.co/600x800?text=Dyson+hair+dryer+professional+attachments+accessories',
    ],
    badge: 'sale',
    rating: 4.9,
    reviewCount: 388,
    inStock: true,
    stockCount: 11,
    descriptionEn: 'Engineered for different hair types. Fast drying with intelligent heat control.',
    descriptionAz: 'Fərqli saç növləri üçün mühəndislik edilmiş. Ağıllı istilik nəzarəti ilə sürətli qurutma.',
    descriptionRu: 'Разработан для разных типов волос. Быстрая сушка с интеллектуальным контролем тепла.',
  },
]
