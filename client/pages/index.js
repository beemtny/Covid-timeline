import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import PatientInformation from '../component/PatientInformation';
import TimeLineEntry from '../component/TimeLineEntry';
import TimeLine from '../component/TimeLine';
import { validateInputData, convertTimeToUnix } from '../logic/validator';
import { insertEntry, fetchTimeline, deleteEntry } from './api/api';

export default function Home() {
  const initialState = {
    gender: '',
    age: '',
    occupation: '',
    timeFrom: '',
    timeTo: '',
    detail: '',
    locationType: '',
    locationName: ''
  };
  var [state, setState] = useState(initialState);
  var [timeline, setTimeline] = useState({});
  var [page, setPage] = useState(1); // handle again
  var [totalPage, setTotalPage] = useState(0);
  var [isLoading, setIsLoading] = useState(true);

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFieldChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handelSubmit = () => {
    console.log('state for submit is: ', state);

    try {
      validateInputData(state);
    } catch (e) {
      alert(e);
      return;
    }

    try {
      var unixTime = convertTimeToUnix(state['timeFrom'], state['timeTo']);
    } catch (e) {
      alert(e);
      return;
    }

    insertEntry({
      gender: state['gender'],
      age: Number(state['age']),
      occupation: state['occupation'],
      timeFrom: unixTime[0],
      timeTo: unixTime[1],
      detail: state['detail'],
      locationType: state['locationType'],
      locationName: state['locationName']
    })
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          timeFrom: '',
          timeTo: '',
          detail: '',
          locationType: '',
          locationName: ''
        });

        fetchTimelineToNewData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteEntry = (id) => {
    console.log(id);
    deleteEntry({ id: id })
      .then((res) => {
        console.log(res);
        fetchTimelineToNewData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log('use effect');
    fetchTimelineToNewData();
  }, []);

  const fetchTimelineToNewData = () => {
    setIsLoading(true);
    fetchTimeline()
      .then((res) => {
        console.log('timeline result is: ', res.data);
        setTimeline(res.data);
        setTotalPage(res.data.length);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  // console.log('state: ', state);

  return (
    <div>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          <h1 className={styles.center}> COVID Timeline Generator </h1>
          <PatientInformation
            handleFieldChange={handleFieldChange}
            state={state}
          />

          <h3>
            Timeline{' '}
            {page == 1 ? null : <button onClick={handlePrevPage}>PREV</button>}{' '}
            {page == totalPage || totalPage == 0 ? null : (
              <button onClick={handleNextPage}>NEXT</button>
            )}
          </h3>
          <div className={styles.gridTimeline}>
              {timeline[page - 1] != null ? (
                <TimeLine
                  timeline={timeline[page - 1]}
                  handleDeleteEntry={handleDeleteEntry}
                />
              ) : null}
            <TimeLineEntry
              handleFieldChange={handleFieldChange}
              handelSubmit={handelSubmit}
              state={state}
            />
          </div>
        </>
      )}
    </div>
  );
}
