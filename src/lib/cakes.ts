
interface validationResponse {
    isValid: boolean,
    messages: string[],
    validatedObject?: any
}

export const validate = (possibleCake: any) => {
    //Some basic validation
    if (!possibleCake.name) {
        return {
            isValid: false,
            messages: ["name required"]
        }
    }
    if (!possibleCake.yumFactor || typeof (possibleCake.yumFactor) !== 'number' || possibleCake.yumFactor < 1 || possibleCake.yumFactor > 5) {
        return {
            isValid: false,
            messages: ["'yumFactor' required on body, and must be number 1-5"]
        }
    }

    return {
        isValid: true,
        validatedObject: {
            name: possibleCake.name,
            yumFactor: possibleCake.yumFactor,
            comment: possibleCake.comment,
            imageURL: possibleCake.imageURL
        }
    }
}