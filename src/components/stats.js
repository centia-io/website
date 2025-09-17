import {useStats} from '../hooks/stats'

function Stats(props) {
    if (props.status.auth === false) {
        return null
    }

    const {data, error, isFetching} = useStats()

    return (
        <div className="card margin-top--md">
            <div className="card__header">
                <h3 className="margin-bottom--none">System Statistics</h3>
            </div>
            <div className="card__body">
                {isFetching && <div>Loading...</div>}

                {!isFetching && error && (
                    <div className="alert alert--danger" role="alert">
                        An error has occurred: {error.message}
                    </div>
                )}

                {!isFetching && !error && data && (
                    <>
                        <table className="table table--striped">
                            <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Number of Tables</td>
                                <td>{data.stat.number_of_tables}</td>
                            </tr>
                            <tr>
                                <td>Total Size</td>
                                <td>{data.stat.total_size}</td>
                            </tr>
                            <tr>
                                <td>Cost</td>
                                <td>{Math.round(parseFloat(data.stat.cost))} units</td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    )
}

export default Stats
