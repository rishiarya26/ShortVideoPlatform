import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import LipsyncLeaderboard from '../src/components/lipsync-leaderboard';
import { getCanonicalUrl } from '../src/utils/web';

export default function Hipi() {
  return (
    <>
    {/* <SeoMeta
    data={{
      title: 'Hipi Lipsync Battle Contest | #HipiLipsyncBattle challenge',
      // image: item?.thumbnail,
      description: 'Hipi Lipsync battle is a challenge where each participant gets a chance to showcase their lipsync and acting skills to a nationwide audience. Read on to find out about the #HipiLipsyncBattle challenge.',
      canonical: getCanonicalUrl && getCanonicalUrl()}}
      /> */}
      {/* <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStunner)}}
    /> */}
    <LipsyncLeaderboard />
    </>
  );
}