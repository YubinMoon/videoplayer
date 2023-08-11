// store.js

import { create } from 'zustand' // create로 zustand를 불러옵니다.

const useStore = create(set => ({
    path: "",
    newPath: () => {
        const path = decodeURIComponent(window.location.pathname)
        set({ path: path })
    },
}))

export default useStore