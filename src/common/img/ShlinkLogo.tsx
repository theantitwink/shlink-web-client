import { MAIN_COLOR } from '@shlinkio/shlink-frontend-kit';

export interface ShlinkLogoProps {
  color?: string;
  className?: string;
}

export const ShlinkLogo = ({ color = MAIN_COLOR, className }: ShlinkLogoProps) => (
  <div className={`${className}`}>
    <img src="/icons/icon-1024x1024.png" alt="Bulging Outline Image" />
  </div>
);

