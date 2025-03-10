import { useCallback, useState } from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return {
    onClose,
    onOpen,
    isOpen,
    toggle,
  };
};

export default useDisclosure;
