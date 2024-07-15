import { MAIN_COLOR } from '@shlinkio/shlink-frontend-kit';

export interface ShlinkLogoProps {
  color?: string;
  className?: string;
  height?: number;
}

export const ShlinkLogo = ({ color = MAIN_COLOR, className, height = 24 }: ShlinkLogoProps) => (
  <div className={`${className}`}>
    <img src={`/icons/icon-${height}x${height}.png`} alt="My-Short.link" />
  </div>
);

