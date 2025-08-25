'use client';

import Link from 'next/link';

export default function ProgressTable() {
  return (
    <>
      <Link
        href="/"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          display: 'flex',
          borderRadius: '40px',
          zIndex: '9999',
          color: '#f2f2f2',
          cursor: 'pointer',
          flexDirection: 'column',
          backgroundColor: 'black',
          padding: '9px',
        }}
      >
        Back
      </Link>
      <table>
        <thead>
          <tr>
            <th>subject</th>
            <th>progress</th>
            <th>rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTML</td>
            <td>50%</td>
            <td>5/5</td>
          </tr>
          <tr>
            <td>CSS</td>
            <td>10%</td>
            <td>/5</td>
          </tr>
          <tr>
            <td>REACT</td>
            <td>5%</td>
            <td>/5</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
