"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't pop on first paint
      const timeout = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 40, x: "-50%" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl shadow-black/10"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
              <Cookie size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal">Cookie Notice</p>
              <p className="mt-1 text-xs leading-relaxed text-slate">
                We use essential cookies to ensure our site works properly. No
                tracking or analytics cookies are used.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={accept}
                  className="rounded-full bg-steel-blue px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-steel-blue/90"
                >
                  Accept
                </button>
                <button
                  onClick={() => setVisible(false)}
                  className="text-xs text-slate transition-colors hover:text-charcoal"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              aria-label="Close"
              className="shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:text-charcoal hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}