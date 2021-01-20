import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      name,
      email,
      password,
    };
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>name</label>
        <input type='text' value={name} onChange={onNameHandler} />
        <label>password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <label>confirm password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
