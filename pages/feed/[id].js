import { withRouter } from 'next/router';
import Feed from '../../src/components/feed';

function Hipi({ router }) {
  const { id } = router.query;

  return (
    <>
      <Feed
        id={id}
      />
    </>
  );
}

export default withRouter(Hipi);

