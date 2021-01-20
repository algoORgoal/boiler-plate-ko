import axios from 'axios';
// import { response } from 'express';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    // null => 아무나 출입 가능
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // if client is not logged in
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
        } else {
          // if client is logged in
          if (adminRoute && !response.isAdmin) {
            props.history.push('/');
          } else {
            if (option === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
