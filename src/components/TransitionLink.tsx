import React from 'react';
import { useTransition } from '../context/TransitionContext';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ to, className, children, onClick, ...props }) => {
  const { navigateTo } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    navigateTo(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;
