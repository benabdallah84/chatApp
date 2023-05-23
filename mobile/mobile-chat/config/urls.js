const SOCKET = 'ws://1922.168.56.212:3001'
const API = 'http://192.168.56.212:3001'
const Urls ={
    SOCKET: SOCKET,
    API: API,
    AUTH: API + '/api/auth',
    REGISTER: API + '/api/auth/register',
    UPDATE_PROFILE: API + '/api/account',
    CHANGE_PASSWORD : API + '/api/account/password',
    AVATARS: API + '/uploads/'
}
export default Urls