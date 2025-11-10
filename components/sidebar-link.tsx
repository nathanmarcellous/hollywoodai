import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  title: string;
  Icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const SidebarLink = ({ title, Icon, href, onClick, disabled }: Props) => {
  const Item = href ? Link : 'div';

  return (
    <Item
      href={href || '#'}
      aria-disabled={disabled || undefined}
      onClick={event => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick?.();
      }}
      className={cn(
        'my-0.5 mx-3 p-3 rounded-lg font-medium text-[14px] text-[#565b67] flex items-center gap-2 hover:bg-[#3205800b] hover:text-[#320580] transition-all duration-100 cursor-pointer',
        disabled && 'cursor-not-allowed'
      )}
    >
      <Icon size={15} />
      {title}
    </Item>
  );
};
