import LicenseForm from '../components/license/LicenseForm';
import LicenseFilter from '../components/license/LicenseFilter';
import Licenses from '../components/license/Licenses';

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