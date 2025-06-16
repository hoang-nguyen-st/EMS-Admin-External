export interface GetListParams {
  search?: string;
  page: number;
  take: number;
}

export interface CollapseHandle {
  handleCollapsed: () => void;
  toggleMobileDrawer: () => void;
}

export interface CollapseProps {
  collapsed: boolean;
}
