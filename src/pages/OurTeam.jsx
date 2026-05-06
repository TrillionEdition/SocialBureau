import React from 'react'
import Footer from '../components/Footer'
import { TeamHeader } from '../components/TeamHeader'
import TeamSection from '../components/TeamSection'
import Testimonials from '../components/Testimonials'
import Seo from '../components/Seo'
import { useQuery } from '@tanstack/react-query'
import { teamService } from '@/services/teamService'

export const OurTeam = () => {
  const { data: teamData, isLoading, isError } = useQuery({
    queryKey: ['team'],
    queryFn: () => teamService.getTeam(),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
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
