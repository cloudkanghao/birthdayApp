import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import AppNavigator from './route/tabs';
import AppNavigator from './route/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

export default () => (
  <ToastProvider>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator/>
    </ApplicationProvider>
  </ToastProvider>
);