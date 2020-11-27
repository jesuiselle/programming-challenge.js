import React from 'react';
import Card from '../UI/Card';
import './JobList.css';

const JobList = props => {
  return (
      <section className="job-list">
          {props.jobs.map(ig => (
              <Card key={ ig.id }>
                  <article className="job-card">
                      <a href="!#" className="job-card__link">
                          <div className="job-card__icon">
                              <img src={ ig.logo } alt=""/>
                          </div>
                          <div className="job-card__media">
                              <p>{ig.responsibilities}</p>
                          </div>
                          <div className="job-card__header">
                              <h3 className="job-card__header-title">{ig.title}</h3>
                              <p className="job-card__header-meta">_ beim {ig.companyName} im {ig.companyCity}</p>
                              <div className="job-card__header-icon">
                                  <svg viewBox="0 0 28 25">
                                      <path fill="#f2a900"
                                            d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"/>
                                  </svg>
                              </div>
                          </div>
                      </a>
                  </article>
              </Card>
          ))}
      </section>
  );
};

export default JobList;
