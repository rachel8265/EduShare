import { createContext, Dispatch, useReducer } from "react";
import store from "./Store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { LoginUser, UserType } from "../../models/UserType";
import { router } from "../../router";
type action = {
    type: string,
    data: UserType|LoginUser
}

const state = (state: UserType|LoginUser, action: action): UserType|LoginUser => {
    switch (action.type) {
        case 'CREATE':
            return { ...state, ...action.data };
        case 'UPDATE':
            return { ...state, ...action.data };
        default:
            return state;
    }
}

export const UserContext = createContext<[UserType|LoginUser, Dispatch<action>]>([{} as UserType|LoginUser, () => { }]);

const UserReducer = () => {
    const [user, userDispatch] = useReducer(state, {} as UserType|LoginUser);

    return (
        <>
            <UserContext.Provider value={[user, userDispatch]}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </UserContext.Provider>
        </>
    );
}

export default UserReducer;
