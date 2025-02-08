import getAsyncStorageValue from './Storage'

export const config = () => {
    const token = getAsyncStorageValue('ACCESS_TOKEN')
    const axiosConfig = {
        baseURL: 'http://localhost:8080/',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    return axiosConfig
}