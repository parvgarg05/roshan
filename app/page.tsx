import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Star, Truck, Award, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ProductCard';
import CategoryCarousel from '@/components/CategoryCarousel';
import HomeImageSlider from '@/components/HomeImageSlider';
import { getFeaturedProducts, getTodaySpecials, getCategories } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';

export default async function HomePage() {
    const todaySpecials = await getTodaySpecials();
    const featuredProducts = await getFeaturedProducts();
    const categories = await getCategories();

    const STATS = [
        { icon: Award, label: 'Years of Craft', value: '50+' },
        { icon: Star, label: 'Happy Customers', value: '10K+' },
        { icon: Truck, label: 'Orders Delivered', value: '50K+' },
        { icon: Clock, label: 'Fresh Daily', value: '100%' },
    ];

    return (
        <>
            {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
            <section className="relative min-h-[88vh] flex items-center bg-hero-gradient overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-saffron-500/20 blur-3xl animate-bounce-soft" />
                    <div className="absolute bottom-0 -left-16 w-80 h-80 rounded-full bg-gold-400/10 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-maroon-800/30 blur-3xl" />
                </div>

                {/* Diagonal decorative pattern */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f97316\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")' }}
                />

                <div className="section-container section-py relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left: Text */}
                        <div className="text-cream-50 animate-fade-up">
                            <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-400/20 border border-gold-400/30 text-gold-300 text-xs font-semibold rounded-full uppercase tracking-widest mb-5">
                                🪔 Authentic Indian Sweets Since Generations
                            </p>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                                Taste the{' '}
                                <span className="relative">
                                    <span className="text-gradient-saffron">Sweetness</span>
                                </span>{' '}
                                <br className="hidden sm:block" />
                                of Tradition
                            </h1>

                            <p className="text-cream-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                                Handcrafted mithai using pure desi ghee and time-honoured family recipes.
                                Order fresh from our shop at Nadrai Gate, Etah — delivered to your door.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                <Link href="/items">
                                    <Button size="lg" variant="primary" rightIcon={<ArrowRight size={18} />}>
                                        Order Now
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-cream-400/50 text-cream-100 hover:bg-white/10 hover:border-cream-100"
                                    >
                                        Our Story
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3">
                                {['Pure Desi Ghee', 'No Preservatives', 'Made Fresh Daily'].map((t) => (
                                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-cream-200 text-xs rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right: Auto image slider */}
                        <div className="animate-fade-up [animation-delay:120ms]">
                            <HomeImageSlider />
                        </div>
                    </div>
                </div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" className="w-full text-cream-100 fill-current" preserveAspectRatio="none">
                        <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════ */}
            <section className="bg-white border-b border-cream-200 py-6">
                <div className="section-container">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-cream-200">
                        {STATS.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex flex-col items-center gap-1 py-2">
                                <Icon size={20} className="text-saffron-500 mb-1" />
                                <span className="font-display font-bold text-2xl text-maroon-900">{value}</span>
                                <span className="text-xs text-maroon-400 text-center">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
          TODAY'S SPECIAL
      ══════════════════════════════════════════════════════ */}
            <section className="section-py bg-cream-100">
                <div className="section-container">
                    {/* Heading */}
                    <div className="flex items-end justify-between mb-8 gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-saffron-600 mb-1">
                                🌅 Limited Quantity
                            </p>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-maroon-900">
                                Today&apos;s Special
                            </h2>
                            <p className="text-maroon-500 text-sm mt-1">Freshly made this morning — order before they run out</p>
                        </div>
                        <Link
                            href="/items"
                            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-600 hover:text-saffron-700 transition-colors"
                        >
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {todaySpecials.slice(0, 3).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
          CATEGORY CAROUSEL
      ══════════════════════════════════════════════════════ */}
            <section className="py-10 bg-white border-y border-cream-200">
                <div className="section-container">
                    <div className="flex items-end justify-between mb-6 gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-saffron-600 mb-1">Browse By Type</p>
                            <h2 className="font-display font-bold text-2xl sm:text-3xl text-maroon-900">Our Sweet Families</h2>
                        </div>
                    </div>
                    <CategoryCarousel categories={categories} asLinks activeCategory="all" />

                    {/* Category feature cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
                        {categories.filter((c) => c.id !== 'all').slice(0, 8).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/items?category=${cat.id}`}
                                className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-cream-50 border border-cream-200 hover:border-saffron-300 hover:bg-saffron-50 hover:shadow-warm transition-all duration-200"
                            >
                                <span className="text-3xl" aria-hidden>{cat.emoji}</span>
                                <span className="font-semibold text-sm text-maroon-800 group-hover:text-saffron-700 text-center leading-tight transition-colors">
                                    {cat.label}
                                </span>
                                <span className="text-[11px] text-maroon-400 text-center leading-tight line-clamp-2">
                                    {cat.description}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════════════ */}
            <section className="section-py bg-cream-100">
                <div className="section-container">
                    <div className="flex items-end justify-between mb-8 gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-saffron-600 mb-1">⭐ Customer Favourites</p>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-maroon-900">Featured Mithai</h2>
                            <p className="text-maroon-500 text-sm mt-1">Handpicked bestsellers loved across Uttar Pradesh</p>
                        </div>
                        <Link
                            href="/items"
                            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-600 hover:text-saffron-700 transition-colors"
                        >
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {featuredProducts.slice(0, 6).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
          BRAND STORY STRIP
      ══════════════════════════════════════════════════════ */}
            <section className="section-py bg-maroon-gradient text-cream-100 overflow-hidden relative">
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f59e0b\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")' }}
                />
                <div className="section-container relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">Our Promise</p>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                            Made with <span className="text-gradient-saffron">Love</span>,<br />
                            Delivered with <span className="text-gold-300">Care</span>
                        </h2>
                        <p className="text-cream-300 text-base leading-relaxed mb-7">
                            Every sweet at L.Roshanlal Ji Sweets is crafted in small batches using traditional recipes.
                            No artificial colours. No preservatives. Just pure ingredients and decades of expertise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/items">
                                <Button variant="primary" size="lg">Shop Now</Button>
                            </Link>
                            <a href="tel:+917055513961">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    leftIcon={<Phone size={16} />}
                                    className="border-cream-400/40 text-cream-100 hover:bg-white/10 hover:border-cream-100"
                                >
                                    Call to Order
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
