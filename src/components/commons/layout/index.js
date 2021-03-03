import Link from 'next/link';
import { withBasePath } from '../../../config';

const Layout = props => (
  <div>
    <div className="flex justify-end">
      <div className="flex justify-evenly">
        <Link scroll={false} href={withBasePath('/repos')}>
          <div>Git Hub </div>
        </Link>
        <span className="px-2">|</span>
        <Link scroll={false} href={withBasePath('/error-boundary')}>
          <div>Error Boundary</div>
        </Link>
      </div>
    </div>
    {props.children}
  </div>
);

export default Layout;
