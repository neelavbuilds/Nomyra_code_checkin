import { createContext, useCallback, useContext, useMemo, useState } from "react";

const EnquiryContext = createContext(null);

export const EnquiryProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState({});

  const openEnquiry = useCallback((values = {}) => {
    setPrefill(values);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ open, setOpen, prefill, openEnquiry }), [open, prefill, openEnquiry]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
};

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
};
