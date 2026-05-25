import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
}) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#fafafa] text-zinc-900 shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <ShoppingBag size={20} /> Cart ({items.length})
              </h2>
              <button type="button" onClick={onClose} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-zinc-500 py-12">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.id}-${item.color}`}
                    className="flex gap-4 rounded-2xl border border-zinc-200 p-3"
                  >
                    <div
                      className="h-20 w-16 rounded-xl shrink-0"
                      style={{ background: item.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{item.name}</p>
                      <p className="text-sm text-zinc-500">${item.price}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item, -1)}
                          className="rounded-lg border p-1"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-6 text-center">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item, 1)}
                          className="rounded-lg border p-1"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(item)}
                          className="ml-auto text-xs text-zinc-400 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-zinc-200 p-5 space-y-3">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full rounded-full bg-zinc-900 py-3.5 text-white font-semibold hover:bg-zinc-800"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
