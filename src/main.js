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
  createSiteCreateTemplate
} from './view/site-create-view';

import {
  createSitePointTemplate
} from './view/site-point-view';

import {
  createSiteSortTemplate
} from './view/site-sort-view';

import {
  createSiteListTemplate
} from './view/site-list-view';

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
renderTemplate(navigationContainerElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const filterContainerElement = document.querySelector('.trip-controls__filters');
renderTemplate(filterContainerElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);

const tripSectionElement = document.querySelector('.trip-events');
renderTemplate(tripSectionElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripSectionElement, createSiteListTemplate(), RenderPosition.BEFOREEND);

const tripListContainerElement = document.querySelector('.trip-events__list');
renderTemplate(tripListContainerElement, createSiteEditTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripListContainerElement, createSiteCreateTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < 3; i++) {
  renderTemplate(tripListContainerElement, createSitePointTemplate(), RenderPosition.BEFOREEND);
}
