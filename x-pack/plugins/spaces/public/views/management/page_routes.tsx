/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { I18nProvider } from '@kbn/i18n/react';

// @ts-ignore
import template from 'plugins/spaces/views/management/template.html';
import 'ui/autoload/styles';

import { SpacesNavState } from 'plugins/spaces/views/nav_control';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
// @ts-ignore
import routes from 'ui/routes';
import { SpacesManager } from '../../lib/spaces_manager';
import { ManageSpacePage } from './edit_space';
import { SpacesGridPage } from './spaces_grid';

const reactRootNodeId = 'manageSpacesReactRoot';

routes.when('/management/spaces/list', {
  template,
  controller(
    $scope: any,
    $http: any,
    chrome: any,
    spacesNavState: SpacesNavState,
    spaceSelectorURL: string
  ) {
    $scope.$$postDigest(() => {
      const domNode = document.getElementById(reactRootNodeId);

      const spacesManager = new SpacesManager($http, chrome, spaceSelectorURL);

      render(
        <I18nProvider>
          <SpacesGridPage spacesManager={spacesManager} spacesNavState={spacesNavState} />
        </I18nProvider>,
        domNode
      );

      // unmount react on controller destroy
      $scope.$on('$destroy', () => {
        if (domNode) {
          unmountComponentAtNode(domNode);
        }
      });
    });
  },
});

routes.when('/management/spaces/create', {
  template,
  controller(
    $scope: any,
    $http: any,
    chrome: any,
    spacesNavState: SpacesNavState,
    spaceSelectorURL: string
  ) {
    $scope.$$postDigest(() => {
      const domNode = document.getElementById(reactRootNodeId);

      const spacesManager = new SpacesManager($http, chrome, spaceSelectorURL);

      render(
        <I18nProvider>
          <ManageSpacePage spacesManager={spacesManager} spacesNavState={spacesNavState} />
        </I18nProvider>,
        domNode
      );

      // unmount react on controller destroy
      $scope.$on('$destroy', () => {
        if (domNode) {
          unmountComponentAtNode(domNode);
        }
      });
    });
  },
});

routes.when('/management/spaces/edit', {
  redirectTo: '/management/spaces/list',
});

routes.when('/management/spaces/edit/:spaceId', {
  template,
  controller(
    $scope: any,
    $http: any,
    $route: any,
    chrome: any,
    Private: any,
    spacesNavState: SpacesNavState,
    spaceSelectorURL: string
  ) {
    $scope.$$postDigest(() => {
      const domNode = document.getElementById(reactRootNodeId);

      const { spaceId } = $route.current.params;

      const spacesManager = new SpacesManager($http, chrome, spaceSelectorURL);

      render(
        <I18nProvider>
          <ManageSpacePage
            spaceId={spaceId}
            spacesManager={spacesManager}
            spacesNavState={spacesNavState}
          />
        </I18nProvider>,
        domNode
      );

      // unmount react on controller destroy
      $scope.$on('$destroy', () => {
        if (domNode) {
          unmountComponentAtNode(domNode);
        }
      });
    });
  },
});
