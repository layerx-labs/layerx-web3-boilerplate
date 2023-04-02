// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GenIA_Token is IERC20 {
    string public constant name = "GenIA";
    string public constant symbol = "GENIA";
    uint8 public constant decimals = 18;
    uint256 private totalSupplyVar;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;

    constructor(uint256 _initialSupply) {
        totalSupplyVar = _initialSupply;
        balances[msg.sender] = _initialSupply;
        emit Transfer(address(0), msg.sender, _initialSupply);
    }

    function totalSupply() external view override returns (uint256) {
        return totalSupplyVar;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return allowances[owner][spender];
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, allowances[sender][msg.sender] - amount);
        return true;
    }

    function burn(address _account, uint256 _amount) external payable returns(bool) {
        _burn(_account, _amount);
        return true;
    }

    function _transfer(address _sender, address _recipient, uint256 _amount) private {
        require(_sender != address(0), "transfer from the zero address");
        require(_recipient != address(0), "transfer to the zero address");
        require(balances[_sender] >= _amount, "transfer amount exceeds balance");
        balances[_sender] -= _amount;
        balances[_recipient] += _amount;
        emit Transfer(_sender, _recipient, _amount);
    }

    function _approve(address _owner, address _spender, uint256 _amount) private {
        require(_owner != address(0), "approve from the zero address");
        require(_spender != address(0), "approve to the zero address");
        allowances[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }

    function _burn(address _account, uint256 _amount) internal {
        require(_account != address(0), "burn from the zero address");
        require(balances[_account] >= _amount, "burn amount exceeds balance");
        balances[_account] -= _amount;
        totalSupplyVar -= _amount;
        emit Transfer(_account, address(0), _amount);
    }
}