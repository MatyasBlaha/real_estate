import { toast } from 'react-toastify';

export const notify = (message: string, type: 'success' | 'warning' | 'error') => {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'warning') {
        toast.warning(message);
    } else if (type === 'error') {
        toast.error(message);
    }
}
