import Card from '../UI/Card';
import classes from './WalletDetails.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

interface Props {
  isLoading: boolean;
  errorEthBalance: string | null;
  ethBalance: string;
  errorGuardianCount: string | null;
  guardianCount: number | null;
  errorERC20TokenBalance: string | null;
  ERC20TokenBalances: {} | null;
}

const WalletDetails: React.FC<Props> = ({
  isLoading,
  errorEthBalance,
  ethBalance,
  errorGuardianCount,
  guardianCount,
  errorERC20TokenBalance,
  ERC20TokenBalances,
}: Props) => {
  return (
    <Card>
      <div className={classes.details}>
        {isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div>
          <h3>Eth Balance</h3>
          {errorEthBalance && <div>{errorEthBalance}</div>}
          {!isLoading && !errorEthBalance && ethBalance && (
            <p>{ethBalance + ' ETH'}</p>
          )}
        </div>

        <div>
          <h3>Guardian Count</h3>
          {errorGuardianCount && <div>{errorGuardianCount}</div>}
          {!errorGuardianCount && guardianCount && <p>{guardianCount}</p>}
        </div>

        <div>
          <h3>ERC20 Token Balances</h3>
          {errorERC20TokenBalance && <div>{errorERC20TokenBalance}</div>}
          {!isLoading && !errorERC20TokenBalance && ERC20TokenBalances && (
            <ul>
              {Object.entries(ERC20TokenBalances).map(([k, v]) => (
                <li key={k}>
                  {k}: {v}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WalletDetails;
