import { MAIN_COLOR } from '@shlinkio/shlink-frontend-kit';

export interface ShlinkLogoProps {
  color?: string;
  className?: string;
}

export const ShlinkLogo = ({ color = MAIN_COLOR, className }: ShlinkLogoProps) => (
  <div className={`${className}`}>
    <div className="bulge-container">
      <img src="./src/common/img/butt.png" alt="Bulging Outline Image" className="bulge-image first-image" />
      <img src="./src/common/img/link.gif" alt="Bulging Outline Image" className="bulge-image second-image" />
    </div>
  </div>
);

