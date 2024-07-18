import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerStyle: {
      backgroundColor: "orange"
    }}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otpVerificationPage" options={{ headerShown: false }} />
      <Stack.Screen name="admin/adminDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="admin/projectDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="admin/createProject" options={{ headerShown: false }} />
    </Stack>
  );
}
