import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import TwitterLogo from '../styles/assets/twitter-logo.png';
import React from 'react';
import '../styles/landing.css'
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className='main'>
      <div className='wrapper'>
        <div className='left'>
          <div className='items-wrapper'>
            <div className='item'>
              <span className='icon'>
                <FontAwesomeIcon aria-hidden='true' icon={faSearch} />
              </span>
              <span className='label'>Follow you'r Interests.</span>
            </div>

            <div className='item'>
              <span className='icon'>
                <FontAwesomeIcon aria-hidden='true' icon={faUser} />
              </span>
              <span className='label'>Hear what people are talking about.</span>
            </div>

            <div className='item'>
              <span className='icon'>
                <FontAwesomeIcon aria-hidden='true' icon={faComment} />
              </span>
              <span className='label'>Join the conversation</span>
            </div>
          </div>
        </div>

        <div className='center'>
          <img
            src={TwitterLogo}
            alt='logo'
            style={{ width: '50px' }}
            className='logo'
          />
          <h1>
            See what's happening in <br />
            the world right now
          </h1>
          <span>Join Twitter today.</span>
          <Link to='/signup' className='btn-sign-up'>
            Sign up
          </Link>
          <Link to='/login' className='btn-login'>
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
