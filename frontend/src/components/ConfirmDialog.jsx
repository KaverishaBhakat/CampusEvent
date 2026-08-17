import './ConfirmDialog.css'

function ConfirmDialog({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel, isBusy }) {
  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="confirm-box">
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-outline btn-sm" onClick={onCancel} disabled={isBusy}>
            Cancel
          </button>
          <button className="btn btn-danger btn-sm" onClick={onConfirm} disabled={isBusy}>
            {isBusy ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
