import { Suspense } from 'react';
import './index.scss';

export default function Loading() {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}

export const PageLoading = (
  <div className="fullPage flex-center">
    <Loading />
  </div>
);

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyComponent({ children, fallback }: LazyComponentProps) {
  return <Suspense fallback={fallback || PageLoading}>{children}</Suspense>;
}
