import toast, { ToastBar, Toaster } from 'react-hot-toast';


const CustomToaster = () => {
    return (
        <>
            <Toaster toastOptions={{
                className:"w-full max-w-2xl p-0 flex justify-center items-center"
            }}>
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex justify-center items-center w-full bg-white rounded-lg pointer-events-auto`}
                            >
                                <div className="flex items-center justify-center">
                                    <div className="mx-10">
                                        <p className="flex items-center mt-1 text-sm text-gray-500">
                                            <span className='mr-5 block'>{icon}</span>
                                            {message}
                                        </p>
                                    </div>

                                    <div className="flex border-l border-gray-200">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="w-full border border-transparent rounded-none rounded-r-lg py-10 px-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
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
