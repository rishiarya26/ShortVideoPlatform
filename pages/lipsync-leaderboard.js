import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import LipsyncLeaderboard from '../src/components/lipsync-leaderboard';
import { getCanonicalUrl } from '../src/utils/web';

export default function Hipi() {
  return (
    <>
    <SeoMeta
    data={{
      title: 'Lipsync Leaderboard | Hipi',
      // image: item?.thumbnail,
      description: 'Check out the list of contest entries of Lipsync challenge on Hipi.',
      canonical: getCanonicalUrl && getCanonicalUrl()}}
      />
      {/* <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStunner)}}
    /> */}
    <LipsyncLeaderboard />
    </>
  );
}