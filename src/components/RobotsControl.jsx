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
    '/leaderboard',
    '/login',
    '/logout',
    '/forgot-password',
    '/reset-password',
    '/profile',
    '/user-management',
    '/add-user',
    '/edit-user',
    '/blog/submit',
    '/blog/dashboard',
    '/form',
    '/enquiry-form',
    '/client-form',
    '/achievements-form',
    '/add-review',
    '/analytics',
    '/media-dashboard',
    '/api-marketing-dashboard',
    '/client-enquiry',
    '/workflow-dashboard',
    '/cm-dashboard',
    '/jobs/create',
    '/job-applicants',
    '/candidate-profile',
    '/hr-messages',
    '/client-portal',
    '/client-dashboard',
    '/client-login',
    '/client/campaigns',
    '/my-invoices',
    '/my-subscription',
    '/dashboard/payments',
    '/ajnoradashboard',
    '/lottery',
    '/chocochi-spin',
    '/admin/suntips-claims',
    '/admin/posters',
    '/admin/reels',
    '/admin/lottery-claims',
    '/partners/dashboard',
    '/partners/manage',
    '/partners/register',
    '/partners/login',
    '/partners/create-portfolio',
    '/partners/create-influencer',
    '/team/admin',
    '/team/dashboard',
    '/admin/audit-reports',
    '/admin/resume-marketplace',
    '/audit-reports/view',
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
