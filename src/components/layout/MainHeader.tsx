import classes from './MainHeader.module.css';

const MainHeader: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React TypeScript Demo App</div>
    </header>
  );
};

export default MainHeader;
