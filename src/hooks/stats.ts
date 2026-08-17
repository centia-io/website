import {useQuery} from '@tanstack/react-query'
import {Stats} from '@centia-io/sdk'

function useStats() {
    return useQuery({
        queryKey: ['stats'],
        queryFn: () => {
            const stat = new Stats()
            return stat.get()
        }
    })
}

export {useStats}
