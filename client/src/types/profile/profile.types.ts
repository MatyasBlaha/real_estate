interface ProfileCredentials {
    firstName: string;
    lastName: string;
    description: string;
    avatar: string;
}

interface ProfileFormProps {
    onSubmit: (data: FormData) => void;
    registeredName: string;
}

export {ProfileCredentials, ProfileFormProps}