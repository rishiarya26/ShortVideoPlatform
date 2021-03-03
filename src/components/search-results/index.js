
import Link from 'next/link';
import { withBasePath } from '../../config';

function compare(a, b) {
  if (a.full_name < b.full_name) { return -1; }
  if (a.full_name > b.full_name) { return 1; }
  return 0;
}

const SearchResults = ({ items, totalCount }) => (
  <>
    <div>
      <span className="font-bold text-purple-400 underline py-20">
        { totalCount }
        {' '}
        repos found
        {' '}
      </span>
      <ul data-testid="repos" className="list-outside list-disc">
        {
          items && items.sort(compare).map(item => (
            <li key={item.id} className="px-6">
              <Link
                scroll={false}
                href="/repo-details/[publisher]/[project]"
                as={withBasePath(`/repo-details/${item.full_name.split('/')[0]}/${item.full_name.split('/')[1]}`)}
              >
                <div className="underline text-blue-600">
                  { item.name }
                </div>
              </Link>
              <div className="italic">{item.stargazers_count}</div>
              <div className="italic">{item.description}</div>
              <div className="py-2.5" />
            </li>
          ))
        }
      </ul>
    </div>
  </>
);

export default SearchResults;
