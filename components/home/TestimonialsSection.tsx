'use client'

import { useLang } from '@/components/providers/GlamoraProviders'

const testimonials = [
  {
    nameAz: 'Aytən Məmmədova',
    nameEn: 'Ayten Mammadova',
    nameRu: 'Айтен Мамедова',
    roleAz: 'Gözəllik Salonu Sahibəsi',
    roleEn: 'Beauty Salon Owner',
    roleRu: 'Владелица салона красоты',
    textAz: 'GLAMORA məhsulları ilə salonumun keyfiyyəti tamamilə dəyişdi. Müştərilərim artıq daha çox razıdır.',
    textEn: 'Since switching to GLAMORA products, my salon quality has completely transformed. My clients are happier than ever.',
    textRu: 'После перехода на продукты GLAMORA качество моего салона полностью изменилось. Клиенты в восторге.',
    rating: 5,
  },
  {
    nameAz: 'Lalə Hüseynova',
    nameEn: 'Lale Huseynova',
    nameRu: 'Ляле Гусейнова',
    roleAz: 'Peşəkar Makiyaj Ustası',
    roleEn: 'Professional Makeup Artist',
    roleRu: 'Профессиональный визажист',
    textAz: 'Makiyaj fırçaları möhtəşəmdir! Bu qiymətə bu keyfiyyəti başqa yerdə tapmaq mümkün deyil.',
    textEn: 'The makeup brushes are absolutely stunning! You simply cannot find this quality at this price anywhere else.',
    textRu: 'Кисти для макияжа просто восхитительны! Нигде больше не найти такого качества по такой цене.',
    rating: 5,
  },
  {
    nameAz: 'Nigar Əliyeva',
    nameEn: 'Nigar Aliyeva',
    nameRu: 'Нигяр Алиева',
    roleAz: 'Dərmanoloji Kosmetolog',
    roleEn: 'Dermatological Cosmetologist',
    roleRu: 'Дерматологический косметолог',
    textAz: 'Keratin müalicəsi məhsulları fenomenaldır. Salonumda hər gün istifadə edirəm.',
    textEn: 'The keratin treatment products are phenomenal. I use them daily in my salon with outstanding results.',
    textRu: 'Средства для кератинового выпрямления феноменальны. Использую ежедневно с отличными результатами.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const { t, lang } = useLang()

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--secondary)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
            {lang === 'az' ? 'Müştəri Rəyləri' : lang === 'ru' ? 'Отзывы' : 'Testimonials'}
          </p>
          <h2 className="font-display font-light text-4xl lg:text-5xl" style={{ color: 'var(--charcoal)' }}>
            {t('testimonials')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => {
            const name = lang === 'az' ? testimonial.nameAz : lang === 'ru' ? testimonial.nameRu : testimonial.nameEn
            const role = lang === 'az' ? testimonial.roleAz : lang === 'ru' ? testimonial.roleRu : testimonial.roleEn
            const text = lang === 'az' ? testimonial.textAz : lang === 'ru' ? testimonial.textRu : testimonial.textEn

            return (
              <div key={i} className="p-8" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <span key={j} style={{ color: 'var(--gold)', fontSize: 12 }}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm font-light leading-relaxed mb-6 italic" style={{ color: 'var(--charcoal)' }}>
                  &ldquo;{text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: 'var(--blush)', color: 'var(--charcoal)' }}>
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--charcoal)' }}>{name}</p>
                    <p className="text-[10px] tracking-wide" style={{ color: 'var(--warm-gray)' }}>{role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
