import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { activateUserEmail } from '../services/authAPI';
import {
    ACTIVATION_INVALID_LINK,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED_DEFAULT,
} from '@/constants/common';

const ActivatePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const userId = searchParams.get('userId');
        const token = searchParams.get('token');

        if (!userId || !token) {
            setStatus('error');
            setMessage(ACTIVATION_INVALID_LINK);
            return;
        }

        activateUserEmail(userId, token)
            .then(() => {
                setStatus('success');
                setMessage(ACTIVATION_SUCCESS);
                setTimeout(() => navigate('/'), 3000);
            })
            .catch((error) => {
                setStatus('error');
                setMessage(error.message || ACTIVATION_FAILED_DEFAULT);
            });
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
                {status === 'loading' && (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-6"></div>
                        <h2 className="text-xl font-semibold text-gray-700">Đang kích hoạt tài khoản...</h2>
                        <p className="text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-3">{ACTIVATION_SUCCESS}</h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-sm text-gray-500">Đang chuyển đến trang đăng nhập...</p>
                        <div className="mt-6">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-3">{ACTIVATION_FAILED_DEFAULT}</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('auth/register')}
                                className="w-full px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
                            >
                                Đăng ký lại
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium"
                            >
                                Về trang chủ
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActivatePage;
