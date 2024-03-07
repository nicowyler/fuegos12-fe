import toast, { ToastBar, Toaster } from 'react-hot-toast';


const CustomToaster = () => {
    return (
        <>
            <Toaster toastOptions={{
                style: {
                    background: 'rgba(256, 256, 256, 0.95)',
                },
                duration: 10000000,
                className: "w-full max-w-2xl p-0 flex justify-center items-center"
            }}>
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex justify-center flex-col items-center w-full  rounded-lg pointer-events-auto p-0`}
                            >
                                <div className='flex justify-between w-full p-4 pb-0'>
                                    <div className='flex justify-start items-center'>
                                        {icon}
                                        <span className='text-gray-400 ml-2'>{
                                            t.type == 'error' ? 'Algo Salio mal!' : 'Todo esta Ok!'
                                        }</span>
                                    </div>
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className="text-sm font-medium text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-text-f12-blue-light "
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full py-4">
                                    <p className="mt-1 px-3 text-sm text-gray-500 p-0">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </>
    )
};

export default CustomToaster;
