const Footer = () => {
    let todaysYear = new Date().getFullYear();
    return (
        <footer className='footer'>
            <h4 className='text-center'>Copyright &copy; {todaysYear}</h4>
        </footer>
    )
}

export default Footer