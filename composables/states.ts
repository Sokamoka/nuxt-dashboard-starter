export const useSidebarVisibility = () => useState<boolean>('isSidebarVisible', () => true)
export const useMobileSidebarVisibility = () => useState<boolean>('isMobileSidebarVisible', () => false)
