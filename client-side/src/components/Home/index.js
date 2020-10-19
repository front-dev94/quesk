import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import classnames from "classnames";
import { queryString } from './../../utils/helpers/queryString';

import QuestionService from './../../services/QuestionService';
import UserService from './../../services/UserService';

import {QuestionCard} from '../Question';
import PageContent from './../PageContent';
import UserCard from '../UserCard';

import { TAB, TABS, PAGE_TITLE } from './constants';

import './style.scss';

const Home = () => {
  const [activeTab, setActiveTab] = useState(TAB.RECENT_QUESTIONS);
  const [tabData, setTabData] = useState({
    page: 1,
    size: 10,
    count: 0,
    payload: []
  });

  useEffect(() => {
    getData();
  }, [activeTab]);

  const toggleTab = async (tabName) => {
    setActiveTab(tabName);
    setTabData({
      page: 1,
      size: 10,
      count: 0,
      payload: []
    })
  }
  
   const getData = async (page = tabData.page, size = tabData.size) => {
    switch (activeTab) {
      case TAB.RECENT_QUESTIONS:
        await getQuestions(page, size, {createdAt: -1})        
        break;
      case TAB.TOP_USERS:
          await getTopNUsers(page, size, {answerScore: -1});        
          break;
      case TAB.MOST_LIKED_QUESTIONS:
          await getQuestions(page, size, {voteScore: -1})       
          break;
      default:
        break;
    }
  }

  const getQuestions = async (page, size, sortBy) => {
    const questions = await QuestionService.getAllQuestions(queryString({page, size, ...sortBy}));
    
    if(!questions.error && questions.data){
      setTabData(questions.data)
    }
    else {
      setTabData({
        page: 1,
        size: 10,
        count: 0,
        payload: []
      })
    }
  }

  const getTopNUsers = async (page, size, sortBy) => {
    const users = await UserService.getTopNUsers(queryString({page, size, ...sortBy}));
    
    if(!users.error && users.data){
      setTabData(users.data)
    }
    else {
      setTabData({
        page: 1,
        size: 10,
        count: 0,
        payload: []
      })
    }
  }

  const handleLoadMore = async () => {
    let sortBy = (activeTab === TAB.RECENT_QUESTIONS) ? {createdAt: -1} 
      : (activeTab === TAB.RECENT_QUESTIONS) ? {answerScore: -1} 
      : {voteScore: -1};

    let query = {page: tabData.page + 1, size: tabData.size, ...sortBy};

    const response = (activeTab === TAB.RECENT_QUESTIONS || activeTab === TAB.MOST_LIKED_QUESTIONS) ? 
      await QuestionService.getAllQuestions(queryString(query)) : await UserService.getTopNUsers(queryString(query));

    if(!response.error && response.data){
      setTabData({
        ...response.data,
        payload: tabData.payload.concat(response.data.payload)
      })
    }
  }

  const renderTabData = () => {
    if(tabData.payload && tabData.payload.length > 0){
      return (
        <Row>
          {tabData.payload.map((item, idx) => {
              return activeTab === TAB.RECENT_QUESTIONS || activeTab === TAB.MOST_LIKED_QUESTIONS ? 
              <QuestionCard question={item} key={idx} /> 
              : <UserCard user={item} isTopPerformer={true} key={idx} />
            })}
        </Row>
      )
    }
  }
  
  return (
    <PageContent title={PAGE_TITLE}>
      <div className="d-flex">
        <div className="tabs">
          {TABS.map((item, idx) => {
            console.log(activeTab)
            return (
              <button
                key={idx}
                disabled={activeTab === item.value}
                className={classnames("tab-item", activeTab === item.value ? "active" : "")} 
                onClick={() => { toggleTab(item.value) }}>
                  {item.name}
              </button>
            )
          })}
        </div>
      </div>
      {renderTabData()}
      {tabData.payload.length < tabData.count && <div className="load-more">
        <button onClick={() => handleLoadMore()}>Load more</button>
      </div>}
    </PageContent>
  );
};

export default Home;