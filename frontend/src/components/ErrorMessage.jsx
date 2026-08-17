import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>
        <strong>Something went wrong.</strong> {message || 'Please try again.'}
      </p>
      {onRetry && (
        <button className="btn btn-outline btn-sm" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
