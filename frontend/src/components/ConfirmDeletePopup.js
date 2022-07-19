import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  function handleConfirmDeleteSubmit(e) {
    e.preventDefault();
    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleConfirmDeleteSubmit}
      isLoading={props.isLoading}
      name={"confirm"}
      title={"Вы уверены?"}
      button={"Да"}
      buttonLoading={"Удаление..."}
    />
  );
}

export default ConfirmDeletePopup;
