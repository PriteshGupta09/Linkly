import React, { Suspense } from 'react';
import VerifyContent from '@/components/verify/VerifyPageContent';
import Loader from '@/components/common/Loader';

const Verify = () => {
    return (
        <Suspense fallback={<Loader />}>
            <VerifyContent />
        </Suspense>
    );
};

export default Verify;
