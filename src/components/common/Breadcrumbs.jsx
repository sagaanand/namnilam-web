import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="breadcrumbs-bar">
      <div className="container">
        <ul className="breadcrumbs-list">
          <li>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Home size={14} color="var(--color-gold-dark)" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <React.Fragment key={idx}>
                <li className="breadcrumb-separator">
                  <ChevronRight size={13} />
                </li>
                <li>
                  {isLast || !item.path ? (
                    <span className="breadcrumb-current">{item.label}</span>
                  ) : (
                    <Link to={item.path}>{item.label}</Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
