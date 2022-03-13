import { EFeatureType } from '../enums';
import { FeaturingTypeConfigs, MiniAppConfig } from './types';

const _devFeaturingTypes: FeaturingTypeConfigs = {
    [EFeatureType.ACTIONS_MAIN]: {
        title: 'Основной фичер «Скидки и акции»',
        description: `
            <p>
                Фичер отображается в <a href="https://my.mail.ru/apps" target="_blank">игровом каталоге</a>. Если на момент публикации в нём карточка только одного приложения,
                то фичер не отображается. Акции из этого фичера дублируются в <a href="https://my.mail.ru/apps?browse=actions" target="_blank">поп-апе</a> акций синей портальной шапки.
            </p>
            <p>
                Условие размещения: в приложении в это время должен быть тематический ивент, обновление или акция.
                Размещение возможно на всё время ивента, а также без ограничений на количество заявок в месяц.
            </p>
            <p>Для подачи заявки трубется изображение 496х186px, а также тексты с названием акции и описанием.</p>
        `,
        imageUrl: 'https://pmm-17764.myalpha.imgsmail.ru/mail/ru/images/my/app/api/featuring/items/discounts_actions.png',
        imageSize: [700, 245]
    },

    [EFeatureType.ACTIONS_ADDITIONAL]: {
        title: 'Дополнительный фичер «Скидки и акции»',
        description: `
            <p>
                Фичер отображается на <a href="https://my.mail.ru/" target="_blank">странице ленты</a>. Акции из этого фичера дублируются
                в <a href="https://my.mail.ru/apps" target="_blank">большом слайдере баннеров</a>.
            </p>
            <p>
                Условие размещения: в приложении в это время должен быть тематический ивент, обновление или акция.
                Размещение возможно на всё время ивента, а также без ограничений на количество заявок в месяц.
            </p>
            <p>Для подачи заявки трубется изображение 1078х606px, а также тексты с названием акции и описанием.</p>
        `,
        imageUrl: 'https://pmm-17764.myalpha.imgsmail.ru/mail/ru/images/my/app/api/featuring/items/discounts_actions_additional.png',
        imageSize: [240, 295]
    },

    [EFeatureType.NEW_DESKTOP]: {
        title: 'Фичер «NEW» в левом меню на десктопе',
        description: `
            <p>Фичер представляет собой слот для рекомендуемых игр в сквозном левом меню с зелёным бейджем NEW.</p>
            <p>
                Вы можете подать заявку на размещение сроком от 1 до 3 дней один раз в месяц. Для игр-новинок действует
                единовременное автоматическое бронирование ближайшего слота после первого запуска приложения в каталоге.
            </p>
            <p>Доступные слоты на следующий месяц открываются ежемесячно 1-го числа.</p>
        `,
        imageUrl: 'https://pmm-17764.myalpha.imgsmail.ru/mail/ru/images/my/app/api/featuring/items/desktop_left_menu.png',
        imageSize: [180, 129]
    },

    [EFeatureType.NEW_MOBILE]: {
        title: 'Фичер «NEW» в меню мобильной версии',
        description: `
            <p>Фичер представляет собой слот для рекомендуемых игр в меню мобильной версии с зелёным бейджем NEW.</p>
            <p>
                Вы можете подать заявку на размещение сроком от 1 до 3 дней один раз в месяц.
                Для игр-новинок действует единовременное автоматическое бронирование ближайшего слота после первого запуска приложения в каталоге.
            </p>
            <p>Доступные слоты на следующий месяц открываются ежемесячно 1-го числа.</p>
        `,
        imageUrl: 'https://pmm-17764.myalpha.imgsmail.ru/mail/ru/images/my/app/api/featuring/items/mobile_version_menu.png',
        imageSize: [220, 139]
    },

    [EFeatureType.HIT_DESKTOP]: {
        title: 'Фичер «HIT» в левом меню на десктопе',
        description: `
            <p>Фичер представляет собой слот для рекомендуемых игр в сквозном левом меню с оранжевым бейджем HIT.</p>
            <p>
                Вы можете подать заявку на размещение сроком от 1 до 3 дней один раз в месяц.
                Доступные слоты на следующий месяц открываются ежемесячно 1-го числа.
            </p>
        `,
        imageUrl: 'https://pmm-17764.myalpha.imgsmail.ru/mail/ru/images/my/app/api/featuring/items/hit_left_menu_desktop.png',
        imageSize: [180, 129]
    },

    [EFeatureType.HIT_MOBILE]: {
        title: 'Фичер «HIT» в меню мобильной версии',
        description: `
            <p>Фичер представляет собой слот для рекомендуемых игр в меню мобильной версии с оранжевым бейджем HIT.</p>
            <p>
                Вы можете подать заявку на размещение сроком от 1 до 3 дней один раз в месяц.
                Доступные слоты на следующий месяц открываются ежемесячно 1-го числа.
            </p>
        `,
        imageUrl: 'https://pmm-17764.myalpha.imgsmail.ru/mail/ru/images/my/app/api/featuring/items/hit_mobile_version_menu.png',
        imageSize: [220, 139]
    }
};

const _devLocales = {
    'welcome1': 'Вы можете зафичерить своё приложение в нескольких местах на страницах Моего Мира. Каждое из них имеет отдельный статус и требует разрешения модератора.',
    'welcome2': 'Фичеры независимы друг от друга, вы можете размещаться одновременно во всех, ограничиваясь лишь доступностью свободных слотов. ',
    'blockedRequestTitle': 'Опубликуйте своё приложение',
    'blockedRequestDescription': 'Для создания заявки ваше приложение должно быть <a href=\'../publish\'>опубликовано</a> в игровом каталоге',
    'closeBtn': 'Закрыть',
    'publishExample': 'Пример размещения',
    'collapse': 'Свернуть',
    'createRequest': 'Создать заявку',
    'availableOnceAMonth': 'Доступно раз в месяц',
    'requestTypeNotAvailable': 'Создание заявок этого типа пока не доступно',
    'backgroundImage': 'Фоновая картинка',
    'selectImage': 'Выбрать изображение',
    'removeRequestTitle': 'Удаление заявки',
    'removeRequestText': 'Вы действительно хотите удалить<br /> свою заявку на фичеринг?',
    'removeRequestError': 'При удалении заявки что-то пошло не так.<br /> Поробуйте повторить попытку позднее.',
    'cancelBtn': 'Отмена',
    'removeBtn': 'Удалить',
    'title': 'Заголовок',
    'subtitle': 'Подзаголовок',
    'activePeriod': 'Период показа',
    'dateStart': 'Дата начала',
    'dateEnd': 'Дата завершения',
    'gameNameWithLimit': 'Название игры или акции (до {{max}} символов)',
    'gameDescriptionWithLimit': 'Описание игры или акции (до {{max}} символов)',
    'errorStartAfterEnd': 'Дата начала не может быть позже даты окончания',
    'errorMaxRangeLength': 'Период не может быть больше {{max}} дней',
    'errorIncludesBookedDates': 'Период не может включать уже занятые даты',
    'createRequestTitle': 'Создание заявки',
    'createRequestError': 'При создании заявки что-то пошло не так.<br /> Поробуйте повторить попытку позднее.',
    'sendBtn': 'Отправить',
    'requestStatusApproved': 'Заявка подтверждена',
    'requestStatusOnModeration': 'Заявка на модерации',
    'appUse': 'Заявка на это приложение уже существует.',
    'datesAreBusy': 'Выбранные даты уже заняты.',
    'dontGoOverboardApp': 'Операция доступна только администратору или модератору приложения.',
    'dontGoOverboardDays': 'Выбранный период превышает максимальный возможный.',
    'dontGoOverboardMon': 'Выбранный период не попадает в доступные даты.',
    'highlength': 'Длина заголовка или описания превышает лимит.',
    'timeFalse': 'Период не может начинаться позже чем закончится.',
    'unknownError': 'Что-то пошло не так.<br/> Поробуйте повторить попытку позднее.'
};

export const _devMiniAppConfig: MiniAppConfig = {
    appId: '722217',
    apiUrl: 'https://pmm-17764.api.myalpha4.i.mail.ru',
    publicationStatus: '1',
    maxFeaturingRequestDaysPeriod: '3',
    disabledImagesUpload: '1',
    mna: '114287925',
    mnb: '2856913379',
    types: _devFeaturingTypes,
    locales: _devLocales
};
