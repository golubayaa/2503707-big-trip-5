import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import ButtonPointPresenter from './presenter/button-point-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter';
import FilterModel from './model/filter-model.js';
import PointsListModel from './model/points-list-model';
import { AUTHORIZATION, API_URL } from './const.js';
import EventsApiService from './service/events-api-service';

(async () => {
  const eventsApiService = new EventsApiService(API_URL, AUTHORIZATION);
  const pointsListModel = new PointsListModel({ pointApiService: eventsApiService });

  const buttonPointPresenter = new ButtonPointPresenter({
    container: document.querySelector('.trip-main')
  });

  const filterModel = new FilterModel();

  const boardPresenter = new BoardPresenter({
    eventsContainer: document.querySelector('.trip-events'),
    filterModel: filterModel,
    pointsModel: pointsListModel,
    buttonPointPresenter: buttonPointPresenter,
  });

  const filterPresenter = new FilterPresenter({
    filterContainer: document.querySelector('.trip-controls__filters'),
    filterModel: filterModel,
    pointsModel: pointsListModel
  });

  const tripInfoContainer = document.querySelector('.trip-main');
  const tripInfoPresenter = new TripInfoPresenter({
    container: tripInfoContainer,
    pointsModel: pointsListModel
  });

  filterPresenter.init();
  await boardPresenter.init();
  tripInfoPresenter.init();
  buttonPointPresenter.init({ onNewPointButtonClick: boardPresenter.handleNewPointButtonClick });
})();
