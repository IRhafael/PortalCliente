import { useToast } from "../../contexts/ToastContext";
import { AnimatePresence, motion } from "framer-motion";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-2xl px-4 py-3 shadow-lg text-white ${
              t.type === "success"
                ? "bg-success"
                : t.type === "error"
                ? "bg-danger"
                : "bg-primary"
            }`}
            role="alert"
            tabIndex={0}
            aria-live="assertive"
            onClick={() => removeToast(t.id)}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
