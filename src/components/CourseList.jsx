import Course from './Course';

const CourseList = ({courses, selected, toggleSelected, disabled}) => (
  <div className="course-list">
    { courses.map(([id, course]) => <Course key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected} disabled={disabled}/>) }
  </div>
);

export default CourseList;