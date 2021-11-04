import type { FC, ReactNode } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface RTLProps {
    children: ReactNode;
}

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const RTL:FC<RTLProps> = ({ children }) => (
  <CacheProvider value={cacheRtl}>
    {children}
  </CacheProvider>
);

export default RTL;
