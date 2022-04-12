import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CharacterInProvider from '../providers/CharacterInProvider'


const CharacterPage: NextPage = () => {
  const router = useRouter()
  const { characterId } = router.query

  if (typeof characterId === 'string') {
    return <CharacterInProvider characterId={characterId} />
  }


  return null;


}

export default CharacterPage
