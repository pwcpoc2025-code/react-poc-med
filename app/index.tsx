import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // Redirect to the Login screen on app start
  return <Redirect href="/screens/authentication/LoginScreen" />;
}
