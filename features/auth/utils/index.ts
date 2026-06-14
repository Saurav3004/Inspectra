export const SIGN_IN_PATH = "/sign-in";
export const DEFAULT_AUTH_CALLBACK = "/dashboard";

export function getSafeCallBack(callbackUrl:string | undefined | null):string{
    if(callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")){
        return callbackUrl;
    }

    return DEFAULT_AUTH_CALLBACK;
}