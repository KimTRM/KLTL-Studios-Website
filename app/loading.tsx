export default function Loading() {
    return (
        <div style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: 'rgba(18, 18, 18, 0.85)',
                borderRadius: '12px',
                padding: '3rem 2rem',
                textAlign: 'center',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid rgba(220, 20, 60, 0.3)',
                    borderTop: '4px solid #dc143c',
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    animation: 'spin 1s linear infinite'
                }} />
                <p style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 500
                }}>Getting things ready&hellip;</p>
            </div>
        </div>
    );
}
