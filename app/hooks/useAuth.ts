import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from '@store';
import { loginSuccess, logout } from "@store/slices/auth.slice"

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const login = (username: string, password: string): boolean => {
        if (username === 'ali' && password === 'pass') {
            dispatch(
                loginSuccess({
                    token: 'fake-token-123',
                    user: { id: 1, name: username },
                }),
            );
            return true;
        }
        return false;
    };

    const logoutUser = async () => {
        await AsyncStorage.clear();
        dispatch(logout());
    };

    return {
        auth,
        login,
        logout: logoutUser,
    };
}
