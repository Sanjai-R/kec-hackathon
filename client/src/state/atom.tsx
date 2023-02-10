import { atom } from 'recoil';

export const userAtom = atom({
    key: 'user',
    default: {
        email: '',
        name: '',
        contact: '',
        role: {
            type: '',
            collection: '',
        },
        _id: '',
    },
});

export const loadingAtom = atom({
    key: 'loading',
    default: false,
})