import React from 'react';
import { startOfDay, endOfDay } from 'date-fns';
import { Datepicker } from '@my/myworld-ui-kit';
import { getStartOfNextMonth, getEndOfNextMonth } from '../../helpers/datetime';
import { RangeProps } from './types';
import css from './styles.scss';

export * from './types';

export const Range = ({
    label,
    dates: [dateFrom, dateTo],
    placeholderFrom,
    placeholderTo,
    onChange,
    reservedDates,
    error,
    disabled
}: RangeProps) => {
    const onChangeFrom = (newDateFrom: Date | null) =>
        onChange([newDateFrom ? startOfDay(newDateFrom) : null, dateTo]);

    const onChangeTo = (newDateTo: Date | null) =>
        onChange([dateFrom, newDateTo ? endOfDay(newDateTo) : null]);

    return <div className={css.field}>
        {label}
        <div className={css.dates}>
            <div className={css.datepicker}>
                <Datepicker
                    date={dateFrom}
                    minDate={getStartOfNextMonth()}
                    maxDate={getEndOfNextMonth()}
                    excludeDates={reservedDates}
                    onChange={onChangeFrom}
                    placeholder={placeholderFrom}
                    hasError={Boolean(error)}
                    disabled={disabled}
                />
            </div>
            <div className={css.datepicker}>
                <Datepicker
                    date={dateTo}
                    minDate={getStartOfNextMonth()}
                    maxDate={getEndOfNextMonth()}
                    excludeDates={reservedDates}
                    onChange={onChangeTo}
                    placeholder={placeholderTo}
                    disabled={disabled || (!dateFrom && !dateTo)}
                    popperPlacement="auto-end"
                    hasError={Boolean(error)}
                />
            </div>
        </div>

        {error
            ? <span className={css.error}>{error}</span>
            : null}
    </div>;
};
