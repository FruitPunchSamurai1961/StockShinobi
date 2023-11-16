import {toast} from "../index";
import {ToastStatusOptions} from "../ts/types";


const commonToastProperties = {
    duration: 5000,
    isClosable: true,
    status: "error" as ToastStatusOptions
}

export const HandleUnexpectedError = () => {
    toast({
        description: "An Unexpected Error Occurred",
        ...commonToastProperties
    })
}

export const HandleServerSideError = (data: string | Object) => {
    if (typeof data === "string") {
        toast({
            description: `Error: ${data}`,
            ...commonToastProperties
        })
    } else {
        for (let [key, value] of Object.entries(data)) {
            toast({
                description: `${key}: ${value}`,
                ...commonToastProperties
            })
        }
    }
}