export default function DebugEnv(){
  return(
    <div>
      <h1>Env test</h1>
      <p>API= {process.env.NEXT_PUBLIC_API_BASE_URL || "undefined"}</p>
    </div>
  );
}