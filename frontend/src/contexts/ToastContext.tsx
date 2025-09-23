import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
interface ToastContextProps {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = (id: number) => setToasts(ts => ts.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro do ToastProvider");
  return ctx;
};

// Para integração com backend real (ex: Django REST), utilize showToast para exibir mensagens de sucesso/erro
// após as respostas das APIs reais. Exemplo de uso:
// try {
//   await api.post("/endpoint", data);
//   showToast("Operação realizada com sucesso!", "success");
// } catch (e) {
//   showToast("Erro ao realizar operação.", "error");
// }
