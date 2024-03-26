const Notification = ({ color, message}) => {
    if (! message) return null

    const styles = {
        backgroundColor: 'lightgrey',
        border: `2px solid ${color}`,
        borderRadius: '6px',
        color: color,
        padding: '8px',
        margin: '8px'
    }

    return (
        <div style={styles}>
            {message}
        </div>
    )
}

export default Notification