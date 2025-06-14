import Action from "@/lib/action";

export default async function Profile() {
  const res = await Action();
  return (
    <>
      <h1>Profile</h1>
      {JSON.stringify(res)}
    </>
  );
}
