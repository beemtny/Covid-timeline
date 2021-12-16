import styles from '../styles/Home.module.css';

const TimeLine = ({ timeline, handleDeleteEntry }) => {
  // console.log("timeline is: ", timeline);
  var { Gender, Age, Occupation, Timeline } = timeline;
  var visitedPlace = [];
  var sortedVisitedPlace = [];
  var entry = {};
  var arrEntry = [];
  var arrKey = [];

  Timeline.forEach((element) => {
    var dateTimeFrom = new Date(element.TimeFrom).toLocaleString('en-GB');
    var dateTimeTo = new Date(element.TimeTo).toLocaleString('en-GB');
    var date = dateTimeFrom.substring(0, 10);
    var timeFrom = dateTimeFrom.substring(12, 17);
    var timeTo = dateTimeTo.substring(12, 17);

    element['formatTimeFrom'] = timeFrom;
    element['formatTimeTo'] = timeTo;

    if (entry[date] == undefined) {
      entry[date] = [];
      arrKey.push(date);
    }
    entry[date].push(element);
    element['Location'] != '' ? visitedPlace.push(element['Location']) : null;
  });

  for (var item in entry) {
    arrEntry.push({ [item]: entry[item] });
  }

  sortedVisitedPlace = visitedPlace
    .sort()
    .filter((it, i, ar) => ar.indexOf(it) === i);

  // console.log(sortedVisitedPlace);

  return (
    <div className={styles.gridTimeline1}>
      <div className={styles.profileSummary}>
        <small> {Gender} </small>
        <>{Age} years old </>
        <small> {Occupation} </small>
      </div>
      <div>
        <ul className={styles.timeline}>
          {arrKey.map((item, index) => (
            <li key={index}>
              <div>
                <span className={styles.date}> {item} </span>
                <span className={styles.circle} />
              </div>
              <div className={styles.timelineContainer}>
                {entry[item].map((timeline, index) => (
                  <div className={styles.timelineContent} key={index}>
                    <div>
                      <span className={styles.textYellow}>
                        {timeline.formatTimeFrom} - {timeline.formatTimeTo}{' '}
                      </span>
                    </div>
                    <div className={styles.addSpaceLeft}>
                      <span>
                        {timeline.Detail != '' ? timeline.Detail : '-'}{' '}
                      </span>
                      <p className={styles.textBlue}>
                        {timeline.LocationType}
                        {timeline.Location != ''
                          ? '- ' + timeline.Location
                          : ''}{' '}
                      </p>
                    </div>
                    <span
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteEntry(timeline.ID)}
                    >
                      {' '}
                      X{' '}
                    </span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5> Visited Places </h5>
        {sortedVisitedPlace.map((place, index) => (
          <span className={styles.addSpaceRight} key={index}>
            {' '}
            {place}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
