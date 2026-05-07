import {useStats} from '../hooks/stats'
import styles from './consoleWidgets.module.css'

function formatCount(value) {
    const count = Number(value)
    if (Number.isNaN(count)) {
        return '0'
    }
    return new Intl.NumberFormat('en-US').format(count)
}

function formatUsage(value) {
    const usage = Number(value)
    if (Number.isNaN(usage)) {
        return '0 units'
    }
    return `${Math.round(usage)} units`
}

function Stats(props) {
    if (props.status.auth === false) {
        return null
    }

    const {data, error, isFetching} = useStats()
    const stat = data ?? {}
    const tables = Array.isArray(stat.tables) ? stat.tables : []

    return (
        <div className={`card ${styles.card}`}>
            <div className="card__header">
                <h3 className={styles.cardTitle}>System Statistics</h3>
            </div>
            <div className="card__body">
                {isFetching && <div className={styles.status}>Loading statistics...</div>}

                {!isFetching && error && (
                    <div className="alert alert--danger" role="alert">
                        An error has occurred: {error.message}
                    </div>
                )}

                {!isFetching && !error && data && (
                    <>
                        <div className={styles.statsGrid}>
                            <article className={styles.statCard}>
                                <span className={styles.statLabel}>Tables</span>
                                <strong className={styles.statValue}>{formatCount(stat.number_of_tables)}</strong>
                            </article>
                            <article className={styles.statCard}>
                                <span className={styles.statLabel}>Total size</span>
                                <strong className={styles.statValue}>{stat.total_size || '0 B'}</strong>
                            </article>
                            <article className={styles.statCard}>
                                <span className={styles.statLabel}>Usage</span>
                                <strong className={styles.statValue}>{formatUsage(stat.cost)}</strong>
                            </article>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Stats
