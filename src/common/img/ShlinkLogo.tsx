
export interface ShlinkLogoProps {
  color?: string;
  className?: string;
  height?: number;
}

export const ShlinkLogo = ({ className, height = 24 }: ShlinkLogoProps) => (
  <div className={`${className}`} style={{ display: 'inline-block' }}>
    <img src={`/icons/icon-${height}x${height}.png`} alt="My-Short.link" style={{ borderRadius: '15px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)' }} />
  </div>
);

