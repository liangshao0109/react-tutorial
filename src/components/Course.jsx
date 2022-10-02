const Course = ({id, course, selected, toggleSelected}) => (
    <div className="card m-1 p-2" onClick={() => toggleSelected(course)}>
        <div className={`card-body ${selected.includes(course) ? 'selected' : ''}`}>
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <p className="card-text">{course.title}</p>
        <hr />
        <p className="card-text">{course.meets}</p>
        </div>
    </div>
);
  
export default Course;