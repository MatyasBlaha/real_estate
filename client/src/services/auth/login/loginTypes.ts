export interface Credentials {
    username: string;
    password: string;
}

export type SetUser = (username: string) => void;
export type Navigate = (path: string) => void;
export type SetError = (err: string) => void;

export type LoginResult = {
    type: 'success' | 'error';
    message: string;
};
