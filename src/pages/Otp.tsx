import { ApiAuth } from "@/api";
import CustomToaster from "@/components/CustomToaster";
import toast from "react-hot-toast";
import logo from '../assets/logo-fuegos12.svg';
import OTPInput from "react-otp-input";
import { ClipboardEvent, useState } from "react";
import UseUserStore from "@/store/user.store";
import { formatPhone } from "@/utils";
import { isApiResponse, isErrorMessage } from "@/api/guards";
import { OtpType, Response } from "@/types";
import { useNavigate } from "react-router-dom";


const Otp = () => {
    const userState = UseUserStore();

    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const sendCode = async () => {
        if(code.length < 6) return;
        if(userState.user?.email){
            const response:Response<OtpType> = await ApiAuth.otp(userState.user?.email, code);
            console.log(response)

            if (isErrorMessage(response)) {
                toast.error(response);
            } else if (isApiResponse<OtpType>(response)) {
                const { statusCode, message } = response.data;
                if(statusCode == 201) {
                    toast(message);
                    setTimeout(()=>{
                        toast.remove();
                        navigate('/');
                    },2000);
                }
            }
        }
    }

    const pastedCode = (event:ClipboardEvent<HTMLDivElement>) => {
        const pastedCode = event.clipboardData.getData('text');
        setCode(pastedCode);
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-10 lg:pb-0 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto w-80 h-auto mb-10"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="text-center text-3xl font-title font-bold uppercase tracking-widest text-f12-creame">
                    Verifica tu cuenta!
                </h2>
                <p className="text-center text-f12-creame flex flex-col text-balance">
                    Te enviamos un mensage de whatsapp cone el codigo al numero
                    <span className="text-f12-blue-light text-lg font-bold">{(" ") + formatPhone(userState?.user?.phone) }</span>
                </p>
            </div>
            <div className="my-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <OTPInput
                        value={code}
                        onChange={setCode}
                        numInputs={6}
                        renderSeparator={<span style={{ width: "8px" }}></span>}
                        renderInput={(props) => <input {...props} />}
                        shouldAutoFocus={true}
                        inputType="number"
                        onPaste={pastedCode}
                        containerStyle={{
                            justifyContent:"center",
                            margin: "30px 0"
                        }}
                        inputStyle={{
                            border: "1px solid transparent",
                            borderRadius: "8px",
                            width: "54px",
                            height: "54px",
                            fontSize: "12px",
                            color: "#000",
                            fontWeight: "400",
                            caretColor: "blue"
                        }}
                    />

                    <div>
                        <button
                            onClick={sendCode}
                            disabled={code.length < 6}
                            type="submit"
                            className="disabled:bg-gray-500
                            flex w-full justify-center rounded-md bg-f12-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-f12-orange-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:f12-blue"
                        >
                            Enviar
                        </button>
                    </div>
                <CustomToaster />
            </div>
        </div>
    )
}

export default Otp;