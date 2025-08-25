function TopOfPage() {
  return (
    <div
      style={{
        zIndex: '1100',

        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        textShadow: `
          -1px -1px 0 #000,
           1px -1px 0 #000,
          -1px  1px 0 #000,
           1px  1px 0 #000
        `,
        fontWeight: 500,
        lineHeight: 2.6,
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontWeight: 700,
          fontSize: '2.5rem',
          textShadow: `
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `,
        }}
      >
        Learning Process
      </h1>
      <ol style={{ fontSize: 20 }}>
        <li>
          <strong>
            <abbr title="HyperText Markup Language">HTML</abbr>{' '}
          </strong>{' '}
          {' { HTML Crash Course For Absolute Beginners }'}
        </li>
        <li>
          <abbr title="Cascading Style Sheets">
            <strong>CSS</strong>
          </abbr>{' '}
          {'{ Learn CSS in 1 hour 🎨 }'}
        </li>
        <li>
          <strong>REACT</strong> {'{ React.js Basics in 90 Mins (Arabic) }'}
        </li>
      </ol>
    </div>
  );
}
export default TopOfPage;
