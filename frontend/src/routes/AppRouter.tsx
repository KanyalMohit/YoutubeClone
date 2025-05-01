import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";


export default function AppRouter() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    );
  }