import { ReactNode } from 'react';
import { Suspense } from 'react';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            {/* // You could have a loading skeleton as the `fallback` too */}
            <Suspense>{children}</Suspense>
        </main>
    );
};

export default RootLayout;
