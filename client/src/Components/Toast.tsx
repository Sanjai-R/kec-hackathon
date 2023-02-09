export const errToast = (toast: any, title: string, desc: string) => {
    toast({
        title: title,
        description: desc,
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
}

export const successToast = (toast: any, title: string, desc: string) => {
    toast({
        title: title,
        description: desc,
        status: 'success',
        duration: 2000,
        isClosable: true,
    })
}

export const warningToast = (toast: any, title: string, desc: string) => {
    toast({
        title: title,
        description: desc,
        status: 'warning',
        duration: 2000,
        isClosable: true,
    })
}

export const infoToast = (toast: any, title: string, desc: string) => {
    toast({
        title: title,
        description: desc,
        status: 'info',
        duration: 2000,
        isClosable: true,
    })
}