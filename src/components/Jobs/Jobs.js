import React, { useReducer, useCallback, useMemo } from 'react';
import JobList from './JobList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const jobReducer = (currentJobs, action) => {
  switch (action.type) {
    case 'SET':
      return action.jobs;
    default:
      throw new Error('Should not get there!');
  }
};

const Jobs = () => {
  const [ userJobs, dispatch ] = useReducer(jobReducer, []);
  const {
    error,
    clear
  } = useHttp();

  const filteredJobsHandler = useCallback(filteredJobs => {
    dispatch({ type: 'SET', jobs: filteredJobs });
  }, []);

  const jobList = useMemo(() => {
    return (
        <JobList
        jobs={ userJobs }
      />
    );
  }, [ userJobs ]);

  return (
      <div className="App">
          {error && <ErrorModal onClose={ clear }>{error}</ErrorModal>}

          <section>
              <Search onLoadJobs={ filteredJobsHandler } />
              {jobList}
          </section>
      </div>
  );
};

export default Jobs;
