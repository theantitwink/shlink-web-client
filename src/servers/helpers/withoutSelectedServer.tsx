import type { FC } from 'react';
import { useEffect } from 'react';

interface WithoutSelectedServerProps {
  resetSelectedServer: (...arg0: any[]) => any;
}

export function withoutSelectedServer<T = any>(WrappedComponent: FC<WithoutSelectedServerProps & T>) {
  return (props: WithoutSelectedServerProps & T) => {
    const { resetSelectedServer } = props;
    useEffect(() => {
      resetSelectedServer();
    }, [resetSelectedServer]);

    return <WrappedComponent {...props} />;
  };
}
