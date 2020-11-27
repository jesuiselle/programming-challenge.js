import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadJobs } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ''
            : `?search.query="${ enteredFilter }"`;
        sendRequest(
            'https://staging-api.joblocal.de/v4/search-jobs' + query,
            'GET'
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedJobs = [];
      for (const key in data.included) {
        const job = data.included[ key ]

        loadedJobs.push({
          id: key,
          title: job.attributes.title,
          responsibilities : job.attributes.responsibilities,
          logo: job.attributes.company.logo,
          companyName: job.attributes.company.name,
          companyCity: job.attributes.company.city
        });
      }
      onLoadJobs(loadedJobs);
    }
  }, [ data, isLoading, error, onLoadJobs ]);

  return (
      <section className="search">
        {error && <ErrorModal onClose={ clear }>{error}</ErrorModal>}
        <Card>
          <div className="search-input">
            <span className="input-group">
              <input
                  ref={ inputRef }
                  type="text"
                  name="input-search"
                  id="input-search"
                  value={ enteredFilter }
                  onChange={ event => setEnteredFilter(event.target.value) }
                  placeholder="Tippen Sie hier..."/>
                <label htmlFor="text-1542372332072">Tippen Sie hier...</label>
                <div className="req-mark">{isLoading && <div className="search-loading">Laden von...</div>}😃</div>
            </span>
          </div>
        </Card>
      </section>
  );
});

export default Search;
