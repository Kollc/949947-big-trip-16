import {
  RenderPosition,
  renderTemplate
} from './utils/render';

import {
  createSiteMenuTemplate
} from './view/site-menu-view';

import {
  createSiteFilterTemplate
} from './view/site-filter-view';

import {
  createSiteEditTemplate
} from './view/site-edit-view';

import {
  createSitePointTemplate
} from './view/site-point-view';

import {
  createSiteSortTemplate
} from './view/site-sort-view';

import {
  createSiteListTemplate
} from './view/site-list-view';

import {
  getPoints
} from './mock/point';

const TASK_COUNT = 15;

const tasks = getPoints();

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
renderTemplate(navigationContainerElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const filterContainerElement = document.querySelector('.trip-controls__filters');
renderTemplate(filterContainerElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);

const tripSectionElement = document.querySelector('.trip-events');
renderTemplate(tripSectionElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripSectionElement, createSiteListTemplate(), RenderPosition.BEFOREEND);

const tripListContainerElement = document.querySelector('.trip-events__list');
renderTemplate(tripListContainerElement, createSiteEditTemplate(tasks[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < TASK_COUNT; i++) {
  renderTemplate(tripListContainerElement, createSitePointTemplate(tasks[i]), RenderPosition.BEFOREEND);
}
