import { Fragment } from 'react';
import classes from './Layout.module.css';

import MainHeader from './MainHeader';

interface Props {
  children: React.PropsWithChildren<{}>;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <Fragment>
      <MainHeader />
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
