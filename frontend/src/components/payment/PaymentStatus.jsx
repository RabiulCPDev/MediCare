import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentStatus = () => {
    const query = new URLSearchParams(useLocation().search);
    const tran_id = query.get('tran_id');
    const status = query.get('status');
   
    const navigate = useNavigate();

    const renderMessage = () => {
        switch (status) {
            case 'success':
                return (
                    <div className="text-green-500">
                        <h1 className="text-2xl font-bold">Payment Successful!</h1>
                        <p>Your transaction ID is: <strong>{tran_id}</strong></p>
                    </div>
                );
            case 'fail':
                return (
                    <div className="text-red-500">
                        <h1 className="text-2xl font-bold">Payment Failed!</h1>
                        <p>Please try again. Your transaction ID is: <strong>{tran_id}</strong></p>
                    </div>
                );
            case 'cancel':
                return (
                    <div className="text-yellow-500">
                        <h1 className="text-2xl font-bold">Payment Canceled!</h1>
                        <p>Your transaction has been canceled. Your transaction ID is: <strong>{tran_id}</strong></p>
                    </div>
                );
            default:
                return (
                    <div>
                        <h1 className="text-2xl font-bold">Unknown Status</h1>
                        <p>Please check the transaction.</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {renderMessage()}
            <button className='bg-green-400 rounded-md border-white m-3 p-3' type='submit' onClick={()=>navigate('/')}>Go To Home Page</button>
        </div>
    );
};

export default PaymentStatus;
