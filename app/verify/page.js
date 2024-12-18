import React, { Suspense } from 'react';
import VerifyContent from '@/components/verify/VerifyPageContent';

const Verify = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
};

export default Verify;
