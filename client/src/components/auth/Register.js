

const Register = (props) => {
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         props.history.push('/');
    //     }
    //     if(error === 'User already exists'){
    //         setAlert(error, 'danger');
    //         clearErrors();
    //     }
    //     //eslint-disable-next-line
    // },[error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('Please Enter All Fields');
        } else if (password !== password2) {
            setAlert('Passwords do not match')
        } else {
            register({
                name,
                email,
                password
            })
        }
    }

    const { name, email, password, password2 } = user;
    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" minLength="6" name='password' value={password} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password"  minLength="6" name='password2' value={password2} onChange={onChange} />
                </div>
                <input type="submit" value="register" className="btn btn-primary btn-block" />
            </form>
            
        </div>
    )
}

export default Register