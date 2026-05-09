import React from 'react'
import Footer from '../components/Footer'
import TeamSection from '../components/TeamSection'
import Testimonials from '../components/Testimonials'
import Seo from '../components/Seo'
import { useQuery } from '@tanstack/react-query'
import { teamService } from '@/services/teamService'
import { TeamHeader } from '@/components/Team/TeamHeader'
// import TeamSecondary from '@/components/Team/TeamSecondary'
// import TeamHeader from '@/components/Team/TeamHeader'
// import TeamGrid from '@/components/Team/TeamGrid'
// import { WorkSection, ContactCTA, TrustedBy } from '@/components/Team/ExtraSections'

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
      {/* <TeamHeader /> */}
      {/* <TeamSecondary /> */}
      {/* <TeamGrid 
        teamData={teamData} 
        isLoading={isLoading} 
      /> */}
      {/* <WorkSection />
      <ContactCTA />
      <TrustedBy /> */}
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
