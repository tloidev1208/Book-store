import React from 'react';
import { signUpSchema } from '@/lib/validations';
import AuthForm from '@/components/AuthForm';

const Page = () => (
    <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{ 
        email: '',
        password: '',
        fullName: '',
        universityId: '',
        universityCard: '',
         }}
         onSubmit={() => {}}
    />

    );


export default Page;