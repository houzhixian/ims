
export function set_local(key, value) {
    localStorage.setItem(key, value)
}

export function del_local(key) {
    localStorage.removeItem(key)
}

export function set_session(key, value) {
    sessionStorage.setItem(key, value)
}

export function del_session(key) {
    sessionStorage.removeItem(key)
}


