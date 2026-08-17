import {useQuery} from '@tanstack/react-query'
import {Users} from '@centia-io/sdk'

function useUser(userId: string) {
    return useQuery({
        queryKey: ['user'],
        enabled: !!userId,
        queryFn: () => {
            const users = new Users()
            return users.get(userId)
        }
    })
}

export {useUser}
