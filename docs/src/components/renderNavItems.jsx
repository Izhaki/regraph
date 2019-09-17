import React from 'react';
import List from '@material-ui/core/List';
import AppDrawerNavItem from './AppDrawerNavItem';

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List>
      {pages.reduce(
        // eslint-disable-next-line no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ props, items, page, depth }) {
  const { title } = page;
  if (page.displayNav === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    items.push(
      <AppDrawerNavItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        openImmediately
        title={title}>
        {renderNavItems({
          props,
          pages: page.children,
          depth: depth + 1,
        })}
      </AppDrawerNavItem>
    );
  } else {
    page =
      page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppDrawerNavItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={props.onClose}
      />
    );
  }

  return items;
}

export default renderNavItems;
