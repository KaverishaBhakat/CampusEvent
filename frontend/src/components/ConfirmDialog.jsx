import { useEffect } from 'react'
import './ConfirmDialog.css'

function ConfirmDialog({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel, isBusy }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isBusy) {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel, isBusy])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isBusy) {
      onCancel()
    }
  }

  return (
    <div
      className="confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={handleBackdropClick}
    >
      <div className="confirm-box">
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button type="button" className="btn btn-outline btn-sm" onClick={onCancel} disabled={isBusy}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={onConfirm} disabled={isBusy}>
            {isBusy ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
