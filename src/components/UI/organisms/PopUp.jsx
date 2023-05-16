
export default function PopUp({render, onClose}) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-close">
          <button onClick={() => onClose()}>X</button>
        </div>
        {render}
      </div>
    </div>
  )
}
