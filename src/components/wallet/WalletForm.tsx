import { useEffect, useRef } from 'react';
import Card from '../UI/Card';
import classes from './WalletForm.module.css';

interface Props {
  onSubmitHandler: (wallet: string) => void;
}

const WalletForm: React.FC<Props> = ({ onSubmitHandler }: Props) => {
  const walletInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!walletInputRef.current) {
      return;
    }
    walletInputRef.current.focus();
  }, []);

  const onWalletSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!walletInputRef.current) {
      return;
    }
    const enteredWallet = walletInputRef.current.value;
    onSubmitHandler(enteredWallet);
  };
  return (
    <Card>
      <form onSubmit={onWalletSubmit}>
        <div className={classes.control}>
          <label htmlFor="wallet">Wallet Address</label>
          <input type="text" id="wallet" ref={walletInputRef} />
        </div>
        <div className={classes.actions}>
          <button type="submit" className="btn">
            Fetch Wallet
          </button>
        </div>
      </form>
    </Card>
  );
};

export default WalletForm;
