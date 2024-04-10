export default function getAccessToken() {
  const token = localStorage.getItem("token");
  return `Bearer ${token}`;
}