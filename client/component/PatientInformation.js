import styles from '../styles/Home.module.css';

const PatientInformation = ({ handleFieldChange, state }) => {
  return (
    <div>
      <h3>Patient Information</h3>
      <div className={styles.gridPatient}>
        <div className={styles.gridPatient1}>
          <p>Gender</p>
          <select
            id='gender'
            name='gender'
            onChange={handleFieldChange}
            value={state['gender']}
          >
            <option value=''></option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className={styles.gridPatient2}>
          <p>Age</p>
          <input
            type='number'
            id='age'
            name='age'
            value={state['age']}
            onChange={handleFieldChange}
          ></input>
        </div>
        <div className={styles.gridPatient3}>
          <p>Occupation</p>
          <input
            type='text'
            id='occupation'
            name='occupation'
            value={state['occupation']}
            onChange={handleFieldChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientInformation;
