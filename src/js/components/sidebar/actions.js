export const toggleSidebar = value => ({ type: 'TOGGLE_SIDEBAR', value });
export const newSidebarView = view => ({ type: 'NEW_SIDEBAR_VIEW', view });
export const pushView = view => ({ type: 'PUSH_VIEW', view });
export const popView = () => ({ type: 'POP_VIEW' });
export const emptyViews = () => ({ type: 'EMPTY_VIEWS' });
export const oldSidebarView = () => ({ type: 'OLD_SIDEBAR_VIEW' });
export const emptySidebar = () => ({ type: 'EMPTY_SIDEBAR' });
