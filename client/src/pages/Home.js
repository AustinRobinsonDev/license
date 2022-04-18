import LicenseForm from '../components/license/LicenseForm';
import LicenseFilter from '../components/license/LicenseFilter';



const Home = (props) => {

    return (
        <div>
            <div>
                <LicenseForm />
            </div>
            <div>
                <LicenseFilter />
                <Licenses />
            </div>
        </div>
    )
}

export default Home