import { ERC20 } from "@taikai/dappkit";
import { useEffect, useContext, useCallback } from "react";
import { DappkitProviderCtx } from "../context";
import useAsync from "./useAsync";

const useERC20Balance = (
  contractAddress: string,
  address: string
): {
  loading: boolean;
  error: string | null;
  balance: number;
} => {
  const proxy = useContext(DappkitProviderCtx);

  useEffect(() => {
    if (contractAddress && address) {
      execute();
    }
  }, [contractAddress, address]);

  const executeFunc = useCallback(async () => {
    const erc20 = new ERC20(proxy.getConnection(), contractAddress);
    await erc20.loadContract();
    return erc20.getTokenAmount(address);
  }, [contractAddress, address]);

  const { loading, error, result, execute } = useAsync(executeFunc, false);

  return { loading, error, balance: result ? parseInt(result) : 0 };
};

export default useERC20Balance;
