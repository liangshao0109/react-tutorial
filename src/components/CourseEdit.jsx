const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} />
  </div>
);

const ButtonBar = ({message, disabled}) => {
    return (
        <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => window.location.href = "/"}>Cancel</button>
        <span className="p-2">{message}</span>
        </div>
    );
};

const CourseEdit = ({data}) => {
  const submit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={submit} noValidate>
      <InputField name="title" text="Title"/>
      <InputField name="meetingTime" text="Meeting Time"/>
      <ButtonBar />
    </form>
  )
};

export default CourseEdit;