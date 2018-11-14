/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { uiCapabilities } from './capabilities';

function getUiSettingsClient() {
  return {
    get: key => {
      switch (key) {
        case 'timepicker:timeDefaults':
          return { from: 'now-15m', to: 'now', mode: 'quick' };
        case 'timepicker:refreshIntervalDefaults':
          return { display: 'Off', pause: false, value: 0 };
        default:
          throw new Error(`Unexpected config key: ${key}`);
      }
    }
  };
}

function addBasePath(path) {
  return path;
}

function getInjected(key) {
  switch (key) {
    case 'apmIndexPattern':
      return 'apm*';
    case 'mlEnabled':
      return true;
    case 'uiCapabilities':
      return uiCapabilities;
    default:
      throw new Error(`Unexpected config key: ${key}`);
  }
}

export default {
  getInjected,
  addBasePath,
  getUiSettingsClient
};
