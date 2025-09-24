import React from 'react';
import { X } from 'lucide-react';
import { useToastContext } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';

const toastStyles = {
  success: 'bg-success text-success-foreground border-success',
  warning: 'bg-warning text-warning-foreground border-warning',
  danger: 'bg-danger text-danger-foreground border-danger',
  info: 'bg-primary text-primary-foreground border-primary'
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center justify-between p-4 rounded-lg border shadow-elevated animate-slide-in',
            toastStyles[toast.type]
          )}
        >
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 p-1 hover:opacity-80 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}