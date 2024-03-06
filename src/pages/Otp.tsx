import { ApiAuth } from "@/api/Auth";
import CustomToaster from "@/components/CustomToaster";
import toast from "react-hot-toast";
import logo from '../assets/logo-fuegos12.svg';
import OTPInput from "react-otp-input";
import { ClipboardEvent, useState } from "react";
import UseUserStore from "@/store/user.store";
import { formatPhone } from "@/utils";
import { isApiResponse, isErrorMessage } from "@/api/guards";
import { OtpType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useApiMiddleware } from "@/hooks/useApiMiddleware";
import SubmitButton from "@/components/SubmitButton";
import useAuth from "@/hooks/useAuth";


const Otp = () => {
    const { logIn } = useAuth();
    const userState = UseUserStore();
    const { isLoading, apiCall } = useApiMiddleware();
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    console.log(userState)

    const sendCode = async () => {
        let phone = "";
        if (code.length < 6) return;
        if (userState.user?.phone) {
            phone = userState.user?.phone
        }
        console.log(userState)
        const response = await apiCall<OtpType>(() => ApiAuth.otp(phone, code))
        console.log(response)

        if (isErrorMessage(response)) {
            toast.error(response);
        } else if (isApiResponse<OtpType>(response)) {
            const { statusCode, message } = response.data;
            if (statusCode == 201) {
                toast(message);
                logIn(userState.user);
                setTimeout(() => {
                    toast.remove();
                    navigate('/');
                }, 2000);
            }
        }

    }

    const pastedCode = (event: ClipboardEvent<HTMLDivElement>) => {
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
                    <span className="text-f12-blue-light text-lg font-bold">{(" ") + formatPhone(userState?.user?.phone)}</span>
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
                        justifyContent: "center",
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
                    <SubmitButton onClick={sendCode} disabled={code.length < 6} isLoading={isLoading} label="Enviar" />
                </div>
                <CustomToaster />
            </div>
        </div>
    )
}

export default Otp;