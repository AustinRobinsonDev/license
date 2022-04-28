import spinners from './spinner.gif';

export const spinner = () => {
  return (
  <>
  <h1>spinner GIF</h1>
    <img
      src={spinners}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
  )
  };