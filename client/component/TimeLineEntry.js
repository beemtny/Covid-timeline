import styles from '../styles/Home.module.css';

const TimeLineEntry = ({ handleFieldChange, handelSubmit, state }) => {
  return (
    <div className={styles.gridTimeline2}>
      <div className={styles.gridForm}>
        <div className={styles.gridFormItem1}>
          <p> Form </p>
          <input
            type='datetime-local'
            id='timeFrom'
            name='timeFrom'
            value={state['timeFrom']}
            onChange={handleFieldChange}
          />
        </div>
        <div className={styles.gridFormItem2}>
          <p> To </p>
          <input
            type='time'
            id='timeTo'
            name='timeTo'
            value={state['timeTo']}
            onChange={handleFieldChange}
          />
        </div>
        <div className={styles.gridFormItem3}>
          <p> Detail </p>
          <textarea
            type='text'
            id='detail'
            name='detail'
            rows='5'
            value={state['detail']}
            onChange={handleFieldChange}
          />
        </div>
        <div className={styles.gridFormItem4}>
          <p> Location Type </p>
          <select
            id='locationType'
            name='locationType'
            value={state['locationType']}
            onChange={handleFieldChange}
          >
            <option value=''></option>
            <option value='INDOOR'>INDOOR</option>
            <option value='OUTDOOR'>OUTDOOR</option>
            <option value='HOME'>HOME</option>
            <option value='TRAVELLING'>TRAVELLING</option>
          </select>
        </div>
        <div className={styles.gridFormItem5}>
          <p> Location Name </p>
          <input
            type='text'
            id='locationName'
            name='locationName'
            value={state['locationName']}
            onChange={handleFieldChange}
          ></input>
        </div>
        <div className={styles.gridFormItem6}>
          <button
            type='button'
            onClick={handelSubmit}
            className={styles.addBtn}
          >
            {' '}
            + Add Entry{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeLineEntry;
