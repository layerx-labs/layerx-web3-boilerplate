import { ERC20 } from "@taikai/dappkit";
import { useCallback, useContext, useEffect } from "react";
import { DappkitProviderCtx } from "../context";
import useAsync from "./useAsync";
import { fromWei } from "web3-utils";

const useERC20TokenAllowance = (
  contractAddress: string,
  owner: string,
  spender: string
): {
  loading: boolean;
  error: string | null;
  allowed: string;
} => {
  const proxy = useContext(DappkitProviderCtx);
  // Execute Query when we have all the required arguments
  useEffect(() => {
    if (contractAddress && owner && spender) {
      execute();
    }
  }, [contractAddress, owner, spender]);

  const executeFunc = useCallback(async () => {
    const erc20 = new ERC20(proxy.getConnection(), contractAddress);
    await erc20.loadContract();
    return await erc20.allowance(owner, spender);
  }, [contractAddress, owner, spender]);

  const { loading, error, result, execute } = useAsync(executeFunc, false);
  const allowed = result
    ? fromWei(result.toLocaleString())
    : "";
  return { loading, error, allowed };
};

export default useERC20TokenAllowance;
