export interface Product {
  id: string
  name: string
  nameAz: string
  nameRu: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  descriptionAz: string
  descriptionRu: string
  inStock: boolean
  stockCount: number
  isNew?: boolean
  isBestSeller?: boolean
  isFeatured?: boolean
  badge?: string
  specs?: Record<string, string>
}

export const categories = [
  { id: 'hair-care', slug: 'hair-care', key: 'hairCare', icon: '✦' },
  { id: 'nail-care', slug: 'nail-care', key: 'nailCare', icon: '✦' },
  { id: 'cosmetology', slug: 'cosmetology', key: 'cosmetologyDevices', icon: '✦' },
  { id: 'makeup', slug: 'makeup', key: 'makeup', icon: '✦' },
  { id: 'face-care', slug: 'face-care', key: 'faceCare', icon: '✦' },
  { id: 'laser', slug: 'laser', key: 'laserEquipment', icon: '✦' },
  { id: 'professional', slug: 'professional', key: 'professionalTools', icon: '✦' },
]

export const megaMenuData = [
  {
    key: 'hairCare',
    slug: 'hair-care',
    subs: [
      { key: 'hairTreatment', slug: 'hair-treatment' },
      { key: 'hairColoring', slug: 'hair-coloring' },
      { key: 'keratin', slug: 'keratin' },
      { key: 'bioPerm', slug: 'bio-perm' },
    ],
  },
  {
    key: 'nailCare',
    slug: 'nail-care',
    subs: [
      { key: 'gelPolish', slug: 'gel-polish' },
      { key: 'regularPolish', slug: 'regular-polish' },
      { key: 'shellac', slug: 'shellac' },
      { key: 'nailDevices', slug: 'nail-devices' },
      { key: 'nailStickers', slug: 'nail-stickers' },
      { key: 'nailAccessories', slug: 'nail-accessories' },
    ],
  },
  {
    key: 'cosmetologyDevices',
    slug: 'cosmetology',
    subs: [
      { key: 'facialMachines', slug: 'facial-machines' },
      { key: 'skincareEquipment', slug: 'skincare-equipment' },
      { key: 'beautyDevices', slug: 'beauty-devices' },
    ],
  },
  {
    key: 'makeup',
    slug: 'makeup',
    subs: [
      { key: 'makeupTools', slug: 'makeup-tools' },
      { key: 'makeupProducts', slug: 'makeup-products' },
    ],
  },
  {
    key: 'faceCare',
    slug: 'face-care',
    subs: [
      { key: 'serums', slug: 'serums' },
      { key: 'creams', slug: 'creams' },
      { key: 'masks', slug: 'masks' },
      { key: 'skincaresets', slug: 'skincare-sets' },
    ],
  },
  {
    key: 'laserEquipment',
    slug: 'laser',
    subs: [
      { key: 'laserDevices', slug: 'laser-devices' },
      { key: 'laserAccessories', slug: 'laser-accessories' },
    ],
  },
  {
    key: 'professionalTools',
    slug: 'professional',
    subs: [
      { key: 'salonEquipment', slug: 'salon-equipment' },
      { key: 'sterilization', slug: 'sterilization' },
      { key: 'instruments', slug: 'instruments' },
    ],
  },
]

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Keratin Serum Pro Intensive',
    nameAz: 'Keratin Serum Pro İntensiv',
    nameRu: 'Кератиновая сыворотка Про Интенсив',
    category: 'hair-care',
    subcategory: 'keratin',
    price: 89.5,
    originalPrice: 115.0,
    image: 'https://placehold.co/600x700?text=Luxury+Keratin+Serum+Pro+Intensive+Golden+Bottle+Elegant',
    images: [
      'https://placehold.co/600x700?text=Luxury+Keratin+Serum+Pro+Intensive+Golden+Bottle+Elegant',
      'https://placehold.co/600x700?text=Keratin+Serum+Side+View+Minimalist+White+Background',
      'https://placehold.co/600x700?text=Keratin+Serum+Texture+Close+Up+Glossy+Cream',
    ],
    description: 'Professional keratin serum that deeply nourishes and smooths hair.',
    descriptionAz: 'Saçları dərinlemesine qidalandıran və düzəldən peşəkar keratin serum.',
    descriptionRu: 'Профессиональная кератиновая сыворотка, глубоко питающая и выравнивающая волосы.',
    inStock: true,
    stockCount: 24,
    isBestSeller: true,
    isFeatured: true,
    badge: 'SALE',
    specs: { Volume: '250ml', Type: 'Keratin Treatment', 'Hair Type': 'All types' },
  },
  {
    id: 'p002',
    name: 'UV LED Professional Nail Lamp',
    nameAz: 'UV LED Peşəkar Dırnak Lampası',
    nameRu: 'УФ-LED профессиональная лампа для ногтей',
    category: 'nail-care',
    subcategory: 'nail-devices',
    price: 145.0,
    image: 'https://placehold.co/600x700?text=Professional+UV+LED+Nail+Lamp+White+Sleek+Modern',
    images: [
      'https://placehold.co/600x700?text=Professional+UV+LED+Nail+Lamp+White+Sleek+Modern',
      'https://placehold.co/600x700?text=UV+LED+Lamp+Interior+View+LED+Lights+Purple',
      'https://placehold.co/600x700?text=UV+LED+Lamp+In+Use+Professional+Salon+Setting',
    ],
    description: 'High-performance 48W UV/LED nail curing lamp with smart sensor.',
    descriptionAz: '48W güclü UV/LED dırnak qurutma lampası, ağıllı sensor ilə.',
    descriptionRu: 'Высокопроизводительная 48W УФ/LED лампа для сушки ногтей с умным датчиком.',
    inStock: true,
    stockCount: 12,
    isNew: true,
    isFeatured: true,
    specs: { Wattage: '48W', Timer: '10s/30s/60s', 'Cure Time': '60 seconds' },
  },
  {
    id: 'p003',
    name: 'Vitamin C Radiance Serum',
    nameAz: 'C Vitamini Parlaqlıq Serum',
    nameRu: 'Сыворотка с витамином С для сияния',
    category: 'face-care',
    subcategory: 'serums',
    price: 68.0,
    originalPrice: 85.0,
    image: 'https://placehold.co/600x700?text=Vitamin+C+Radiance+Serum+Glass+Dropper+Bottle+Warm+Tones',
    images: [
      'https://placehold.co/600x700?text=Vitamin+C+Radiance+Serum+Glass+Dropper+Bottle+Warm+Tones',
      'https://placehold.co/600x700?text=Serum+Texture+Drop+Golden+Glow+Close+Up',
      'https://placehold.co/600x700?text=Skincare+Routine+Serum+Application+Soft+Skin',
    ],
    description: 'Brightening vitamin C serum with hyaluronic acid for radiant skin.',
    descriptionAz: 'Parlaq dəri üçün hialuron turşusu ilə C vitamini parlaqlıq serumu.',
    descriptionRu: 'Осветляющая сыворотка с витамином C и гиалуроновой кислотой для сияния кожи.',
    inStock: true,
    stockCount: 35,
    isBestSeller: true,
    isFeatured: true,
    badge: 'SALE',
    specs: { Volume: '30ml', 'Vitamin C': '15%', 'Skin Type': 'All types', SPF: 'No' },
  },
  {
    id: 'p004',
    name: 'Shellac Gel Polish Collection',
    nameAz: 'Shellac Gel Lak Kolleksiyası',
    nameRu: 'Коллекция шеллак гель-лаков',
    category: 'nail-care',
    subcategory: 'shellac',
    price: 38.0,
    image: 'https://placehold.co/600x700?text=Shellac+Gel+Polish+Set+Nude+Pink+Beige+Tones+Elegant',
    images: [
      'https://placehold.co/600x700?text=Shellac+Gel+Polish+Set+Nude+Pink+Beige+Tones+Elegant',
      'https://placehold.co/600x700?text=Individual+Shellac+Bottle+Rose+Gold+Cap+Luxury',
      'https://placehold.co/600x700?text=Nail+Color+Swatches+Nude+Palette+Professional',
    ],
    description: 'Long-lasting shellac gel polish, 3-week wear, chip-free formula.',
    descriptionAz: '3 həftəyə qədər davam edən shellac gel lak, çatlamayan formula.',
    descriptionRu: 'Стойкий шеллак гель-лак, носится 3 недели, формула без сколов.',
    inStock: true,
    stockCount: 50,
    isNew: true,
    specs: { 'Wear Time': '3 weeks', 'Set Count': '12 shades', Finish: 'Glossy' },
  },
  {
    id: 'p005',
    name: 'Deep Hydration Face Cream',
    nameAz: 'Dərin Nəmlənmə Üz Kremi',
    nameRu: 'Крем для лица с глубоким увлажнением',
    category: 'face-care',
    subcategory: 'creams',
    price: 54.0,
    originalPrice: 72.0,
    image: 'https://placehold.co/600x700?text=Luxury+Deep+Hydration+Face+Cream+White+Jar+Gold+Lid',
    images: [
      'https://placehold.co/600x700?text=Luxury+Deep+Hydration+Face+Cream+White+Jar+Gold+Lid',
      'https://placehold.co/600x700?text=Face+Cream+Texture+Whipped+Silky+Soft+White',
      'https://placehold.co/600x700?text=Skincare+Moisturizer+Application+Glowing+Skin',
    ],
    description: 'Intensive 24h hydration cream with ceramides and peptides.',
    descriptionAz: 'Seramidlər və peptidlərlə 24 saatlıq intensiv nəmləndirici krem.',
    descriptionRu: 'Интенсивный крем 24-часового увлажнения с керамидами и пептидами.',
    inStock: true,
    stockCount: 28,
    isBestSeller: true,
    badge: 'SALE',
    specs: { Volume: '50ml', 'Key Ingredients': 'Ceramides, Peptides', 'Skin Type': 'Dry/Normal' },
  },
  {
    id: 'p006',
    name: 'Professional Facial RF Device',
    nameAz: 'Peşəkar Üz RF Cihazı',
    nameRu: 'Профессиональный RF аппарат для лица',
    category: 'cosmetology',
    subcategory: 'facial-machines',
    price: 380.0,
    image: 'https://placehold.co/600x700?text=Professional+RF+Facial+Device+Sleek+Rose+Gold+Medical',
    images: [
      'https://placehold.co/600x700?text=Professional+RF+Facial+Device+Sleek+Rose+Gold+Medical',
      'https://placehold.co/600x700?text=RF+Device+Handpiece+Close+Up+Metal+Tip',
      'https://placehold.co/600x700?text=RF+Facial+Treatment+Professional+Salon+Use',
    ],
    description: 'Professional radiofrequency device for skin tightening and rejuvenation.',
    descriptionAz: 'Dərini gərmək və cavanlaşdırmaq üçün peşəkar radiofrekans cihazı.',
    descriptionRu: 'Профессиональный радиочастотный аппарат для подтяжки и омоложения кожи.',
    inStock: true,
    stockCount: 5,
    isNew: true,
    isFeatured: true,
    specs: { Power: '50W', Frequency: '1MHz', Display: 'LCD', 'Treatment Modes': '5' },
  },
  {
    id: 'p007',
    name: 'Luxury Hyaluronic Moisture Mask',
    nameAz: 'Lüks Hialuronik Nəm Maskası',
    nameRu: 'Люкс гиалуроновая увлажняющая маска',
    category: 'face-care',
    subcategory: 'masks',
    price: 32.0,
    image: 'https://placehold.co/600x700?text=Hyaluronic+Sheet+Mask+Luxury+Packaging+Beige+Minimalist',
    images: [
      'https://placehold.co/600x700?text=Hyaluronic+Sheet+Mask+Luxury+Packaging+Beige+Minimalist',
      'https://placehold.co/600x700?text=Face+Mask+Application+Woman+Glowing+Skin',
      'https://placehold.co/600x700?text=Mask+Essence+Close+Up+Clear+Gel+Texture',
    ],
    description: 'Intensive hydrating sheet mask with pure hyaluronic acid complex.',
    descriptionAz: 'Xalis hialuronik turşu kompleksi ilə intensiv nəmləndirici vərəq maskası.',
    descriptionRu: 'Интенсивная увлажняющая тканевая маска с чистым комплексом гиалуроновой кислоты.',
    inStock: true,
    stockCount: 60,
    specs: { Count: '5 masks', 'Main Ingredient': 'Hyaluronic Acid', Time: '20 minutes' },
  },
  {
    id: 'p008',
    name: 'Professional Hair Color Set',
    nameAz: 'Peşəkar Saç Boyası Seti',
    nameRu: 'Профессиональный набор для окрашивания волос',
    category: 'hair-care',
    subcategory: 'hair-coloring',
    price: 72.0,
    originalPrice: 95.0,
    image: 'https://placehold.co/600x700?text=Professional+Hair+Color+Tubes+Set+Warm+Nude+Tones',
    images: [
      'https://placehold.co/600x700?text=Professional+Hair+Color+Tubes+Set+Warm+Nude+Tones',
      'https://placehold.co/600x700?text=Hair+Color+Palette+Swatches+Professional+Range',
      'https://placehold.co/600x700?text=Hair+Coloring+Application+Salon+Professional',
    ],
    description: 'Ammonia-free professional hair color with conditioning agents.',
    descriptionAz: 'Qidalandırıcı agentlərlə amonyaksız peşəkar saç boyası.',
    descriptionRu: 'Безаммиачная профессиональная краска для волос с кондиционирующими агентами.',
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    badge: 'SALE',
    specs: { Volume: '100ml each', Shades: '8 shades', Formula: 'Ammonia-free' },
  },
  {
    id: 'p009',
    name: 'Diode Laser Hair Removal Device',
    nameAz: 'Diod Lazer Tüy Tökücü Cihaz',
    nameRu: 'Диодный лазер для удаления волос',
    category: 'laser',
    subcategory: 'laser-devices',
    price: 1250.0,
    image: 'https://placehold.co/600x700?text=Professional+Diode+Laser+Hair+Removal+Machine+White+Medical',
    images: [
      'https://placehold.co/600x700?text=Professional+Diode+Laser+Hair+Removal+Machine+White+Medical',
      'https://placehold.co/600x700?text=Laser+Machine+Handpiece+Detail+Metal+Professional',
      'https://placehold.co/600x700?text=Laser+Treatment+in+Salon+Professional+Setting+Clinical',
    ],
    description: '808nm diode laser professional hair removal system for salons.',
    descriptionAz: 'Salonlar üçün 808nm diod lazer peşəkar tüy tökücü sistem.',
    descriptionRu: 'Профессиональная система лазерной эпиляции 808 нм для салонов.',
    inStock: true,
    stockCount: 3,
    isNew: true,
    specs: { Wavelength: '808nm', Power: '600W', 'Spot Size': '15x15mm', Cooling: 'Sapphire' },
  },
  {
    id: 'p010',
    name: 'Professional Makeup Brush Set',
    nameAz: 'Peşəkar Makiyaj Fırça Seti',
    nameRu: 'Профессиональный набор кистей для макияжа',
    category: 'makeup',
    subcategory: 'makeup-tools',
    price: 95.0,
    image: 'https://placehold.co/600x700?text=Luxury+Makeup+Brush+Set+Gold+Handles+Soft+Bristles',
    images: [
      'https://placehold.co/600x700?text=Luxury+Makeup+Brush+Set+Gold+Handles+Soft+Bristles',
      'https://placehold.co/600x700?text=Individual+Makeup+Brushes+Fan+Display+Elegant',
      'https://placehold.co/600x700?text=Brush+Bristles+Close+Up+Ultra+Soft+Dense',
    ],
    description: '15-piece professional makeup brush set with synthetic fiber bristles.',
    descriptionAz: '15 parçalı sintetik liflə peşəkar makiyaj fırça dəsti.',
    descriptionRu: 'Профессиональный набор из 15 кистей для макияжа с синтетическими волокнами.',
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    specs: { Count: '15 brushes', Material: 'Synthetic fiber', Handle: 'Gold aluminum' },
  },
  {
    id: 'p011',
    name: 'Nail E-File Professional Drill',
    nameAz: 'Peşəkar Dırnak E-Frezer',
    nameRu: 'Профессиональный аппарат для маникюра',
    category: 'nail-care',
    subcategory: 'nail-devices',
    price: 112.0,
    originalPrice: 140.0,
    image: 'https://placehold.co/600x700?text=Professional+Nail+Drill+E-File+Rose+Gold+Sleek+Design',
    images: [
      'https://placehold.co/600x700?text=Professional+Nail+Drill+E-File+Rose+Gold+Sleek+Design',
      'https://placehold.co/600x700?text=Nail+Drill+Handpiece+Detail+Metal+Bit+Close+Up',
      'https://placehold.co/600x700?text=Nail+Drill+In+Use+Manicure+Professional+Table',
    ],
    description: '35,000 RPM professional nail e-file with 6 rotation settings.',
    descriptionAz: '6 fırlanma rejimi ilə 35,000 RPM peşəkar dırnak e-frezeri.',
    descriptionRu: 'Профессиональный аппарат 35 000 об/мин с 6 режимами вращения.',
    inStock: true,
    stockCount: 15,
    badge: 'SALE',
    specs: { RPM: '35,000', 'Rotation': 'Forward/Reverse', Display: 'Digital LED', Noise: 'Low' },
  },
  {
    id: 'p012',
    name: 'Bio Perm Waving Lotion Set',
    nameAz: 'Bio Perm Dalğalandırma Losyon Seti',
    nameRu: 'Набор лосьонов для биозавивки',
    category: 'hair-care',
    subcategory: 'bio-perm',
    price: 58.0,
    image: 'https://placehold.co/600x700?text=Bio+Perm+Hair+Waving+Lotion+Professional+Set+Elegant',
    images: [
      'https://placehold.co/600x700?text=Bio+Perm+Hair+Waving+Lotion+Professional+Set+Elegant',
      'https://placehold.co/600x700?text=Perm+Lotion+Bottle+Detail+Silver+Gold+Premium',
    ],
    description: 'Gentle bio waving lotion system for natural-looking curls.',
    descriptionAz: 'Təbii görünüşlü buruqlar üçün yumşaq bio dalğalandırma losyon sistemi.',
    descriptionRu: 'Мягкая система биозавивки для естественно выглядящих локонов.',
    inStock: true,
    stockCount: 22,
    isNew: true,
    specs: { Volume: '2x120ml', 'Process Time': '20-30 minutes', 'Hair Type': 'Fine to normal' },
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew)
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}
