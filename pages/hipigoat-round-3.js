
import Round3Hipi from "../src/components/round-3-hipi";
import { SeoMeta } from "../src/components/commons/head-meta/seo-meta";
export default function Hipi() {
  
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi GOAT contest leaderboard - Singing Talent hunt.',
          description: 'Leaderboard for Hipi GOAT contest on Hipi. Top performers will get coaching sessions from Shilpa Rao and Rupali Jagga. And opportunity to perform at Finale episode of Zee Saregamapa.',
        }}
      />
    <Round3Hipi/>
  </>
  )
}
