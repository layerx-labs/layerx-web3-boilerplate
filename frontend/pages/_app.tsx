import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useReducer, useState } from 'react';
import Link from 'next/link';
import {DappkitProviderCtx, defaulDappkitProvider} from '../context';
import { ethers } from 'ethers';

import { 
  Icon, 
  HorizontalNav, 
  Button,
  ModalDrawer,
  ModalFooter
} from '@taikai/rocket-kit';

import Form from '.';
import NavBar from '@/components/NavBar';
import MyCoverage from './my-coverage'; 

function MyApp({ Component, pageProps }: AppProps) {
 
  return (
    <DappkitProviderCtx.Provider value={defaulDappkitProvider}>
        <NavBar />
        <Component {...pageProps} />
    </DappkitProviderCtx.Provider>
  );
}

export default MyApp
