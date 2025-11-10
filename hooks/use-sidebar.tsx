import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSidebar = create<SidebarState>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));