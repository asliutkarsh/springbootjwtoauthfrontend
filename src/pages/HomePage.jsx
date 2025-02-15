import useAuthStore from "../store";

const HomePage = () => {
  const authStore = useAuthStore();

  if (authStore.error) {
    return <div>Error: {authStore.error}</div>;
  }

  if (authStore.loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>Home Page (Protected)</h2>
      {authStore.user && (
        <div>
          <p>Welcome, {authStore.user.username}!</p>
          <p>Email: {authStore.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
