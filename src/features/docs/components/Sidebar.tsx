import React from 'react';

const Sidebar = () => {
  return (
    <nav>
      <ul className='space-y-4 p-4'>
        <li>
          <a href='#section1'>Introduction</a>
        </li>
        <li>
          <a href='#section2'>Getting Started</a>
        </li>
        <li>
          <a href='#section3'>API Reference</a>
        </li>
        <li>
          <a href='#section4'>Examples</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
