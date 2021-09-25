import { FC, useEffect } from 'react';
import { splitEvery } from 'ramda';
import { RouteChildrenProps } from 'react-router';
import { SimpleCard } from '../utils/SimpleCard';
import ColorGenerator from '../utils/services/ColorGenerator';
import SimplePaginator from '../common/SimplePaginator';
import { useQueryState } from '../utils/helpers/hooks';
import { parseQuery } from '../utils/helpers/query';
import { TagsListChildrenProps } from './data/TagsListChildrenProps';
import { TagsTableRowProps } from './TagsTableRow';

const TAGS_PER_PAGE = 20; // TODO Allow customizing this value in settings

export const TagsTable = (colorGenerator: ColorGenerator, TagsTableRow: FC<TagsTableRowProps>) => (
  { tagsList, selectedServer, location }: TagsListChildrenProps & RouteChildrenProps,
) => {
  const { page: pageFromQuery = 1 } = parseQuery<{ page?: number | string }>(location.search);
  const [ page, setPage ] = useQueryState<number>('page', Number(pageFromQuery));
  const sortedTags = tagsList.filteredTags;
  const pages = splitEvery(TAGS_PER_PAGE, sortedTags);
  const showPaginator = pages.length > 1;
  const currentPage = pages[page - 1] ?? [];

  useEffect(() => {
    setPage(1);
  }, [ tagsList.filteredTags ]);

  return (
    <SimpleCard key={page} bodyClassName={showPaginator ? 'pb-1' : ''}>
      <table className="table table-hover mb-0">
        <thead className="responsive-table__header">
          <tr>
            <th>Tag</th>
            <th className="text-lg-right">Short URLs</th>
            <th className="text-lg-right">Visits</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentPage.length === 0 && <tr><td colSpan={4} className="text-center">No results found</td></tr>}
          {currentPage.map((tag) => (
            <TagsTableRow
              key={tag}
              tag={tag}
              tagStats={tagsList.stats[tag]}
              selectedServer={selectedServer}
              colorGenerator={colorGenerator}
            />
          ))}
        </tbody>
      </table>

      {showPaginator && (
        <div className="sticky-card-paginator">
          <SimplePaginator pagesCount={pages.length} currentPage={page} setCurrentPage={setPage} />
        </div>
      )}
    </SimpleCard>
  );
};
