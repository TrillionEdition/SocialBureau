import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function RobotsControl() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Paths that are admin, dashboard, or otherwise thin/private and should be noindexed
  const noindexRoutes = [
    '/admin',
    '/admin/',
    '/dashboard',
    '/user-management',
    '/client-portal',
    '/client-dashboard',
    '/client-login',
    '/ajnoradashboard',
    '/lottery',
    '/suntips-spin',
    '/admin/suntips-claims',
    '/admin/posters',
    '/admin/reels',
    '/admin/lottery-claims',
    '/partners/dashboard',
    '/partners/manage',
    '/team/admin',
    '/team/dashboard',
  ];

  const shouldNoIndex = noindexRoutes.some((r) => {
    const normalized = r.replace(/\/$/, '');
    return path === normalized || path.startsWith(normalized + '/');
  });

  if (!shouldNoIndex) return null;

  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
}
