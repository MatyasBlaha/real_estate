

export interface Credentials {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type SetError = (err: string) => void;