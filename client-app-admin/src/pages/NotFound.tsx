import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const NotFound = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="notFound" />

      <h1 className="text-center">Not Found Page</h1>
    </DefaultLayout>
  );
};

export default NotFound;
