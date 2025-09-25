// src/components/Modal.tsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel?: string;
}

export default function Modal({ children, onClose, ariaLabel = "Dialog" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // prevent body scroll when modal open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // focus the close button on open for accessibility
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // close if clicked on background overlay
  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const modalContent = (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        role="dialog"
        aria-label={ariaLabel}
        className="relative w-full max-w-3xl rounded bg-white p-6 shadow-2xl overflow-auto max-h-[90vh] transform transition-all"
      >
        <button
          ref={closeButtonRef}
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 hover:bg-gray-100"
        >
          <span className="sr-only">Close</span>
          {/* simple X icon */}
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
