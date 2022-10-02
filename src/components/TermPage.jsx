import { useState } from "react";
import CourseList from './CourseList';
import Modal from './Modal';
import Cart from './Cart';

const terms = {
  Fall: 'Fall',
  Winter: 'Winter',
  Spring: 'Spring'
};

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);


const TermPage = ({courses}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  const filteredCourse = Object.entries(courses).filter(([id, course]) => course.term == selection);

  return (
    <div>
        <TermSelector selection={selection} setSelection={setSelection} />
        <button className="btn btn-outline-dark schedule-btn" onClick={openModal}>
            <i className="bi bi-calendar"></i>
            <span className="schedule-title">course plan</span>
        </button>
        <Modal open={open} close={closeModal}>
            <Cart selected={selected} />
        </Modal>
        <CourseList courses={filteredCourse} selected={selected} toggleSelected={toggleSelected} />
    </div>
  )
};

export default TermPage;