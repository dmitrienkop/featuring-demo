import 'core-js/stable';
import 'core-js/stable/object/assign';
import 'regenerator-runtime/runtime';
import 'date-time-format-timezone';
import 'intl-pluralrules';
import 'whatwg-fetch';

import React from 'react';
import ReactDom from 'react-dom';
import { Featuring } from './components/Featuring';
import { Provider } from 'react-redux';
import { store } from './store';
import { initI18n } from './i18n';
import { getConfig } from './config';

import './icons';

const config = getConfig();
initI18n(config.locales);

ReactDom.render(
    <Provider store={store}>
        <Featuring config={config} />
    </Provider>,
    document.getElementById('featuring')
);
