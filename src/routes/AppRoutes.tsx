import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../modules/Home/pages/Home';
import Editor from '../modules/Home/pages/Editor';
import Login from '../modules/Auth/pages/Login';
import Logout from '../modules/Auth/pages/Logout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
