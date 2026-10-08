// Who's signed in. There are no accounts yet, so nobody is: everyone sees "Log in to write a review".
// The sign-in step replaces this with the real Supabase session, without changing the components
// that call it.
export function useSignedIn() {
  return false;
}
