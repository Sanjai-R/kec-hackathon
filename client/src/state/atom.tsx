import { atom } from 'recoil';

export const userAtom = atom({
    key: 'user',
    default: {
        email: '',
    },
});

export const loadingAtom = atom({
    key: 'loading',
    default: false,
})