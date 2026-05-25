import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Star,
  ArrowLeft,
} from "lucide-react";
import DemoShell from "../shared/DemoShell";
import CartDrawer from "./components/CartDrawer";
import { SkeletonProductGrid } from "../shared/Skeleton";
import { products, categories, heroSlides } from "./data/products";

export default function EcommerceDemo() {
  const [view, setView] = useState("shop");
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  const addToCart = (product, color = product.colors[0]) => {
    setCart((prev) => {
      const key = `${product.id}-${color}`;
      const existing = prev.find((i) => `${i.id}-${i.color}` === key);
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.color}` === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, color, qty: 1 }];
    });
    setCartOpen(true);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const Header = () => (
    <header className="sticky top-[57px] z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
        <button
          type="button"
          onClick={() => {
            setView("shop");
            setSelected(null);
          }}
          className="font-display text-xl font-bold tracking-tight"
        >
          VELURE
        </button>
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-zinc-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-zinc-900"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-full border border-zinc-200 p-2.5 hover:bg-zinc-50"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div className="lg:hidden border-t px-4 py-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setMobileMenu(false);
              }}
              className={`rounded-full px-3 py-1 text-sm ${
                category === c ? "bg-zinc-900 text-white" : "bg-zinc-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </header>
  );

  const ShopView = () => (
    <>
      <section className="relative h-[min(70vh,520px)] overflow-hidden bg-zinc-900 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${heroSlides[slide].gradient}`}
          />
        </AnimatePresence>
        <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 max-w-2xl">
          <motion.h1
            key={`t-${slide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-4xl sm:text-5xl font-bold"
          >
            {heroSlides[slide].title}
          </motion.h1>
          <p className="mt-4 text-white/70">{heroSlides[slide].subtitle}</p>
          <button
            type="button"
            className="mt-8 w-fit rounded-full bg-white px-8 py-3 font-semibold text-zinc-900"
          >
            {heroSlides[slide].cta}
          </button>
        </div>
        <div className="absolute bottom-6 right-6 flex gap-2 z-10">
          <button
            type="button"
            onClick={() => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
            className="rounded-full bg-white/10 p-2 backdrop-blur"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setSlide((s) => (s + 1) % heroSlides.length)}
            className="rounded-full bg-white/10 p-2 backdrop-blur"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Categories
            </p>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`block w-full text-left py-2 text-sm ${
                  category === c ? "font-semibold text-zinc-900" : "text-zinc-500"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Sort
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className="inline-flex items-center gap-2 text-sm font-medium"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
          {filterOpen && (
            <div className="lg:hidden mb-4 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    category === c ? "bg-zinc-900 text-white" : "bg-zinc-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <SkeletonProductGrid />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelected(p);
                    setSelectedColor(p.colors[0]);
                    setView("product");
                  }}
                >
                  <div className="relative aspect-[4/5] rounded-2xl bg-zinc-100 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1] || p.colors[0]})` }}
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase">
                        {p.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setWishlist((w) =>
                          w.includes(p.id) ? w.filter((id) => id !== p.id) : [...w, p.id]
                        );
                      }}
                      className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow"
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={16}
                        className={wishlist.includes(p.id) ? "fill-red-500 text-red-500" : ""}
                      />
                    </button>
                  </div>
                  <h3 className="mt-3 font-semibold text-sm sm:text-base">{p.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="font-semibold">${p.price}</p>
                    <span className="flex items-center gap-0.5 text-xs text-zinc-500">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {p.rating}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  const ProductView = () => {
    if (!selected) return null;
    const color = selectedColor ?? selected.colors[0];
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={() => setView("shop")}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 mb-8 hover:text-zinc-900"
        >
          <ArrowLeft size={16} /> Back to shop
        </button>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="grid grid-cols-4 gap-3">
            {selected.colors.map((c, i) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c)}
                className={`aspect-square rounded-2xl ${i === 0 ? "col-span-4 aspect-[4/3]" : ""} ${
                  color === c ? "ring-2 ring-zinc-900 ring-offset-2" : ""
                }`}
                style={{ background: c }}
                aria-label={`Color ${i + 1}`}
              />
            ))}
          </div>
          <div>
            {selected.badge && (
              <span className="text-xs font-bold uppercase text-zinc-500">
                {selected.badge}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold mt-2">{selected.name}</h1>
            <p className="mt-2 text-2xl font-semibold">${selected.price}</p>
            <p className="mt-4 text-zinc-600 leading-relaxed">{selected.description}</p>
            <div className="mt-6 flex gap-2">
              {selected.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    color === c ? "border-zinc-900" : "border-transparent"
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => addToCart(selected, color)}
              className="mt-8 w-full rounded-full bg-zinc-900 py-4 font-semibold text-white hover:bg-zinc-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutView = () => (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <button
        type="button"
        onClick={() => setView("shop")}
        className="inline-flex items-center gap-2 text-sm text-zinc-500 mb-8"
      >
        <ArrowLeft size={16} /> Continue shopping
      </button>
      <h1 className="font-display text-3xl font-bold">Checkout</h1>
      <div className="mt-10 grid lg:grid-cols-5 gap-10">
        <form className="lg:col-span-3 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {["Email", "Full name", "Address", "City", "Postal code"].map((label) => (
            <input
              key={label}
              placeholder={label}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          ))}
          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 py-4 font-semibold text-white"
          >
            Place order (demo)
          </button>
        </form>
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200 p-6 h-fit">
          <h2 className="font-semibold mb-4">Order summary</h2>
          {cart.map((item) => (
            <div key={`${item.id}-${item.color}`} className="flex justify-between text-sm py-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-zinc-200 mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>
              ${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DemoShell
      title="Modern E-Commerce"
      subtitle="VELURE — premium storefront UI"
      className="bg-[#fafafa] text-zinc-900"
      theme="light"
    >
      <Header />
      {view === "shop" && <ShopView />}
      {view === "product" && <ProductView />}
      {view === "checkout" && <CheckoutView />}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={(item, delta) => {
          setCart((prev) =>
            prev
              .map((i) =>
                i.id === item.id && i.color === item.color
                  ? { ...i, qty: Math.max(0, i.qty + delta) }
                  : i
              )
              .filter((i) => i.qty > 0)
          );
        }}
        onRemove={(item) =>
          setCart((prev) =>
            prev.filter((i) => !(i.id === item.id && i.color === item.color))
          )
        }
        onCheckout={() => {
          setCartOpen(false);
          setView("checkout");
        }}
      />
    </DemoShell>
  );
}
