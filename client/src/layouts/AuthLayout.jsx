import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, altLabel, altRoute, children }) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50 p-4">
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-6">{children}</div>
      <p className="mt-6 text-sm text-slate-600">
        {altLabel}{" "}
        <Link className="font-semibold text-blue-600 hover:text-blue-500" to={altRoute}>
          {altRoute === "/login" ? "Login" : "Register"}
        </Link>
      </p>
    </div>
  </div>
);

export default AuthLayout;
