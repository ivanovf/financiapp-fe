import { gql, useQuery } from '@apollo/client'
import PlatformFrom from './UI/molecules/PlatformFrom'

function PlatformsSlide() {
  const QUERY_PLATFORMS = gql`
    query Platforms {
      platforms {
          id
          name
      }
  }`

  const {loading, data} = useQuery(QUERY_PLATFORMS)

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-800 p-2'>Platforms</h2>
      {loading && <p>Loading...</p>}
      <ul className='flex flex-row space-x-4 overflow-x-auto w-80 p-2'>
        {
          data && data.platforms.map(platform => {
            return <li key={platform.id}
              className='block max-w-sm p-6 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 w-40'>

              {platform.name}
              </li>
          })
        }
      </ul>
      <PlatformFrom />
    </div>
  )
}

export default PlatformsSlide