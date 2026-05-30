import React from 'react';
import cls from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../shared/config/routerConfig';

const Sidebar = () => {
  return (
    <div className={cls.Sidebar}>
      <ul>
        <li>
          <Link to={RouterPath.main}>Main</Link>
        </li>
        <li>
          <Link to={RouterPath.recipe}>Recipe</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
