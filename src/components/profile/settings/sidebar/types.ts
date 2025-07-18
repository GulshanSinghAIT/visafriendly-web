export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface MenuItemProps extends MenuItem {
  isLast: boolean;
  isActive: boolean;
}
