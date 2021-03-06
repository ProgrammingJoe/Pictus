import React from "react"
import { graphql } from "gatsby"
import Layout from '../templates/layout'
import Member from "../templates/member"
import SEO from '../templates/seo'

const TeamPage = ({
  data
}) => {
  const { 
    header, footer, teamBlock, members, leadershipIntro, developmentIntro, communicationIntro, industryIntro 
  } = data

  members.edges.sort(function(a, b) {
    return a.node.frontmatter.order - b.node.frontmatter.order
  })

  const development = members.edges.filter(module => module.node.frontmatter.area === 'DEVELOPMENT')
  const leadership = members.edges.filter(module => module.node.frontmatter.area === 'LEADERSHIP')
  const comm = members.edges.filter(module => module.node.frontmatter.area === 'COMM')
  const industry = members.edges.filter(module => module.node.frontmatter.area === 'INDUSTRY')

  const Leadership = leadership
  .map((edge) => <Member key={`${edge.node.frontmatter.name}-${edge.node.frontmatter.title}`} member={edge} />)
  const Development = development
  .map((edge) => <Member key={`${edge.node.frontmatter.name}-${edge.node.frontmatter.title}`} member={edge} />)
  const Comm = comm
  .map((edge) => <Member key={`${edge.node.frontmatter.name}-${edge.node.frontmatter.title}`} member={edge} />)
  const Industry = industry
  .map((edge) => <Member key={`${edge.node.frontmatter.name}-${edge.node.frontmatter.title}`} member={edge} />)

  return (
    <Layout header={header} footer={footer}>
      <SEO
        title="Team"
        canonical="/"
        description="Say hello to the PICTUS team. We bring years of industry experience and a young innovative development team together to deliver our solution."
        keywords="recycling, leadership, development, support, recycle, team"
      />

      <div className="secondary-intro-block">
        <div className="secondary-intro-text">
          <h2 className="secondary-intro-header">{teamBlock.frontmatter.title}</h2>
          <div className="secondary-intro-subtext">
            {teamBlock.frontmatter.subtext}
          </div>
        </div>
      </div>

      <h2 className="section-header--tiny">
        Our Leadership
      </h2>
      <div className="team-intro"
        dangerouslySetInnerHTML={{
        __html: leadershipIntro.html
      }}/>
      <div>{Leadership}</div>

      <h2 className="section-header--tiny">
        Our Development Team
      </h2>
      <div className="team-intro"
        dangerouslySetInnerHTML={{
        __html: developmentIntro.html
      }}/>
      <div>{Development}</div>

      <h2 className="section-header--tiny">
        Our Communications Team
      </h2>
      <div className="team-intro"
        dangerouslySetInnerHTML={{
        __html: communicationIntro.html
      }}/>
      <div>{Comm}</div>

      <h2 className="section-header--tiny">
        Our Industry Experts
      </h2>
      <div className="team-intro"
        dangerouslySetInnerHTML={{
        __html: industryIntro.html
      }}/>
      <div>{Industry}</div>
    </Layout>
  )
}

export default TeamPage

export const pageQuery = graphql`
  query {
    members: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(members)/.*.md$/"}}) {
      edges {
        node {
          html
          frontmatter {
            title
            image
            name
            order
            area
          }
        }
      }
    },
    teamBlock: markdownRemark(frontmatter: {id: {eq: "TeamBlock"}}) {
      frontmatter {
        id
        image
        subtext
        title
      }
    },
    leadershipIntro: markdownRemark(frontmatter: {id: {eq: "LeadershipIntro"}}) {
      html
    },
    developmentIntro: markdownRemark(frontmatter: {id: {eq: "DevelopmentIntro"}}) {
      html
    },
    communicationIntro: markdownRemark(frontmatter: {id: {eq: "CommunicationIntro"}}) {
      html
    },
    industryIntro: markdownRemark(frontmatter: {id: {eq: "IndustryIntro"}}) {
      html
    },
    header: markdownRemark(frontmatter: {id: {eq: "Logo"}}) {
      frontmatter {
        id
        image
      }
      html
    },
    footer: markdownRemark(frontmatter: {id: {eq: "Footer"}}) {
      frontmatter {
        id
        image
      }
    }
  }
`
