import React from 'react'
import Footer from '../components/Footer'
import { TeamHeader } from '../components/TeamHeader'
import TeamSection from '../components/TeamSection'
import Testimonials from '../components/Testimonials'
import Seo from '../components/Seo'
import { useQuery } from '@tanstack/react-query'
import { teamService } from '@/services/teamService'

/**
 * OurTeam page
 *
 * Data flow:
 *   React Query (client memory, stale 24 h)
 *     → sessionStorage (browser tab cache, 24 h TTL)
 *       → Backend GET /team (Redis-cached, 24 h TTL)
 *
 * If the API call fails the page falls back to the static
 * data already baked into TeamSection so visitors never see
 * a broken page.
 */
export const OurTeam = () => {
  const { data: teamData, isLoading, isError } = useQuery({
    queryKey: ['team'],
    queryFn: () => teamService.getTeam(),
    staleTime: 1000 * 60 * 60 * 24,   // 24 hours — treat as fresh for a full day
    gcTime:    1000 * 60 * 60 * 24,   // keep in React Query cache for 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  })

  return (
    <div>
      <Seo
        title="Leadership & Team | SocialBureau & TrillionEdition LLP | Marketing Innovators in India"
        description="Meet the SocialBureau team and TrillionEdition LLP management, a powerhouse of creative agency leadership, content production experts, performance marketing, and API-driven digital innovation."
        keywords="socialbureau team, trillionedition llp management, marketing agency india team, creative agency leadership, content production experts, performance marketing team, api marketing professionals, digital marketing agency staff, socialbureau directors, marketing innovators india"
        image="/assets/socialbureau.png"
        canonicalUrl="https://www.socialbureau.in/our-team"
        url="https://www.socialbureau.in/our-team"
      />
      <TeamHeader />
      {/*
        Pass fetched teamData to TeamSection.
        If data is still loading or errored, TeamSection falls back to
        its built-in static teamData object automatically.
      */}
      <TeamSection teamData={(!isLoading && !isError && teamData) ? teamData : undefined} />
      <Testimonials />
    </div>
  )
}


