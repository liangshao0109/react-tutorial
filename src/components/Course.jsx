import { Link } from 'react-router-dom';

const Course = ({id, course, selected, toggleSelected, disabled}) => (
    <div className="card m-1 p-2" onClick={() => disabled.includes(course) ? null : toggleSelected(course)}>
        <div className={`card-body ${selected.includes(course) ? 'selected' : ''} ${disabled.includes(course) ? 'disabled' : ''}`}>
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <p className="card-text">{course.title}</p>
        <hr />
        <p className="card-text">{course.meets}</p>
        <p><Link to={`/courses/${id}/edit`}><i className="bi bi-pencil-square"></i></Link></p>
        </div>
    </div>
);
  
export default Course;