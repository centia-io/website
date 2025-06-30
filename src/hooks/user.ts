import {useQuery} from '@tanstack/react-query'
import {Users} from '@mapcentia/gc2-js-client'

function useUser(userId: string) {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const users = new Users()
            return users.get(userId)
        }
    })
}

export {useUser}
