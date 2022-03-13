import React from 'react';
import classNames from 'classnames';
import { LoaderProps } from './types';
import css from './styles.scss';

export const Loader = ({ className }: LoaderProps) =>
    <svg
        className={classNames(css.loader, className)}
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
        >
        <circle
            className={css.circle}
            cx='50'
            cy='50'
            r='43'
        />
    </svg>;
