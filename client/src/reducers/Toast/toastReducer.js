export const toastReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [...state.toasts, action.payload],
            };

            case "DELETE_TOAST":
                const updateToasts = state.toasts.filter(
                    (toast) => toast.id !== action.payload
                );
                return {
                   ...state,
                    toasts: updateToasts,
                };

        default :
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}