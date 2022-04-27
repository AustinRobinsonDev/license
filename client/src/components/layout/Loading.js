import spinner from './spinner.gif';

export const loading = () => {
  return (
  <>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
  )
  };